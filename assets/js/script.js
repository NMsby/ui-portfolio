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