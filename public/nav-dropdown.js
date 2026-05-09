(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var dropdownBtn = document.querySelector(".nav-dropdown-btn");
    var dropdownMenu = document.querySelector(".nav-dropdown-menu");
    if (!dropdownBtn || !dropdownMenu) return;

    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdownMenu.classList.toggle("is-open");
      dropdownBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!dropdownMenu.classList.contains("is-open")) return;
      if (e.target.closest(".nav-dropdown")) return;
      dropdownMenu.classList.remove("is-open");
      dropdownBtn.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dropdownMenu.classList.contains("is-open")) {
        dropdownMenu.classList.remove("is-open");
        dropdownBtn.setAttribute("aria-expanded", "false");
        dropdownBtn.focus();
      }
    });
  });
})();
