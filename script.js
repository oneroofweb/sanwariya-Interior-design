document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. MOBILE OFFCANVAS MENU =================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }


    // ================= 2. SCROLL REVEAL ANIMATION =================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animate when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all elements with the 'fade-in-left' class
    const hiddenElements = document.querySelectorAll('.fade-in-left');
    hiddenElements.forEach((el) => observer.observe(el));


    // ================= 3. BRAND SLIDER (AUTO-SCROLL + DRAG) =================
    const slider = document.getElementById('brandTrack');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationId;
        let speed = 1;

        slider.innerHTML += slider.innerHTML;

        function autoScroll() {
            if (!isDown) {
                slider.scrollLeft += speed;
                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        }

        autoScroll();

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelAnimationFrame(animationId);
        });

        slider.addEventListener('mouseleave', () => {
            if(isDown) {
                isDown = false;
                slider.style.cursor = 'grab';
                autoScroll();
            }
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            autoScroll();
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelAnimationFrame(animationId);
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            autoScroll();
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }


    // ================= 4. TESTIMONIAL SLIDER DOTS =================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    if (testimonialTrack && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const cardWidth = testimonialTrack.querySelector('.testimonial-card').offsetWidth;
                const gap = 30;
                
                testimonialTrack.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth'
                });

                dots.forEach(d => d.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        testimonialTrack.addEventListener('scroll', () => {
            const cardWidth = testimonialTrack.querySelector('.testimonial-card').offsetWidth;
            const scrollPosition = testimonialTrack.scrollLeft;
            
            let activeIndex = Math.round(scrollPosition / cardWidth);
            
            if(activeIndex > dots.length - 1) activeIndex = dots.length - 1;

            dots.forEach(d => d.classList.remove('active'));
            if(dots[activeIndex]) {
                dots[activeIndex].classList.add('active');
            }
        });
    }
});