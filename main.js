// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)';
        nav.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// 悬停播放视频
document.querySelectorAll('.work-card[data-video]').forEach(card => {
    const bvid = card.dataset.video;
    const container = card.querySelector('.video-container');
    let iframe = null;
    
    // 鼠标进入时加载视频
    card.addEventListener('mouseenter', () => {
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&muted=1&page=1`;
            iframe.allow = 'autoplay';
            container.appendChild(iframe);
        } else {
            // 重新加载实现播放
            iframe.src = iframe.src;
        }
    });
    
    // 鼠标离开时停止视频
    card.addEventListener('mouseleave', () => {
        if (iframe) {
            iframe.remove();
            iframe = null;
        }
    });
});

// 淡入动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为作品卡片添加淡入效果
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});
