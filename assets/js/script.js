// Header scroll class
$(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 80) {
        $("#site-header").addClass("nav-fixed");
    } else {
        $("#site-header").removeClass("nav-fixed");
    }
});

// Mobile menu toggle
$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $('body').toggleClass('noscroll');
        $(this).toggleClass('collapsed');
    });

    // Add dropdown toggle functionality for mobile
    $('.dropdown-toggle').click(function(e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            $(this).parent().toggleClass('show');
            $(this).next('.dropdown-menu').toggleClass('show');
        }
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').addClass('collapsed');
            $('body').removeClass('noscroll');
        }
    });

    // Active link highlighting based on scroll position
    $(window).on('scroll', function() {
        $('.navbar-nav .nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));

            if (refElement.length) {
                var offsetTop = refElement.offset().top - 100;
                var offsetBottom = offsetTop + refElement.outerHeight();

                if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() <= offsetBottom) {
                    $('.navbar-nav .nav-link').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    });
});

// Search functionality
// Search functionality
$('.cd-search-trigger').on('click', function(event){
    event.preventDefault();
    $('.cd-search').toggleClass('is-visible');

    if ($('.cd-search').hasClass('is-visible')) {
        $('.cd-search input[type="search"]').focus();
    }

    // Close search when clicking elsewhere
    $('body').on('click', function(e) {
        if (!$(e.target).closest('.cd-search, .cd-search-trigger').length) {
            $('.cd-search').removeClass('is-visible');
        }
    });
});

// Close search on escape key
$(document).keyup(function(e) {
    if (e.key === "Escape" && $('.cd-search').hasClass('is-visible')) {
        $('.cd-search').removeClass('is-visible');
    }
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
    $("#owl-demo").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            568: {
                items: 3
            },
            768: {
                items: 4
            },
            1000: {
                items: 5
            }
        }
    });
});

// Back to top button
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("movetop").style.display = "block";
    } else {
        document.getElementById("movetop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // Alternative smooth scroll for modern browsers
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}