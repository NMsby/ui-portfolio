// Header scroll class
$(window).on("scroll", function () {
    let scroll = $(window).scrollTop();
    if (scroll >= 80) {
        $("#site-header").addClass("nav-fixed");
    } else {
        $("#site-header").removeClass("nav-fixed");
    }
});

// Mobile menu
$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $('body').toggleClass('noscroll');
    });
});

// Search form toggle
$('.cd-search-trigger').on('click', function(event){
    event.preventDefault();
    toggleSearch();
});

function toggleSearch() {
    if($('.cd-search').hasClass('is-visible')){
        $('.cd-search').removeClass('is-visible');
    } else {
        $('.cd-search').addClass('is-visible');
        $('.cd-search input[type="search"]').focus();
    }
}

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
    const typingDelay = 200;
    const erasingDelay = 100;
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
});

// Progress bar animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    function animateProgressBars() {
        const progressSection = document.querySelector('#skills');
        const progressBars = document.querySelectorAll('.progress-bar');

        // Add initial class to set width to 0
        progressBars.forEach(bar => {
            bar.classList.add('progress-bar-animate');
        });

        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        // Function to animate progress bars when in viewport
        function checkProgress() {
            if (isElementInViewport(progressSection)) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('aria-valuenow') + '%';

                    // Remove the animate class to trigger the transition
                    setTimeout(function() {
                        bar.classList.remove('progress-bar-animate');
                        bar.style.width = width;
                    }, 200);
                });

                // Remove scroll listener once animation is triggered
                window.removeEventListener('scroll', checkProgress);
            }
        }

        // Add scroll listener
        window.addEventListener('scroll', checkProgress);

        // Check on initial load as well
        checkProgress();
    }

    animateProgressBars();
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