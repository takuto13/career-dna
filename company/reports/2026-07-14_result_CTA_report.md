# result.html CTA 現状確認レポート

**作成日**: 2026-07-10（CTO_2026-07-14.md タスク3 前倒し実行）
**調査対象**: /public/result.html
**目的**: CTAボタン構成・GA4計測・CVR改善余地の現状把握

---

## 1. CTAボタン現状

### ボタン数
- **1本のみ**（result.html 全体で CTA は1か所）

### ボタン詳細

| 項目 | 内容 |
|------|------|
| id | `affiliate-btn` |
| テキスト | `このタイプに合う求人を見る →` |
| class | `btn btn-primary` |
| type | `button` |
| 遷移先 | `jobs.html?type=<診断タイプ名>` |
| 配置場所 | `#button-area`（全結果カード下部） |
| スクロール要否 | **要スクロール**（フォールド下） |

### 配置コード（抜粋）

```html
<div class="button-area" id="button-area">
  <button type="button" id="affiliate-btn" class="btn btn-primary">
    このタイプに合う求人を見る →
  </button>
</div>
```

---

## 2. GA4 計測実装状況

### result_to_jobs_click イベント ✅ 実装済み

```js
affiliateBtn.onclick = () => {
  const typeName = document.getElementById("type-name").textContent;
  if (typeof gtag === 'function') {
    gtag('event', 'result_to_jobs_click', {
      career_type: typeName,
      page_location: window.location.href,
      button_position: 'result_main_cta'
    });
  }
  window.location.href = "jobs.html?type=" + encodeURIComponent(typeName);
};
```

| パラメータ | 値 | 用途 |
|-----------|---|------|
| `career_type` | `typeName`（診断結果テキスト） | タイプ別クリック率比較 |
| `page_location` | `window.location.href` | URL計測 |
| `button_position` | `'result_main_cta'` | ボタン位置識別 |

**判定**: GA4 計測は完全実装済み。全8タイプの診断結果ページで同一コードが動作する。

---

## 3. CVR改善余地（情報収集のみ・設計変更提案はたくとへ報告）

### 現状の課題

1. **フォールド下配置**: CTAボタンがスクロールしないと見えない。診断完了後すぐに目に入らない。
2. **CTA1本のみ**: 結果ページ内で jobs.html へ誘導する経路がボタン1本。
3. **フォールド上にCTA無し**: 診断タイプ名・タイプ説明が表示されるエリア（フォールド内）にCTAが存在しない。

### 改善アイデア（実装は要たくと承認）

| アイデア | 想定効果 | 優先度 |
|---------|---------|--------|
| フォールド上部（タイプ名直下）にCTAを追加 | スクロール不要でCTA認知率向上 | 高 |
| タイプカード内のアンカーリンクから jobs.html へ導線追加 | 自然な導線で離脱防止 | 中 |
| 「診断をやり直す」ボタンをCTA横に配置 | UX向上・再診断促進 | 低 |

### GA4 で計測すべき追加イベント（現状は未実装）

- ページ到達後のスクロール深度（CTAがビューポートに入ったか）
- 診断タイプ別の result.html → jobs.html 転換率

---

## 4. 総合評価

| 評価項目 | 状態 |
|---------|------|
| GA4 `result_to_jobs_click` 実装 | ✅ 完了 |
| 全タイプ動作 | ✅ 動的取得（career_type: typeName） |
| CTA本数 | 1本（要改善余地あり） |
| フォールド内CTA | ❌ 未設置 |
| たくとへのエスカレーション | CTA追加・レイアウト変更は別途承認要 |

---

## 5. 次アクション

- **CTO自律可**: 現状のまま GA4 計測継続・データ蓄積
- **たくと承認要**: フォールド上部への CTA 追加、ボタンコピー変更、CTA 本数追加
- **データ確認推奨**: GA4 で `result_to_jobs_click` イベント→ `affiliate_click` の転換ファネル確認（2週間後を目安）
