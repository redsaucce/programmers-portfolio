/* ==========================================================================
   icons.js: shared icon set, written once and used on every page.
   Usage in HTML:   <site-icon name="user" class="h-4 w-4"></site-icon>
   The element replaces itself with an inline <svg> (Lucide paths, ISC
   license) that keeps the classes you gave it. Icons are decorative, so the
   svg gets aria-hidden="true"; put the label on the button or link instead.

   To add an icon: add its name and inner SVG markup (the paths between
   <svg> and </svg>) to ICONS below. Load this file in <head> before
   components.js, as a plain script (no defer), so there is no icon pop-in.
   ========================================================================== */

(function () {
  "use strict";

  var ICONS = {
    "graduation-cap":
      '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    "user":
      '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    "briefcase":
      '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    "folder-open":
      '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
    "external-link":
      '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    "image":
      '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'
  };

  class SiteIcon extends HTMLElement {
    connectedCallback() {
      var name = this.getAttribute("name");
      var inner = ICONS[name];
      if (!inner) {
        console.warn('site-icon: unknown icon "' + name + '"');
        return;
      }
      var tpl = document.createElement("template");
      tpl.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
        'aria-hidden="true">' + inner + "</svg>";
      var svg = tpl.content.firstElementChild;
      svg.setAttribute("class", ("lucide lucide-" + name + " " + this.className).trim());
      this.replaceWith(svg);
    }
  }

  if (!customElements.get("site-icon")) customElements.define("site-icon", SiteIcon);
})();