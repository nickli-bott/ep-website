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

// 视频弹窗
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// 打开弹窗
function openVideo(bvid) {
    videoFrame.src = `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&page=1`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeVideo() {
    videoModal.classList.remove('active');
    videoFrame.src = '';
    document.body.style.overflow = '';
}

// 作品卡片点击 - 有 data-video 的打开弹窗，其他的跳转B站
if (videoModal) {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', () => {
            const bvid = card.dataset.video;
            if (bvid) {
                openVideo(bvid);
            } else {
                // 其他作品暂时跳转到B站首页
                window.open('https://www.bilibili.com', '_blank');
            }
        });
    });

    // 关闭事件
    modalClose.addEventListener('click', closeVideo);
    modalOverlay.addEventListener('click', closeVideo);

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideo();
        }
    });
}

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
