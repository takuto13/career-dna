// ━━━━━━━━━━━━━━━━━━━━━
// GA4 拡張イベント計測スクリプト
// ━━━━━━━━━━━━━━━━━━━━━

(function () {
  'use strict';

  // ── スクロール深度計測 ──
  var scrollMarks = [25, 50, 75, 100];
  var scrollFired = {};

  function getScrollPercent() {
    var el = document.documentElement;
    var body = document.body;
    var scrollTop = window.pageYOffset || el.scrollTop || body.scrollTop;
    var scrollHeight = el.scrollHeight || body.scrollHeight;
    var clientHeight = el.clientHeight || window.innerHeight;
    var scrollable = scrollHeight - clientHeight;
    if (scrollable <= 0) return 100;
    return Math.min(100, Math.round((scrollTop / scrollable) * 100));
  }

  function onScroll() {
    var pct = getScrollPercent();
    scrollMarks.forEach(function (mark) {
      if (!scrollFired[mark] && pct >= mark) {
        scrollFired[mark] = true;
        if (typeof gtag === 'function') {
          gtag('event', 'scroll_depth', {
            depth_percentage: mark,
            page_path: window.location.pathname
          });
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── 診断開始クリック計測（index.html の診断スタートボタン用）──
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-ga-event]');
    if (!btn) return;
    var eventName = btn.getAttribute('data-ga-event');
    var params = {};
    Array.prototype.forEach.call(btn.attributes, function (attr) {
      if (attr.name.indexOf('data-ga-') === 0 && attr.name !== 'data-ga-event') {
        var key = attr.name.replace('data-ga-', '').replace(/-/g, '_');
        params[key] = attr.value;
      }
    });
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  });

  // ── ページ滞在時間計測（30秒・60秒・120秒） ──
  var engagementMarks = [30, 60, 120];
  var engagementFired = {};
  var startTime = Date.now();

  engagementMarks.forEach(function (sec) {
    setTimeout(function () {
      if (engagementFired[sec]) return;
      engagementFired[sec] = true;
      if (typeof gtag === 'function') {
        gtag('event', 'time_on_page', {
          seconds: sec,
          page_path: window.location.pathname
        });
      }
    }, sec * 1000);
  });

})();
