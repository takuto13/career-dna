/**
 * キャリアタイプ診断：25問の出題・回答保存・結果ページへ遷移
 * 回答は localStorage（STORAGE_KEY）に配列で保存します（例：["A","C",...]）
 */

(function () {
  "use strict";

  /** @type {{ id:number, text:string, options:{ key:"A"|"B"|"C"|"D", text:string }[] }[]} */
  var QUESTIONS = [
    {
      id: 1,
      text: "新しいプロジェクトが始まったとき、あなたは？",
      options: [
        { key: "A", text: "まず全体像と目標を把握しようとする" },
        { key: "B", text: "自分の担当範囲に集中して深掘りする" },
        { key: "C", text: "チームメンバーの状況を把握しようとする" },
        { key: "D", text: "とにかく動いてみて考える" },
      ],
    },
    {
      id: 2,
      text: "問題が起きたとき、最初にとる行動は？",
      options: [
        { key: "A", text: "原因を分析してから解決策を考える" },
        { key: "B", text: "過去の経験から直感的に動く" },
        { key: "C", text: "周りに相談して一緒に解決しようとする" },
        { key: "D", text: "すぐに行動して修正しながら進む" },
      ],
    },
    {
      id: 3,
      text: "仕事で一番達成感を感じる瞬間は？",
      options: [
        { key: "A", text: "戦略が当たって結果が出たとき" },
        { key: "B", text: "クオリティの高いものが完成したとき" },
        { key: "C", text: "チームがうまく機能したとき" },
        { key: "D", text: "新しいことに挑戦して成功したとき" },
      ],
    },
    {
      id: 4,
      text: "締め切りに対するあなたのスタンスは？",
      options: [
        { key: "A", text: "逆算してスケジュールを組む" },
        { key: "B", text: "クオリティを優先してギリギリまでこだわる" },
        { key: "C", text: "チーム全体が間に合うよう調整する" },
        { key: "D", text: "スピード重視で早めに出す" },
      ],
    },
    {
      id: 5,
      text: "会議でのあなたの役割は？",
      options: [
        { key: "A", text: "議題の整理・方向性の決定" },
        { key: "B", text: "専門的な意見・データの提供" },
        { key: "C", text: "場の雰囲気づくり・意見の調整" },
        { key: "D", text: "新しいアイデアの提案" },
      ],
    },
    {
      id: 6,
      text: "情報収集するとき、あなたは？",
      options: [
        { key: "A", text: "体系的に整理しながら集める" },
        { key: "B", text: "興味のある分野を徹底的に深掘りする" },
        { key: "C", text: "人から話を聞くことを重視する" },
        { key: "D", text: "とりあえず手を動かしながら学ぶ" },
      ],
    },
    {
      id: 7,
      text: "意思決定するとき、重視するのは？",
      options: [
        { key: "A", text: "データと論理" },
        { key: "B", text: "自分の経験と専門知識" },
        { key: "C", text: "周りへの影響と合意形成" },
        { key: "D", text: "直感とスピード" },
      ],
    },
    {
      id: 8,
      text: "理想の仕事環境は？",
      options: [
        { key: "A", text: "裁量が大きく戦略に関われる" },
        { key: "B", text: "専門性を活かせる環境" },
        { key: "C", text: "チームワークを大切にする職場" },
        { key: "D", text: "変化が多くチャレンジできる環境" },
      ],
    },
    {
      id: 9,
      text: "苦手なことに近いのは？",
      options: [
        { key: "A", text: "細かいルーティン作業" },
        { key: "B", text: "人との調整・根回し" },
        { key: "C", text: "一人で黙々とやる作業" },
        { key: "D", text: "変化のない安定した環境" },
      ],
    },
    {
      id: 10,
      text: "5年後のなりたい姿に近いのは？",
      options: [
        { key: "A", text: "組織の方向性を決める立場" },
        { key: "B", text: "その道のプロフェッショナル" },
        { key: "C", text: "信頼されるチームの中心人物" },
        { key: "D", text: "新しい事業や仕組みを作っている" },
      ],
    },
    {
      id: 11,
      text: "初対面の人と話すとき、あなたは？",
      options: [
        { key: "A", text: "相手のバックグラウンドや考えを把握しようとする" },
        { key: "B", text: "共通の専門話題を見つけようとする" },
        { key: "C", text: "相手が話しやすい雰囲気を作ろうとする" },
        { key: "D", text: "自分のことを積極的に話す" },
      ],
    },
    {
      id: 12,
      text: "チームで意見が分かれたとき、あなたは？",
      options: [
        { key: "A", text: "論理的に最善策を示す" },
        { key: "B", text: "専門的な観点から意見を述べる" },
        { key: "C", text: "全員が納得できる着地点を探す" },
        { key: "D", text: "決断を促して前に進む" },
      ],
    },
    {
      id: 13,
      text: "部下や後輩への接し方に近いのは？",
      options: [
        { key: "A", text: "目標と役割を明確に伝える" },
        { key: "B", text: "専門スキルをしっかり教える" },
        { key: "C", text: "相談しやすい関係を作る" },
        { key: "D", text: "挑戦させて自分で気づかせる" },
      ],
    },
    {
      id: 14,
      text: "職場の人間関係について？",
      options: [
        { key: "A", text: "仕事上の信頼関係が最重要" },
        { key: "B", text: "深く関わらなくてもいい" },
        { key: "C", text: "良好な関係が仕事のモチベーション" },
        { key: "D", text: "刺激し合えるライバルがいると燃える" },
      ],
    },
    {
      id: 15,
      text: "誰かに頼まれたとき、あなたは？",
      options: [
        { key: "A", text: "優先度を判断して対応する" },
        { key: "B", text: "自分の専門範囲なら丁寧に対応する" },
        { key: "C", text: "できる限り引き受けようとする" },
        { key: "D", text: "やりながら新しい方法を試す" },
      ],
    },
    {
      id: 16,
      text: "仕事で最も大切にしていることは？",
      options: [
        { key: "A", text: "成果と影響力" },
        { key: "B", text: "クオリティと専門性" },
        { key: "C", text: "チームと信頼関係" },
        { key: "D", text: "成長と挑戦" },
      ],
    },
    {
      id: 17,
      text: "仕事のやりがいを感じる源泉は？",
      options: [
        { key: "A", text: "大きな目標を達成したとき" },
        { key: "B", text: "スキルが上がったと実感したとき" },
        { key: "C", text: "誰かの役に立てたとき" },
        { key: "D", text: "新しいことを始めたとき" },
      ],
    },
    {
      id: 18,
      text: "評価されたいのはどんな点？",
      options: [
        { key: "A", text: "判断力・リーダーシップ" },
        { key: "B", text: "専門知識・技術力" },
        { key: "C", text: "コミュニケーション・調整力" },
        { key: "D", text: "行動力・発想力" },
      ],
    },
    {
      id: 19,
      text: "転職・就職で最も重視するのは？",
      options: [
        { key: "A", text: "裁量の大きさ・ポジション" },
        { key: "B", text: "専門性が活かせるか" },
        { key: "C", text: "職場の雰囲気・人間関係" },
        { key: "D", text: "成長できる環境・事業の面白さ" },
      ],
    },
    {
      id: 20,
      text: "理想のキャリアに近いのは？",
      options: [
        { key: "A", text: "経営幹部・リーダー" },
        { key: "B", text: "業界屈指の専門家" },
        { key: "C", text: "頼られる存在・チームの要" },
        { key: "D", text: "起業家・新規事業責任者" },
      ],
    },
    {
      id: 21,
      text: "ストレスを感じやすい状況は？",
      options: [
        { key: "A", text: "非効率・無駄な動きが多い環境" },
        { key: "B", text: "クオリティを妥協させられるとき" },
        { key: "C", text: "チームの雰囲気が悪いとき" },
        { key: "D", text: "変化がなく同じことの繰り返し" },
      ],
    },
    {
      id: 22,
      text: "仕事後にエネルギーが回復するのは？",
      options: [
        { key: "A", text: "次の戦略を考えているとき" },
        { key: "B", text: "好きな分野を深掘りしているとき" },
        { key: "C", text: "仲間と話して笑っているとき" },
        { key: "D", text: "新しい趣味・挑戦をしているとき" },
      ],
    },
    {
      id: 23,
      text: "「つまらない」と感じる仕事は？",
      options: [
        { key: "A", text: "誰でもできる単純作業" },
        { key: "B", text: "専門性が不要な雑務" },
        { key: "C", text: "一人で完結する孤独な作業" },
        { key: "D", text: "ルーティンで変化のない仕事" },
      ],
    },
    {
      id: 24,
      text: "モチベーションが上がるのは？",
      options: [
        { key: "A", text: "大きな目標・ビジョンがあるとき" },
        { key: "B", text: "スキルアップを実感できるとき" },
        { key: "C", text: "チームがうまくいっているとき" },
        { key: "D", text: "新しいチャレンジが始まるとき" },
      ],
    },
    {
      id: 25,
      text: "あなたが「自分らしい」と感じる瞬間は？",
      options: [
        { key: "A", text: "全体を俯瞰して的確な判断をしたとき" },
        { key: "B", text: "誰よりも深く知識・技術を持っているとき" },
        { key: "C", text: "周りから「助かった」と言われたとき" },
        { key: "D", text: "誰もやっていないことに挑戦しているとき" },
      ],
    },
  ];

  /** localStorage キー（api.js と共有するため window に露出） */
  var STORAGE_KEY = "careerDiagnosisAnswersV1";

  var heroSection = document.getElementById("hero-section");
  var quizSection = document.getElementById("quiz-section");
  var startBtn = document.getElementById("start-btn");
  var progressLabel = document.getElementById("progress-label");
  var progressPercent = document.getElementById("progress-percent");
  var progressBar = document.getElementById("progress-bar");
  var progressFill = document.getElementById("progress-bar-fill");
  var questionText = document.getElementById("question-text");
  var choicesEl = document.getElementById("choices");
  var backBtn = document.getElementById("back-btn");

  var currentIndex = 0;
  /** @type {("A"|"B"|"C"|"D"|null)[]} */
  var answers = new Array(QUESTIONS.length).fill(null);

  function countAnswers(answerList) {
    var counts = { A: 0, B: 0, C: 0, D: 0 };
    answerList.forEach(function (a) {
      if (a && counts[a] !== undefined) counts[a] += 1;
    });
    return counts;
  }

  function getSingleType(key) {
    var map = {
      A: "戦略家タイプ",
      B: "職人タイプ",
      C: "調整役タイプ",
      D: "挑戦者タイプ"
    };
    return map[key];
  }

  function getMainType(counts) {
    var priority = { A: 0, B: 1, C: 2, D: 3 };
    var sorted = Object.entries(counts).sort(function (a, b) {
      if (b[1] !== a[1]) return b[1] - a[1];
      return priority[a[0]] - priority[b[0]];
    });
    var first = sorted[0][0];
    var second = sorted[1][0];
    var pair = [first, second].sort().join("");
    var pairMap = {
      AB: "分析者タイプ",
      BD: "表現者タイプ",
      BC: "守護者タイプ",
      CD: "育成者タイプ"
    };
    if (sorted[0][1] - sorted[1][1] <= 3) {
      return pairMap[pair] || getSingleType(first);
    }
    return getSingleType(first);
  }

  var subTypeMap = {
    "戦略家タイプ": {
      condition: function (counts) { return counts.A >= 13; },
      subA: "長期ビジョン型",
      subB: "現場指揮型"
    },
    "職人タイプ": {
      condition: function (counts) { return counts.B >= 13; },
      subA: "深化探求型",
      subB: "技術革新型"
    },
    "調整役タイプ": {
      condition: function (counts) { return counts.C >= 13; },
      subA: "共感サポート型",
      subB: "交渉調整型"
    },
    "挑戦者タイプ": {
      condition: function (counts) { return counts.D >= 13; },
      subA: "直感行動型",
      subB: "計画挑戦型"
    },
    "分析者タイプ": {
      condition: function (counts) { return (counts.A + counts.B) % 2 !== 0; },
      subA: "データ論理型",
      subB: "仮説検証型"
    },
    "表現者タイプ": {
      condition: function (counts) { return (counts.B + counts.D) % 2 !== 0; },
      subA: "ビジュアル創造型",
      subB: "言語表現型"
    },
    "守護者タイプ": {
      condition: function (counts) { return (counts.B + counts.C) % 2 !== 0; },
      subA: "規律堅守型",
      subB: "縁の下支援型"
    },
    "育成者タイプ": {
      condition: function (counts) { return (counts.C + counts.D) % 2 !== 0; },
      subA: "個別育成型",
      subB: "組織開発型"
    }
  };

  function getSubType(mainTypeName, counts) {
    var rule = subTypeMap[mainTypeName];
    if (!rule) return "";
    return rule.condition(counts) ? rule.subA : rule.subB;
  }

  function saveAnswers() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      console.log("[diagnosis] localStorage 保存", {
        key: STORAGE_KEY,
        answeredCount: answers.filter(function (a) { return a !== null; }).length,
      });
    } catch (e) {
      console.error("[diagnosis] localStorage 保存に失敗しました", e);
    }
  }

  function updateProgressUI() {
    var n = currentIndex + 1;
    var total = QUESTIONS.length;
    var pct = (n / total) * 100;
    progressLabel.textContent = "Q" + n + " / " + total + "問";
    if (progressPercent) progressPercent.textContent = Math.round(pct) + "%";
    progressBar.setAttribute("aria-valuenow", String(n));
    progressBar.setAttribute("aria-valuemax", String(total));
    progressFill.style.width = pct + "%";
  }

  function renderQuestion() {
    var q = QUESTIONS[currentIndex];
    questionText.textContent = "Q" + q.id + ". " + q.text;
    choicesEl.innerHTML = "";

    q.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.setAttribute("data-key", opt.key);
      btn.innerHTML =
        '<span class="choice-key" aria-hidden="true">' +
        opt.key +
        "</span>" +
        opt.text;
      btn.addEventListener("click", function () {
        onChoose(opt.key);
      });
      choicesEl.appendChild(btn);
    });

    updateProgressUI();
    backBtn.disabled = currentIndex === 0;
  }

  function onChoose(key) {
    answers[currentIndex] = key;
    saveAnswers();

    if (currentIndex === QUESTIONS.length - 1) {
      var counts = countAnswers(answers);
      var mainType = getMainType(counts);
      var subType = getSubType(mainType, counts);
      localStorage.setItem("diagnosisResult", JSON.stringify({
        counts: counts,
        main_type: mainType,
        sub_type: subType,
        answers: answers
      }));
      console.log("[diagnosis] 診断完了。./result.htmlへ遷移します", {
        key: STORAGE_KEY,
        main_type: mainType,
        sub_type: subType,
        counts: counts
      });
      window.location.href = "./result.html";
      return;
    }

    currentIndex += 1;
    renderQuestion();
  }

  function goBack() {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    renderQuestion();
  }

  function startQuiz() {
    document.body.classList.add("is-diagnosing");
    document.querySelectorAll("section, .hero, .type-section, .feature-section, .cta-section")
      .forEach(function (el) { el.style.display = "none"; });
    var nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    var footer = document.querySelector(".global-footer");
    if (footer) footer.style.display = "none";
    var landingMain = document.querySelector(".landing-main");
    if (landingMain) landingMain.style.paddingTop = "0";
    document.body.style.background = "#f8f9ff";
    var diagnosisSection = document.getElementById("diagnosis-section");
    if (diagnosisSection) diagnosisSection.style.display = "block";
    window.scrollTo(0, 0);
    heroSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    quizSection.style.display = "block";
    currentIndex = 0;
    // 再診断時は上書きするため、開始時に配列を初期化
    answers = new Array(QUESTIONS.length).fill(null);
    saveAnswers();
    localStorage.removeItem("diagnosisResult");
    if (diagnosisSection) diagnosisSection.style.display = "block";
    renderQuestion();
  }

  startBtn.addEventListener("click", startQuiz);
  backBtn.addEventListener("click", goBack);

  // 他ページ（結果）から参照できるようキーを公開
  window.__CAREER_DIAGNOSIS__ = { STORAGE_KEY: STORAGE_KEY, QUESTION_COUNT: QUESTIONS.length };
})();
