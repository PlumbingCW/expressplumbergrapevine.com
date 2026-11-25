(function () {
  "use strict";
  var root = document.documentElement;
  var drawer = document.getElementById("drawer");
  var bg = document.getElementById("drawer-bg");
  var burger = document.querySelector(".burger");
  var closeBtn = document.querySelector(".drawer-close");
  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("open"); bg.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    root.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open"); bg.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    root.style.overflow = "";
    burger.focus();
  }
  if (burger) burger.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (bg) bg.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 768) closeDrawer(); });
  // touch devices: first tap opens a dropdown, second follows the link
  var drops = document.querySelectorAll(".has-drop");
  Array.prototype.forEach.call(drops, function (li) {
    var a = li.querySelector(":scope > a");
    a.addEventListener("click", function (e) {
      if (window.matchMedia("(hover: none)").matches && !li.classList.contains("open")) {
        e.preventDefault();
        Array.prototype.forEach.call(drops, function (o) { o.classList.remove("open"); });
        li.classList.add("open");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-drop")) Array.prototype.forEach.call(drops, function (o) { o.classList.remove("open"); });
  });
  // hide the floating call button while the footer is on screen
  var fc = document.querySelector(".floatcall");
  var ft = document.querySelector(".site-footer");
  if (fc && ft && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { fc.classList.toggle("hide", en[0].isIntersecting); }).observe(ft);
  }
})();
