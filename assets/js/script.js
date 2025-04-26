// Navigation & Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    // Fixed header on scroll with smooth transition
    window.addEventListener('scroll', function() {
        const header = document.getElementById('site-header');
        const scrollPosition = window.scrollTop || document.documentElement.scrollTop;

        if (scrollPosition >= 80) {
            header.classList.add('nav-fixed');
        } else {
            header.classList.remove('nav-fixed');
        }
    });

    // Active menu item highlighting based on scroll position
    function updateActiveMenuItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;

        // Get header height for offset calculation
        const headerHeight = document.querySelector('#site-header').offsetHeight;

        // Check each section's position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10; // Subtract header height and a small offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // If the scroll position is within the section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all menu items
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding menu item
                const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Call the function on scroll
    window.addEventListener('scroll', updateActiveMenuItem);

    // Call it once on page load
    updateActiveMenuItem();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip empty anchors or links with just '#'
            if (this.getAttribute('href') !== '#' && this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Get header height for offset
                    const headerHeight = document.querySelector('#site-header').offsetHeight;

                    // Calculate position with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }

                    // Update URL hash without scrolling
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Mobile menu toggle functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            this.classList.toggle('collapsed');
            document.body.classList.toggle('noscroll');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (
                navbarCollapse.classList.contains('show') &&
                !navbarCollapse.contains(e.target) &&
                !navbarToggler.contains(e.target)
            ) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                document.body.classList.remove('noscroll');
            }
        });
    }

    // Dropdown menu functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle dropdown toggle on mobile
            if (window.innerWidth < 992) {
                e.preventDefault();

                const parent = this.parentElement;
                const dropdown = this.nextElementSibling;

                // Toggle active class on parent
                parent.classList.toggle('show');

                // Toggle dropdown visibility
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            }
        });
    });

    // Add parallax scrolling effect to sections with background
    function addParallaxEffect() {
        const parallaxSections = [
            document.querySelector('.w3l-banner'),
            document.querySelector('.w3l-stats-section')
        ];

        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;

            parallaxSections.forEach(section => {
                if (section) {
                    // Only apply parallax if element exists
                    const speed = 0.5; // Adjust speed as needed
                    const yPos = -(scrollPosition * speed);
                    section.style.backgroundPositionY = yPos + 'px';
                }
            });
        });
    }

    // Initialize parallax effect
    addParallaxEffect();

    // Search functionality
    const searchTrigger = document.querySelector('.cd-search-trigger');
    const searchForm = document.querySelector('#cd-search');

    if (searchTrigger && searchForm) {
        searchTrigger.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle search form visibility
            searchForm.classList.toggle('is-visible');

            // Focus search input if visible
            if (searchForm.classList.contains('is-visible')) {
                searchForm.querySelector('input[type="search"]').focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (
                searchForm.classList.contains('is-visible') &&
                !searchForm.contains(e.target) &&
                !searchTrigger.contains(e.target)
            ) {
                searchForm.classList.remove('is-visible');
            }
        });

        // Close search on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchForm.classList.contains('is-visible')) {
                searchForm.classList.remove('is-visible');
            }
        });
    }

    // Initialize page on load
    window.addEventListener('load', function() {
        // Check if URL has hash and scroll to it with offset
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Wait a bit for page to fully load
                setTimeout(function() {
                    // Get header height for offset
                    const headerHeight = document.querySelector('#site-header').offsetHeight;

                    // Calculate position with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    });
});

// Dark mode toggle
const toggleSwitch = document.querySelector('#checkbox');
const body = document.querySelector('body');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
}

// Theme switch function
function switchTheme(e) {
    if (e.target.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Typing animation effect
document.addEventListener("DOMContentLoaded", function() {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Web Designer", "Web Developer", "Photographer", "Freelancer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.w3l-banner');

        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});

// About Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to add animation classes when element is in viewport
    function animateOnScroll() {
        const aboutSection = document.querySelector('#about');
        const aboutImage = document.querySelector('#about .my-image');
        const aboutInfo = document.querySelector('#about .w3l-about-info');

        if (aboutSection && isInViewport(aboutSection)) {
            if (aboutImage && !aboutImage.classList.contains('animate')) {
                aboutImage.classList.add('animate', 'fadeInLeft');
            }

            if (aboutInfo && !aboutInfo.classList.contains('animate')) {
                aboutInfo.classList.add('animate', 'fadeInRight');
            }
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Check for elements in viewport on page load
    setTimeout(animateOnScroll, 500);

    // Add animation classes to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translate3d(-50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translate3d(50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        .fadeInLeft {
            animation: fadeInLeft 1s ease-out forwards;
        }
        
        .fadeInRight {
            animation: fadeInRight 1s ease-out forwards;
        }
        
        #about .my-image,
        #about .w3l-about-info {
            opacity: 0;
        }
        
        #about .my-image.animate,
        #about .w3l-about-info.animate {
            opacity: 1;
        }
    `;

    document.head.appendChild(style);
});

// Services Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to service cards
    const serviceCards = document.querySelectorAll('.about-single');

    // Add animation class to each card
    serviceCards.forEach((card, index) => {
        card.classList.add('service-card-animation');
        // Set animation delay based on index
        card.style.transitionDelay = `${index * 0.2}s`;
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate service cards when in viewport
    function animateServiceCards() {
        const servicesSection = document.querySelector('#services');

        if (servicesSection && isInViewport(servicesSection)) {
            serviceCards.forEach(card => {
                card.classList.add('animate');
            });

            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateServiceCards);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateServiceCards);

    // Check on initial load as well
    setTimeout(animateServiceCards, 500);
});

// Skills Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressValues = document.querySelectorAll('.progress-value');
    const skillsContent = document.querySelector('.w3l-content-6');
    const skillsImage = document.querySelector('.w3l-skills .col-lg-6:first-child');

    // Add animation classes
    if (skillsContent) {
        skillsContent.classList.add('skills-content-animation');
    }

    if (skillsImage) {
        skillsImage.classList.add('skills-image-animation');
    }

    // Add progress values to each progress title
    progressBars.forEach((bar, index) => {
        const value = bar.getAttribute('aria-valuenow');
        const progressTitle = bar.closest('.progress-info').querySelector('.progress-tittle');

        // Create value span if it doesn't exist
        if (!progressTitle.querySelector('.progress-value')) {
            const valueSpan = document.createElement('span');
            valueSpan.className = 'progress-value';
            valueSpan.textContent = value + '%';
            progressTitle.appendChild(valueSpan);
        }
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate skills section when in viewport
    function animateSkillsSection() {
        if (skillsSection && isInViewport(skillsSection)) {
            // Animate content and image
            if (skillsContent) {
                skillsContent.classList.add('animate');
            }

            if (skillsImage) {
                skillsImage.classList.add('animate');
            }

            // Animate progress bars with delay
            progressBars.forEach((bar, index) => {
                const value = bar.getAttribute('aria-valuenow');
                const valueElement = bar.closest('.progress-info').querySelector('.progress-value');

                setTimeout(() => {
                    bar.style.width = value + '%';
                    if (valueElement) {
                        valueElement.classList.add('active');
                    }
                }, 500 + (index * 200));
            });

            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateSkillsSection);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateSkillsSection);

    // Check on initial load as well
    setTimeout(animateSkillsSection, 500);
});

// Features Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const featuresSection = document.querySelector('#about1');
    const featureItems = document.querySelectorAll('.grids_info');
    const featureImage = document.querySelector('.w3l-whychooseus .my-image');

    // Add animation classes
    featureItems.forEach((item, index) => {
        item.classList.add('feature-item-animation');
        // Set different delays based on row and column position
        let row = Math.floor(index / 2); // Calculate row position
        let delay = row * 0.2 + (index % 2) * 0.1; // Stagger by row, then column
        item.style.transitionDelay = `${delay}s`;
    });

    if (featureImage) {
        featureImage.classList.add('feature-image-animation');
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate features section when in viewport
    function animateFeaturesSection() {
        if (featuresSection && isInViewport(featuresSection)) {
            // Animate feature items
            featureItems.forEach(item => {
                item.classList.add('animate');
            });

            // Animate feature image
            if (featureImage) {
                featureImage.classList.add('animate');
            }

            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateFeaturesSection);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateFeaturesSection);

    // Check on initial load as well
    setTimeout(animateFeaturesSection, 500);
});

// Counter animation for stats section
document.addEventListener('DOMContentLoaded', function() {
    // Function to animate counters
    function animateCounters() {
        const statsSection = document.querySelector('#stats');
        const counters = document.querySelectorAll('.counter');

        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        // Counter animation function
        function startCounting() {
            if (isElementInViewport(statsSection)) {
                counters.forEach(counter => {
                    // Only animate once
                    if (counter.classList.contains('animated')) return;

                    counter.classList.add('animated');

                    const target = parseInt(counter.innerText);
                    let count = 0;
                    const speed = 2000 / target; // Adjust for consistent animation duration

                    const updateCount = () => {
                        if (count < target) {
                            count += 1;
                            counter.innerText = count;
                            setTimeout(updateCount, speed);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                });

                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', startCounting);
            }
        }

        // Add scroll listener
        window.addEventListener('scroll', startCounting);

        // Check on initial load as well
        startCounting();
    }

    animateCounters();
});

// Portfolio Lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox functionality
    const portfolioItems = document.querySelectorAll('.image-zoom');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the image URL
            const imgUrl = this.getAttribute('href');

            // Create and show lightbox
            showLightbox(imgUrl);
        });
    });

    // Basic lightbox function
    function showLightbox(imgUrl) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'portfolio-lightbox';

        // Create close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';

        // Create image element
        const img = document.createElement('img');
        img.src = imgUrl;

        // Append elements to lightbox
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(img);

        // Append lightbox to body
        document.body.appendChild(lightbox);

        // Prevent scrolling
        document.body.style.overflow = 'hidden';

        // Show lightbox with animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close lightbox on click
        lightbox.addEventListener('click', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(this);
                document.body.style.overflow = '';
            }, 300);
        });
    }

    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .portfolio-lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            box-shadow: 0 0 30px rgba(0,0,0,0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            font-size: 40px;
            cursor: pointer;
        }
    `;

    document.head.appendChild(style);
});

// Client Logos Carousel
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const brandsSection = document.querySelector('.w3l-brands');
    const owlCarousel = document.querySelector('#owl-demo');

    // Add animation class
    if (brandsSection) {
        brandsSection.classList.add('logo-animation');
    }

    // Initialize Owl Carousel with enhanced options
    if (owlCarousel) {
        $(owlCarousel).owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            navText: [
                "<i class='fas fa-chevron-left'></i>",
                "<i class='fas fa-chevron-right'></i>"
            ],
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 2,
                    margin: 10
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                }
            }
        });
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate brands section when in viewport
    function animateBrandsSection() {
        if (brandsSection && isInViewport(brandsSection)) {
            brandsSection.classList.add('animate');

            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateBrandsSection);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateBrandsSection);

    // Check on initial load as well
    setTimeout(animateBrandsSection, 500);
});

// Footer Section Animations and Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const footer = document.querySelector('.footer');
    const moveTopBtn = document.getElementById('movetop');

    // Add animation class to footer
    if (footer) {
        footer.classList.add('footer-animation');
    }

    // Back to top button functionality
    if (moveTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                moveTopBtn.style.display = 'flex';
                setTimeout(() => {
                    moveTopBtn.style.opacity = '1';
                }, 10);
            } else {
                moveTopBtn.style.opacity = '0';
                setTimeout(() => {
                    moveTopBtn.style.display = 'none';
                }, 300);
            }
        });

        // Scroll to top when button is clicked
        moveTopBtn.addEventListener('click', function() {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
        );
    }

    // Function to animate footer when in viewport
    function animateFooter() {
        if (footer && isInViewport(footer)) {
            footer.classList.add('animate');

            // Remove scroll listener once animation is triggered
            window.removeEventListener('scroll', animateFooter);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', animateFooter);

    // Check on initial load as well
    setTimeout(animateFooter, 500);

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only process internal links
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Get header height for offset
                    const headerHeight = document.querySelector('#site-header').offsetHeight;

                    // Calculate position with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            }
        });
    });
});