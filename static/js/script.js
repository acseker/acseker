/**
 * Portfolio page script
 * ----------------------
 * All page CONTENT (About text, projects, publications, teaching, awards,
 * education, nav labels) now lives directly in index.html as plain markup —
 * edit it there, no JavaScript knowledge needed.
 *
 * This file only handles BEHAVIOR:
 *   1. SCROLL SPY   — highlights the current section in the nav while scrolling
 *   2. THEME        — light/dark mode toggle
 *   3. INTERACTIONS — mobile menu + scroll-to-top/bottom buttons
 *   4. INIT         — wires everything up on load
 *
 * Note: if you add/remove/rename a <section id="..."> in index.html, update
 * SECTION_IDS below to match, and add/remove the matching nav-pill /
 * mobile-menu <a data-section="..."> links in the HTML.
 */

(function () {
  'use strict';

  var SECTION_IDS = ['about', 'projects', 'publications', 'teaching', 'awards', 'education'];

  /** Shorthand for document.getElementById. */
  function byId(id) {
    return document.getElementById(id);
  }

  /* ======================================================================
     1. SCROLL SPY
     Highlights whichever section's top has passed just below the sticky
     nav bar. Runs on every animation frame during scroll (throttled) so it
     stays accurate even on fast scrolls, and snaps to the last section
     once the page is scrolled all the way to the bottom.
     ====================================================================== */

  var activeSection = 'about';
  var scrollTicking = false;
  var ACTIVE_THRESHOLD_PX = 140;

  /** Sets which nav links (desktop + mobile) show the "active" highlight. */
  function setActiveNavLinks(sectionId) {
    document.querySelectorAll('[data-section]').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
    });
  }

  function updateActiveSection() {
    var current = SECTION_IDS[0];

    for (var i = 0; i < SECTION_IDS.length; i++) {
      var el = byId(SECTION_IDS[i]);
      if (el && el.getBoundingClientRect().top <= ACTIVE_THRESHOLD_PX) {
        current = SECTION_IDS[i];
      }
    }

    var atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    if (atBottom) {
      current = SECTION_IDS[SECTION_IDS.length - 1];
    }

    if (current !== activeSection) {
      activeSection = current;
      setActiveNavLinks(activeSection);
    }
  }

  function initScrollSpy() {
    window.addEventListener(
      'scroll',
      function () {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(function () {
          updateActiveSection();
          scrollTicking = false;
        });
      },
      { passive: true }
    );

    updateActiveSection();
  }

  /* ======================================================================
     2. THEME (light / dark mode)
     ====================================================================== */

  var isDarkMode = false;

  function applyTheme() {
    var toggle = byId('themeToggle');

    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    toggle.style.justifyContent = isDarkMode ? 'flex-end' : 'flex-start';
    toggle.setAttribute('aria-pressed', String(isDarkMode));

    byId('sunIcon').style.display = isDarkMode ? 'none' : 'block';
    byId('moonIcon').style.display = isDarkMode ? 'block' : 'none';
  }

  function initThemeToggle() {
    byId('themeToggle').addEventListener('click', function () {
      isDarkMode = !isDarkMode;
      applyTheme();
    });

    applyTheme();
  }

  /* ======================================================================
     3. INTERACTIONS (mobile menu, scroll buttons)
     ====================================================================== */

  function initMobileMenu() {
    var hamburger = byId('hamburgerBtn');
    var menu = byId('mobileMenu');

    hamburger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu whenever a section link is chosen.
    document.querySelectorAll('[data-section]').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initScrollButtons() {
    byId('scrollTopBtn').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    byId('scrollBottomBtn').addEventListener('click', function () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  /* ======================================================================
     4. INIT
     ====================================================================== */

  function init() {
    initThemeToggle();
    initMobileMenu();
    initScrollButtons();
    initScrollSpy();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
