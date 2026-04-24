// ================= BRAND SLIDER (AUTO-SCROLL + DRAG) =================
document.addEventListener('DOMContentLoaded', () => {
    
    // Existing Mobile Menu Code... (Keep your previous menu code here)

    // Brands Slider Logic
    const slider = document.getElementById('brandTrack');
    if(!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let animationId;
    let speed = 1; // Change this to make it faster or slower (e.g., 0.5 or 2)

    // 1. Clone the items to create a seamless infinite loop
    slider.innerHTML += slider.innerHTML;

    // 2. Auto Scroll Function using RequestAnimationFrame (Smoothest method)
    function autoScroll() {
        if (!isDown) {
            slider.scrollLeft += speed;
            // If scrolled past the first set of logos, reset to 0 seamlessly
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            }
        }
        animationId = requestAnimationFrame(autoScroll);
    }

    // Start auto-scroll
    autoScroll();

    // 3. Mouse Drag Events (Desktop)
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelAnimationFrame(animationId); // Pause auto-scroll while dragging
    });

    slider.addEventListener('mouseleave', () => {
        if(isDown) {
            isDown = false;
            slider.style.cursor = 'grab';
            autoScroll(); // Resume auto-scroll
        }
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        autoScroll(); // Resume auto-scroll
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Drag speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });

    // 4. Touch Events (Mobile)
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
});

// ================= TESTIMONIAL SLIDER DOTS =================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    if(!track || dots.length === 0) return;

    // Click dot to scroll
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
            const gap = 30; // gap from CSS
            
            // Calculate scroll position
            track.scrollTo({
                left: index * (cardWidth + gap),
                behavior: 'smooth'
            });

            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Optional: Update dots based on scroll position (for swipe on mobile)
    track.addEventListener('scroll', () => {
        const cardWidth = track.querySelector('.testimonial-card').offsetWidth;
        const scrollPosition = track.scrollLeft;
        
        // Find which card is currently in view
        let activeIndex = Math.round(scrollPosition / cardWidth);
        
        // Safeguard index
        if(activeIndex > dots.length - 1) activeIndex = dots.length - 1;

        dots.forEach(d => d.classList.remove('active'));
        if(dots[activeIndex]) {
            dots[activeIndex].classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle sliding menu
            navMenu.classList.toggle('active');
            
            // Toggle hamburger to X icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu automatically when a link is clicked
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
});