// Theme toggle (dark by default, the choice remembered in this browser) and the back-to-top button
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (!toggle) return;
    var next = theme === "dark" ? "light" : "dark";
    toggle.querySelector(".label").textContent = next === "light" ? "Light" : "Dark";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(theme);
      try { localStorage.setItem("theme", theme); } catch (e) {}
    });
  }

  var top = document.getElementById("to-top");
  if (top) {
    var update = function () { top.classList.toggle("show", window.scrollY > 500); };
    window.addEventListener("scroll", update, { passive: true });
    update();
    top.addEventListener("click", function () {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      var title = document.querySelector(".site-title");
      if (title) title.focus({ preventScroll: true });
    });
  }
})();
