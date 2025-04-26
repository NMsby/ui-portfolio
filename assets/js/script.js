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