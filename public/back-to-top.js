document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".back-to-top-btn");
  if (!button) return;

  var body = document.body;
  var hiddenOnDiagnosingClass = "is-diagnosing";

  var syncVisibility = function () {
    if (body.classList.contains(hiddenOnDiagnosingClass)) {
      button.classList.remove("is-visible");
      return;
    }
    var shouldShow = window.scrollY > 220;
    button.classList.toggle("is-visible", shouldShow);
  };

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", syncVisibility, { passive: true });
  window.addEventListener("resize", syncVisibility);

  var observer = new MutationObserver(syncVisibility);
  observer.observe(body, { attributes: true, attributeFilter: ["class"] });

  syncVisibility();
});
