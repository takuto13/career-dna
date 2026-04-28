/**
 * キャリアDNA 結果ページ制御
 * - localStorage から回答を読み込み
 * - localhost のみ /api/diagnose を呼び出し
 * - 15秒タイムアウト + 画面エラー表示
 */
(function () {
  "use strict";

  var DIAGNOSE_API_PATH = "/api/diagnose";
  var API_TIMEOUT_MS = 15000;
  var STORAGE_KEY =
    (window.__CAREER_DIAGNOSIS__ && window.__CAREER_DIAGNOSIS__.STORAGE_KEY) ||
    "careerDiagnosisAnswersV1";

  var DUMMY_RESULT = {
    type_name: "診断中...",
    type_catch: "結果を生成しています",
    summary: "AIが結果を生成中です。しばらくお待ちください。",
    strengths: ["分析中", "分析中", "分析中"],
    weakness: "分析中",
    suitable_jobs: ["分析中"],
    career_message: "結果の生成に時間がかかっています。",
    share_text: "#キャリアDNA診断",
  };

  var TYPE_LABEL = {
    A: "戦略・俯瞰タイプ",
    B: "専門・深化タイプ",
    C: "協調・調整タイプ",
    D: "行動・挑戦タイプ",
  };

  function logStep(label, payload) {
    if (payload === undefined) {
      console.log("[result]", label);
      return;
    }
    console.log("[result]", label, payload);
  }

  function setLoadingVisible(visible) {
    var loading = document.getElementById("loading-section");
    if (!loading) return;
    loading.classList.toggle("hidden", !visible);
  }

  function showStatus(message, showRetry, showBackToIndex) {
    var section = document.getElementById("status-section");
    var msg = document.getElementById("status-message");
    var retryBtn = document.getElementById("retry-btn");
    var backBtn = document.getElementById("back-index-btn");
    if (msg) msg.textContent = message;
    if (section) section.classList.remove("hidden");
    if (retryBtn) retryBtn.classList.toggle("hidden", !showRetry);
    if (backBtn) backBtn.classList.toggle("hidden", !showBackToIndex);
  }

  function hideStatus() {
    var section = document.getElementById("status-section");
    if (section) section.classList.add("hidden");
  }

  function showFallbackBanner(message) {
    var fb = document.getElementById("fallback-banner");
    if (!fb) return;
    var text = fb.querySelector(".fallback-text");
    if (text && message) text.textContent = message;
    fb.classList.remove("hidden");
  }

  function getTypeIconFromName(typeName) {
    var name = String(typeName || "");
    if (name.indexOf("戦略") !== -1 || name.indexOf("俯瞰") !== -1) return "🧭";
    if (name.indexOf("専門") !== -1 || name.indexOf("深化") !== -1) return "🔨";
    if (name.indexOf("協調") !== -1 || name.indexOf("調整") !== -1) return "🤝";
    if (name.indexOf("行動") !== -1 || name.indexOf("挑戦") !== -1) return "🚀";
    return "🧬";
  }

  function setTypeImage(typeName) {
    var typeImage = document.getElementById("type-image");
    var wrap = document.getElementById("result-type-image-wrap");
    var icon = document.getElementById("type-icon");
    if (icon) icon.textContent = getTypeIconFromName(typeName);
    if (!typeImage || !wrap) return;

    var name = String(typeName || "");
    var map = [
      { keys: ["戦略", "俯瞰"], img: "images/type-strategist.png" },
      { keys: ["職人", "専門", "深化"], img: "images/type-craftsman.png" },
      { keys: ["調整", "協調"], img: "images/type-mediator.png" },
      { keys: ["挑戦", "行動"], img: "images/type-challenger.png" },
      { keys: ["分析"], img: "images/type-analyst.png" },
      { keys: ["表現"], img: "images/type-creator.png" },
      { keys: ["守護"], img: "images/type-guardian.png" },
      { keys: ["育成"], img: "images/type-nurturer.png" },
    ];
    var found = map.find(function (row) {
      return row.keys.some(function (k) {
        return name.indexOf(k) !== -1;
      });
    });
    if (!found) {
      wrap.classList.remove("is-loaded");
      typeImage.removeAttribute("src");
      return;
    }
    typeImage.onload = function () {
      wrap.classList.add("is-loaded");
    };
    typeImage.onerror = function () {
      wrap.classList.remove("is-loaded");
    };
    typeImage.src = found.img;
  }

  function renderResult(data) {
    hideStatus();
    setLoadingVisible(false);
    var result = document.getElementById("result-section");
    if (result) result.classList.remove("hidden");

    setTypeImage(data.type_name);
    document.getElementById("type-name").textContent = data.type_name;
    document.getElementById("type-catch").textContent = data.type_catch;
    document.getElementById("summary").textContent = data.summary;

    var strengths = document.getElementById("strengths");
    strengths.innerHTML = "";
    (data.strengths || []).slice(0, 3).forEach(function (s) {
      var li = document.createElement("li");
      li.textContent = s;
      strengths.appendChild(li);
    });

    document.getElementById("weakness").textContent = data.weakness;

    var jobs = document.getElementById("suitable-jobs");
    jobs.innerHTML = "";
    (data.suitable_jobs || []).forEach(function (j) {
      var li = document.createElement("li");
      li.textContent = j;
      jobs.appendChild(li);
    });

    document.getElementById("career-message").textContent = data.career_message;
    var share = document.getElementById("share-x");
    share.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(data.share_text || "#キャリアDNA診断");
  }

  function readAnswersFromStorage() {
    var raw = localStorage.getItem(STORAGE_KEY);
    logStep("localStorage read", { key: STORAGE_KEY, exists: !!raw });
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 25) return null;
    logStep("localStorage parsed", { length: parsed.length, sample: parsed.slice(0, 5) });
    return parsed;
  }

  function countAnswers(answers) {
    var counts = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(function (a) {
      if (counts[a] !== undefined) counts[a] += 1;
    });
    return counts;
  }

  function getMainAndSubTypes(counts) {
    var keys = ["A", "B", "C", "D"];
    keys.sort(function (a, b) {
      if (counts[b] !== counts[a]) return counts[b] - counts[a];
      return a < b ? -1 : 1;
    });
    return { mainKey: keys[0], subKey: keys[1] };
  }

  function buildUserPrompt(counts, mainKey, subKey) {
    return (
      "以下はユーザーの診断の回答集計です。\n" +
      "- Aの回答数: " + counts.A + "\n" +
      "- Bの回答数: " + counts.B + "\n" +
      "- Cの回答数: " + counts.C + "\n" +
      "- Dの回答数: " + counts.D + "\n" +
      "- メインタイプ: " + TYPE_LABEL[mainKey] + "（キー: " + mainKey + "）\n" +
      "- サブタイプ: " + TYPE_LABEL[subKey] + "（キー: " + subKey + "）\n\n" +
      "上記を踏まえて、指定のJSON形式のみで診断結果を生成してください。"
    );
  }

  function parseJsonFromModelText(text) {
    var trimmed = String(text || "").trim();
    var fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence && fence[1]) trimmed = fence[1].trim();
    var parsed = JSON.parse(trimmed);
    logStep("JSON parse completed", parsed);
    return parsed;
  }

  function validatePayload(obj) {
    if (!obj || typeof obj !== "object") return false;
    if (typeof obj.type_name !== "string") return false;
    if (typeof obj.type_catch !== "string") return false;
    if (typeof obj.summary !== "string") return false;
    if (!Array.isArray(obj.strengths) || obj.strengths.length < 1) return false;
    if (typeof obj.weakness !== "string") return false;
    if (!Array.isArray(obj.suitable_jobs) || obj.suitable_jobs.length < 1) return false;
    if (typeof obj.career_message !== "string") return false;
    if (typeof obj.share_text !== "string") return false;
    return true;
  }

  function fetchDiagnosisWithTimeout(userPrompt, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, timeoutMs);
    logStep("API request send", { endpoint: DIAGNOSE_API_PATH, timeoutMs: timeoutMs });
    return fetch(DIAGNOSE_API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userPrompt }),
      signal: controller.signal,
    })
      .then(function (res) {
        logStep("API response received", { ok: res.ok, status: res.status });
        if (!res.ok) {
          return res.text().then(function (t) {
            throw new Error("HTTP " + res.status + " " + t);
          });
        }
        return res.json();
      })
      .finally(function () {
        clearTimeout(timer);
      });
  }

  function bootResultPage() {
    var retryBtn = document.getElementById("retry-btn");
    if (retryBtn) retryBtn.addEventListener("click", function () { window.location.reload(); });

    var answers = readAnswersFromStorage();
    if (!answers) {
      setLoadingVisible(false);
      showStatus("診断データが見つかりません。", false, true);
      return;
    }

    var incomplete = answers.some(function (a) {
      return a !== "A" && a !== "B" && a !== "C" && a !== "D";
    });
    if (incomplete) {
      setLoadingVisible(false);
      showStatus("診断データが未完了です。", false, true);
      return;
    }

    if (window.location.hostname !== "localhost") {
      setLoadingVisible(false);
      showFallbackBanner("この環境ではAPIを呼び出せません。`node server.js` で確認してください。");
      renderResult(DUMMY_RESULT);
      return;
    }

    var counts = countAnswers(answers);
    var ms = getMainAndSubTypes(counts);
    var userPrompt = buildUserPrompt(counts, ms.mainKey, ms.subKey);

    fetchDiagnosisWithTimeout(userPrompt, API_TIMEOUT_MS)
      .then(function (payload) {
        var obj = payload && payload.parsed ? payload.parsed : null;
        if (!obj && payload && payload.rawText) obj = parseJsonFromModelText(payload.rawText);
        if (!validatePayload(obj)) throw new Error("JSON スキーマが不正です");
        if (!payload.parsed && payload.rawText) logStep("JSON parse completed", obj);
        renderResult(obj);
      })
      .catch(function (err) {
        console.error("[result] fetch error", err);
        setLoadingVisible(false);
        if (err && err.name === "AbortError") {
          showStatus("時間がかかっています（15秒でタイムアウト）。もう一度お試しください。", true, false);
          return;
        }
        showStatus("結果の取得に失敗しました: " + err.message, true, true);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootResultPage);
  } else {
    bootResultPage();
  }
})();
