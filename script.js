// تهيئة مكتبة AOS للحركات
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 120,
    disable: function() {
        return window.innerWidth < 768;
    }
});

// تهيئة Lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel': true,
    'positionFromTop': 100,
    'disableScrolling': true,
    'albumLabel': 'صورة %1 من %2',
    'fadeDuration': 300,
    'alwaysShowNavOnTouchDevices': true
});

// القائمة المتنقلة للهواتف
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// تغيير لون الشريط العلوي عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.97)';
        navbar.style.padding = '0.8rem 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.backgroundColor = '#2c3e50';
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// التنقل السلس بين الأقسام
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // تحديث الرابط النشط
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// تحميل الصور بسلاسة
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// إضافة تاريخ حقوق النشر تلقائياً
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.createElement('footer');
    footer.style.textAlign = 'center';
    footer.style.padding = '20px';
    footer.style.backgroundColor = '#2c3e50';
    footer.style.color = 'white';
    footer.innerHTML = `
        <p>جميع الحقوق محفوظة &copy; <span id="year"></span> - حسام حسن | <a href="mailto:hh8500732@gmail.com">اتصل بي</a></p>
    `;
    document.body.appendChild(footer);
    
    document.getElementById('year').textContent = new Date().getFullYear();
});

// تحديث الرابط النشط عند التمرير
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// تعديل حجم الفيديوهات حسب حجم الشاشة
function adjustVideos() {
    const videos = document.querySelectorAll('.video-item iframe');
    const isMobile = window.innerWidth < 768;
    
    videos.forEach(video => {
        video.style.width = '100%';
        video.style.height = isMobile ? '200px' : '315px';
    });
}

window.addEventListener('resize', adjustVideos);
window.addEventListener('load', adjustVideos);