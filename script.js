/* ============================================================
   LANDING INVITACIONES PRO — SCRIPT.JS

   TABLE OF CONTENTS
    1.  Navigation (sticky + hamburger + mobile drawer)
    2.  Scroll Reveal Animations
    3.  FAQ Accordion
    4.  WhatsApp FAB (show after delay)
    5.  Smooth Scroll for anchor links
    6.  Initializer
============================================================ */

/* ============================================================
   1. NAVIGATION
============================================================ */
function initNav() {
    const nav          = document.getElementById('nav');
    const hamburger    = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose  = document.getElementById('drawerClose');
    if (!nav) return;

    // Sticky + style on scroll
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Drawer helpers
    const openDrawer = () => {
        mobileDrawer?.classList.add('open');
        document.body.classList.add('no-scroll');
        hamburger?.setAttribute('aria-expanded', 'true');
        mobileDrawer?.removeAttribute('aria-hidden');
    };
    const closeDrawer = () => {
        mobileDrawer?.classList.remove('open');
        document.body.classList.remove('no-scroll');
        hamburger?.setAttribute('aria-expanded', 'false');
        mobileDrawer?.setAttribute('aria-hidden', 'true');
    };

    hamburger?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);

    // Close drawer when any link inside is clicked
    mobileDrawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    // Close on overlay click (clicking outside nav content)
    mobileDrawer?.addEventListener('click', e => {
        if (e.target === mobileDrawer) closeDrawer();
    });

    // Keyboard: Escape closes drawer
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) closeDrawer();
    });
}

/* ============================================================
   2. SCROLL REVEAL ANIMATIONS
============================================================ */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

/* ============================================================
   3. FAQ ACCORDION
============================================================ */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        const btn = item.querySelector('.faq-q');
        const ans = item.querySelector('.faq-a');
        if (!btn || !ans) return;

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            items.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
                const a = i.querySelector('.faq-a');
                if (a) a.style.maxHeight = '0';
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                ans.style.maxHeight = ans.scrollHeight + 'px';
            }
        });
    });
}

/* ============================================================
   4. WHATSAPP FAB — appears after 3 seconds
============================================================ */
function initWaFab() {
    const fab = document.querySelector('.wa-fab');
    if (!fab) return;

    fab.style.opacity = '0';
    fab.style.transform = 'scale(0.7)';
    fab.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';

    setTimeout(() => {
        fab.style.opacity = '1';
        fab.style.transform = 'scale(1)';
    }, 3000);
}

/* ============================================================
   5. SMOOTH SCROLL
============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();

            const navHeight = document.getElementById('nav')?.offsetHeight ?? 80;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ============================================================
   6. INITIALIZER
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollReveal();
    initFAQ();
    initWaFab();
    initSmoothScroll();
});
