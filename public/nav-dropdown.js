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

/**
 * ハンバーガー開閉時に背后ページがスクロールしないようロックする。
 * （ドロワーに overflow:auto を付けただけでは document のスクロールは止まらない）
 */
(function () {
  "use strict";
  var MQ = "(max-width: 900px)";
  var locked = false;
  var scrollY = 0;

  function lockScroll() {
    var mq = window.matchMedia(MQ);
    if (!mq.matches || locked) return;
    scrollY = window.scrollY || window.pageYOffset || 0;
    locked = true;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + scrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockScroll() {
    if (!locked) return;
    locked = false;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollY);
  }

  function sync(menu) {
    var mq = window.matchMedia(MQ);
    if (!menu) return;
    if (!mq.matches) {
      unlockScroll();
      return;
    }
    if (menu.classList.contains("is-open")) lockScroll();
    else unlockScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var menu = document.querySelector(".site-menu-links");
    if (!menu) return;
    var mq = window.matchMedia(MQ);
    var runSync = function () {
      sync(menu);
    };
    var obs = new MutationObserver(runSync);
    obs.observe(menu, { attributes: true, attributeFilter: ["class"] });
    if (mq.addEventListener) mq.addEventListener("change", runSync);
    else if (mq.addListener) mq.addListener(runSync);
    runSync();
  });
})();
