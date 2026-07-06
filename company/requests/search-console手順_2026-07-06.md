# Search Console クロール申請手順書

作成日：2026-07-06  
作成者：AI CTO  
目的：BreadcrumbList JSON-LD実装・秋採用SEOテキスト追加後のクロール申請で早期インデックス更新を促進

---

## 申請対象URL（11ページ）

| URL | 更新理由 |
|-----|---------|
| https://career-dna.jp/ | 秋採用SEOパラグラフ追加 |
| https://career-dna.jp/jobs.html | 秋採用シーズン特集セクション追加 |
| https://career-dna.jp/type-strategist.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-analyst.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-craftsman.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-mediator.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-challenger.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-creator.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-guardian.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/type-nurturer.html | 秋採用SEOテキスト追加 |
| https://career-dna.jp/faq.html | BreadcrumbList JSON-LD（前回実装分） |

---

## 手順

1. **Search Console** にログイン
   - URL: https://search.google.com/search-console/
   - career-dna.jp のプロパティを選択

2. **URL検査ツール** を開く
   - 左メニューの「URL検査」をクリック

3. **1URLずつ申請する**（一括申請不可）
   - 上記URLを1件ずつ検索バーに入力
   - 「インデックス登録をリクエスト」ボタンをクリック
   - 完了メッセージを確認後、次のURLへ

4. **優先順位**
   - index.html → jobs.html → 全8タイプページ → faq.html の順で申請

---

## 注意事項

- 1日に申請できるURLは最大10件（Googleの制限）
- 申請から実際のインデックス更新まで数日〜1週間かかる場合あり
- 申請後、「カバレッジ」レポートでインデックス状況を確認可能

---

## 期待効果

- 「秋採用 転職 タイプ別」「9月転職 エージェント おすすめ」「転職 10月入社 逆算スケジュール タイプ別」等のブルーオーシャンKWでの早期インデックス獲得
- BreadcrumbList JSON-LDのGoogle検索パンくず表示への適用
