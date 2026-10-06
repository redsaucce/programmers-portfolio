/* ==========================================================================
   components.js: shared navbar and footer (written ONCE, used on every page)

   Usage in each page:
     <head>  ...  <script src="js/components.js"></script>  </head>   (plain, no defer)
     <body>  <site-header></site-header> ... <site-footer></site-footer>

   Edit the SITE object below to change the name, links, or contact details
   everywhere at once. Markup uses light DOM (no shadow DOM) so Tailwind classes
   and style.css apply normally.

   Works when opening files directly (file://); no server or build step needed.
   Requires JavaScript: without it, the navbar and footer do not appear.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Single source of truth for shared content
     ------------------------------------------------------------------------ */
  var SITE = {
    brand: "Kelly",
    fullName: "Kelly Jao D. Quidit",
    role: "Aspiring Network Engineer pursuing a BS in Information Technology, major in Network Design and Management",
    email: "kellyjaoq@gmail.com",
    phone: "+639261438967",
    phoneDisplay: "+63 926 143 8967",
    location: "Solano, Nueva Vizcaya",
    // TODO: replace each href "#" with the real profile URL
    // color = official brand color (GitHub is black, so it follows the theme text color instead)
    // (Lucide 1.51.0 has no brand icons, so these are inline SVGs from simple-icons / CC0)
    socials: [
      { label: "GitHub", href: "#", color: "", path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" },
      { label: "LinkedIn", href: "#", color: "#0A66C2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
      { label: "Facebook", href: "https://web.facebook.com/keilycakes.5", color: "#0866FF", path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
    ],
    links: [
      { href: "index.html", label: "Home" },
      { href: "about.html", label: "About" },
      { href: "education.html", label: "Education" },
      { href: "projects.html", label: "Projects" },
    ],
  };

  function linkItems(linkClass) {
    return SITE.links
      .map(function (l) {
        return '<li><a href="' + l.href + '" class="nav-link ' + linkClass + '">' + l.label + "</a></li>";
      })
      .join("\n");
  }

  function socialItems() {
    return SITE.socials
      .map(function (n) {
        return (
          '<li><a href="' + n.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + n.label + ' (opens in a new tab)" ' +
          'class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition-opacity duration-200 hover:bg-page hover:opacity-80 motion-reduce:transition-none"' +
          (n.color ? ' style="color:' + n.color + '"' : '') + '>' +
          '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="' + n.path + '"/></svg></a></li>'
        );
      })
      .join("\n");
  }

  /* ------------------------------------------------------------------------
     <site-header>: skip link + sticky navbar + full-screen mobile menu sheet
     ------------------------------------------------------------------------ */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      // Let the inner <header> stick to the viewport (the wrapper adds no box)
      this.style.display = "contents";
      this.innerHTML = `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

  <header class="sticky top-0 z-40 bg-page shadow-md dark:bg-surface dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.5)]">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <a href="index.html" class="font-heading text-lg font-bold tracking-tight">${SITE.brand}</a>

      <div class="flex items-center gap-2">
        <nav aria-label="Main" class="hidden md:block">
          <ul class="flex items-center gap-8">
            ${linkItems("text-sm font-medium")}
          </ul>
        </nav>

        <button id="theme-toggle" type="button" aria-label="Switch to dark mode"
                class="relative ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-ink">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon absolute inset-0 m-auto h-5 w-5 rotate-0 scale-100 opacity-100 transition-all duration-300 motion-reduce:transition-none dark:-rotate-90 dark:scale-0 dark:opacity-0" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun absolute inset-0 m-auto h-5 w-5 rotate-90 scale-0 opacity-0 transition-all duration-300 motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>

        <button id="menu-btn" type="button" aria-label="Toggle menu" aria-controls="mobile-menu" aria-expanded="false"
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-ink md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-5 w-5" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        </button>
      </div>
    </div>
  </header>

  <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" class="bg-page md:hidden">
    <div class="border-b border-line">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <span class="font-heading text-lg font-bold tracking-tight">${SITE.brand}</span>
        <button id="menu-close" type="button" aria-label="Close menu"
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-ink">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
    <nav aria-label="Mobile" class="mx-auto max-w-7xl px-4 sm:px-6">
      <ul class="flex flex-col py-6">
        ${linkItems("inline-block py-3 text-sm font-medium")}
      </ul>
    </nav>
  </div>`;
    }
  }

  /* ------------------------------------------------------------------------
     <site-footer>: contact details, copyright, back-to-top button
     ------------------------------------------------------------------------ */
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.style.display = "contents";
      this.innerHTML = `
  <footer class="border-t border-line bg-surface">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div>
        <p class="font-heading text-lg font-bold">${SITE.fullName}</p>
        <p class="mt-1 max-w-md text-sm text-muted">${SITE.role}</p>
      </div>

      <ul class="flex flex-col gap-3 text-sm">
        <li>
          <a href="mailto:${SITE.email}" class="footer-link inline-flex items-center gap-2 text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail h-4 w-4" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> <span>${SITE.email}</span>
          </a>
        </li>
        <li>
          <a href="tel:${SITE.phone}" class="footer-link inline-flex items-center gap-2 text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone h-4 w-4" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg> <span>${SITE.phoneDisplay}</span>
          </a>
        </li>
        <li class="inline-flex items-center gap-2 text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg> ${SITE.location}
        </li>
      </ul>
    </div>

    <div class="border-t border-line">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p class="text-sm text-muted">
          &copy; <span id="year">${new Date().getFullYear()}</span> ${SITE.fullName}
        </p>
        <ul aria-label="Social links" class="flex items-center gap-1">
          ${socialItems()}
        </ul>
      </div>
    </div>
  </footer>

  <button id="back-to-top" type="button" aria-label="Back to top"
          class="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up h-5 w-5" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
  </button>`;
    }
  }

  if (!customElements.get("site-header")) customElements.define("site-header", SiteHeader);
  if (!customElements.get("site-footer")) customElements.define("site-footer", SiteFooter);
})();