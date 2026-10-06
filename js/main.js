/* ==========================================================================
   main.js: Kelly Jao D. Quidit portfolio
   Load at the end of <body> (as the last script tag) or with `defer`.
   Icons need no setup here: see js/icons.js and the inline SVGs in components.js.

   HTML hooks this file expects (rendered by js/components.js; all optional,
   missing ones are skipped):
     #menu-btn           button that opens/closes the mobile menu
     #mobile-menu        full-screen mobile menu sheet (slides in from the left)
     #menu-close         close button inside the sheet
     .nav-link           every navbar link (desktop + mobile)
     #theme-toggle       button that switches light/dark
     #back-to-top        back-to-top button
     #year               <span> in the footer for the current year

   Dark mode: set `darkMode: 'class'` in the Tailwind config. To avoid a
   flash of the wrong theme, also paste this tiny script in each <head>:

     <script>
       try {
         var t = localStorage.getItem('theme');
         if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
           document.documentElement.classList.add('dark');
         }
       } catch (e) {}
     </script>

   For the theme toggle, put BOTH icons in the button and let Tailwind show
   the right one, so no icon swapping is needed:
     inline <svg> icons (sun: "hidden dark:block", moon: "block dark:hidden").
     See components.js for the markup.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };

  /* ------------------------------------------------------------------------
     1. Mobile menu
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var button = $("#menu-btn");
    var menu = $("#mobile-menu");
    if (!button || !menu) return;

    var closeBtn = $("#menu-close");
    var root = document.documentElement;
    // The page behind the open menu: made inert so keyboard and screen readers stay in the menu
    var behind = $$("main, site-footer, a[href=\"#main\"]");

    function isOpen() {
      return menu.classList.contains("is-open");
    }

    function setOpen(open, returnFocus) {
      menu.classList.toggle("is-open", open);
      menu.inert = !open;
      behind.forEach(function (el) {
        el.inert = open;
      });
      button.setAttribute("aria-expanded", String(open));
      root.classList.toggle("menu-open", open); // locks page scroll (see style.css)
      if (open && closeBtn) closeBtn.focus();
      if (!open && returnFocus) button.focus();
    }

    setOpen(false, false);

    button.addEventListener("click", function () {
      setOpen(!isOpen(), false);
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false, true);
      });
    }

    // Close after choosing a link
    $$("a", menu).forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false, false);
      });
    });

    // Close with the Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) setOpen(false, true);
    });

    // Keep Tab and Shift+Tab inside the open menu (focus trap)
    menu.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      var items = $$("button, a[href]", menu);
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Reset when the window grows to desktop width (Tailwind "md" = 768px)
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && isOpen()) setOpen(false, false);
    });
  }

  /* ------------------------------------------------------------------------
     2. Active nav link
     Compares each link's file name with the current page.
     "/" and "" are treated as index.html.
     ------------------------------------------------------------------------ */
  function initActiveNav() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    if (current === "") current = "index.html";

    $$(".nav-link").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var target = href.split("#")[0].split("/").pop() || "index.html";

      if (target === current) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Theme toggle (light / dark), remembered in localStorage
     ------------------------------------------------------------------------ */
  function initThemeToggle() {
    var button = $("#theme-toggle");
    if (!button) return;

    var root = document.documentElement;

    function syncLabel() {
      var isDark = root.classList.contains("dark");
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    syncLabel();

    button.addEventListener("click", function () {
      var isDark = root.classList.toggle("dark");
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (e) {
        /* storage unavailable: the theme still changes for this visit */
      }
      syncLabel();
    });
  }

  /* ------------------------------------------------------------------------
     4. Back-to-top button
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    var button = $("#back-to-top");
    if (!button) return;

    function update() {
      button.classList.toggle("is-visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------------
     5. Footer year
     ------------------------------------------------------------------------ */
  function initYear() {
    var el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------
     6. Scroll reveal
     Sections and cards fade up (12px) the first time they enter the screen.
     Anything marked .hero-in is excluded: it has its own staggered entrance.
     Skipped for reduced-motion users and browsers without IntersectionObserver.
     Items entering together are staggered by 80ms (max 240ms).
     ------------------------------------------------------------------------ */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Elements with .hero-in have their own entrance (see style.css), so skip them here
    var items = Array.prototype.filter.call(
      $$('main section, main article, main .timeline-item, main ul[aria-label="Quick facts"] > li'),
      function (el) {
        return !el.classList.contains("hero-in");
      }
    );
    if (!items.length) return;

    items.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        var n = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          observer.unobserve(el);

          el.style.transitionDelay = Math.min(n, 3) * 80 + "ms";
          n += 1;
          el.classList.add("is-visible");

          // Remove the helper classes afterwards so hover transitions work again
          var cleaned = false;
          function clean() {
            if (cleaned) return;
            cleaned = true;
            el.classList.remove("reveal", "is-visible");
            el.style.transitionDelay = "";
          }
          el.addEventListener("transitionend", function onEnd(e) {
            if (e.target === el && e.propertyName === "opacity") {
              el.removeEventListener("transitionend", onEnd);
              clean();
            }
          });
          setTimeout(clean, 1200); // safety net
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Start
     ------------------------------------------------------------------------ */
  function init() {
    initMobileMenu();
    initActiveNav();
    initThemeToggle();
    initBackToTop();
    initYear();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();