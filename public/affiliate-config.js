// ━━━━━━━━━━━━━━━━━━━━━
// アフィリエイト広告設定ファイル
// ━━━━━━━━━━━━━━━━━━━━━

// ファルマスタッフ テキスト
const PHARMA_TEXT = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+71MOHE+276A+63OYA" rel="nofollow">薬剤師の転職＆派遣ならファルマスタッフ</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B1XDY+71MOHE+276A+63OYA" alt="">`;

// ファルマスタッフ バナー350×160
const PHARMA_BANNER = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+71MOHE+276A+67Z9T" rel="nofollow"><img border="0" width="350" height="160" alt="" src="https://www23.a8.net/svt/bgt?aid=260430406426&wid=001&eno=01&mid=s00000010261001045000&mc=1"></a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B1XDY+71MOHE+276A+67Z9T" alt="">`;

// 明光キャリアパートナーズ テキスト
const MEIKO_TEXT = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+70FT9U+5P1E+5YJRM" rel="nofollow">自分らしく働けるエンジニア転職を目指すなら【strategy career】</a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B1XDY+70FT9U+5P1E+5YJRM" alt="">`;

// 明光キャリアパートナーズ バナー300×250
const MEIKO_BANNER = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+70FT9U+5P1E+5YZ75" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=260430406424&wid=001&eno=01&mid=s00000026573001003000&mc=1"></a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B1XDY+70FT9U+5P1E+5YZ75" alt="">`;

// PE-BANK テキスト
const PEBANK_TEXT = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+AL1FXU+3SLI+5YRHE" rel="nofollow">エンジニアのプロ契約なら【Pe-BANK】</a><img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B1XDY+AL1FXU+3SLI+5YRHE" alt="">`;

// PE-BANK バナー300×250
const PEBANK_BANNER = `<a href="https://px.a8.net/svt/ejp?a8mat=4B1XDY+AL1FXU+3SLI+5ZU29" rel="nofollow"><img border="0" width="300" height="250" alt="" src="https://www22.a8.net/svt/bgt?aid=260430406640&wid=001&eno=01&mid=s00000017703001007000&mc=1"></a><img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B1XDY+AL1FXU+3SLI+5ZU29" alt="">`;

// ━━━━━━━━━━━━━━━━━━━━━
// タイプ別広告設定
// ━━━━━━━━━━━━━━━━━━━━━

const TYPE_AFFILIATE_MAP = {
  "職人": {
    main: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    sub: { text: PEBANK_TEXT, banner: PEBANK_BANNER },
    label: "🔨 エンジニアのキャリアを活かす"
  },
  "分析": {
    main: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    sub: { text: PEBANK_TEXT, banner: PEBANK_BANNER },
    label: "📊 あなたのスキルを活かせる求人"
  },
  "表現": {
    main: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    sub: { text: PEBANK_TEXT, banner: PEBANK_BANNER },
    label: "🎨 クリエイター向けエンジニア求人"
  },
  "守護": {
    main: { text: PHARMA_TEXT, banner: PHARMA_BANNER },
    sub: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    label: "🛡️ 専門性を活かせる求人"
  },
  "育成": {
    main: { text: PHARMA_TEXT, banner: PHARMA_BANNER },
    sub: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    label: "🌱 人を支える仕事の求人"
  },
  "調整": {
    main: { text: PHARMA_TEXT, banner: PHARMA_BANNER },
    sub: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    label: "🤝 あなたに合う求人"
  },
  "戦略": {
    main: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    sub: { text: PHARMA_TEXT, banner: PHARMA_BANNER },
    label: "🧭 キャリアアップの求人"
  },
  "挑戦": {
    main: { text: MEIKO_TEXT, banner: MEIKO_BANNER },
    sub: { text: PEBANK_TEXT, banner: PEBANK_BANNER },
    label: "🚀 新しいキャリアへの挑戦"
  }
};
