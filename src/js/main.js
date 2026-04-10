(function () {
    // ---- Mobile Menu ----
    var hamburger = document.getElementById('nav-hamburger');
    var menu      = document.getElementById('mobile-menu');

    function openMenu() {
        menu.classList.add('is-open');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', function () {
        menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // ---- Sticky Header on Intro ----
    var header = document.querySelector('.header');
    var intro  = document.getElementById('intro');

    function checkScroll() {
        var introTop = intro.getBoundingClientRect().top;
        header.classList.toggle('is-sticky', introTop <= 0);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // ---- Features Swiper ----
    var SLIDE_COUNT = 3;
    var countEl = document.querySelector('.features__count');

    var featuresSwiper = new Swiper('#features-slider', {
        loop: true,
        speed: 600,
        touchStartPreventDefault: false,
        grabCursor: true,
    });

    document.getElementById('features-prev').addEventListener('click', function () {
        featuresSwiper.slidePrev();
    });

    document.getElementById('features-next').addEventListener('click', function () {
        featuresSwiper.slideNext();
    });

    featuresSwiper.on('realIndexChange', function () {
        countEl.textContent = (this.realIndex + 1) + '/' + SLIDE_COUNT;
    });
}());
