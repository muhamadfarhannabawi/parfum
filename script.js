document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    // 1. Toggle Menu Mobile (DENGAN TANDA SILANG X)
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            // Ganti jadi silang
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Kunci scroll
        } else {
            // Ganti jadi garis tiga
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'initial'; // Lepas scroll
        }
    });

    // Otomatis tutup menu saat link diklik (Penting untuk user experience)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = 'initial';
        });
    });

    // 2. Navbar Glassmorphism Effect on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 8%';
            navbar.style.background = 'rgba(11, 11, 11, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(201, 164, 76, 0.3)';
        } else {
            navbar.style.padding = '0px 8%';
            navbar.style.background = 'rgba(11, 11, 11, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(201, 164, 76, 0.1)';
        }
    });

    // 3. Highlight Link Aktif
    const currentLocation = location.pathname.split("/").pop();
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentLocation || (currentLocation === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    // 4. Parallax Hero Effect (Hanya Desktop)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 992) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollValue / 600);
        });
    }

    // 5. Advanced Reveal Animation
    const revealElements = document.querySelectorAll('.product-card, .feature-item, .reveal-text, .featured-image, .philosophy, .featured-text');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        revealObserver.observe(el);
    });

    // 6. Injection CSS untuk Class Revealed
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        /* Animasi rotasi halus saat icon berubah jadi X */
        #mobile-menu i {
            transition: transform 0.3s ease-in-out;
        }
        .fa-times {
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(style);
});