# キャリアDNA サイト遷移図（個人用メモ）

## ユーザーフロー

```mermaid
flowchart TD
    A([ユーザー訪問]) --> LP

    subgraph TOP["トップページ (index.html)"]
        LP[ランディング\nヒーローセクション]
        LP -->|タイプ一覧セクション\n各タイプカードをクリック| TYPES
        LP -->|診断開始ボタン| Q1
        subgraph QUIZ["診断セクション（同一ページ内）"]
            Q1[Q1〜Q24\n回答選択\nA/B/C/D]
            Q1 -->|次の問へ| Q1
            Q1 -->|戻るボタン| Q1
            Q1 -->|Q25 回答| CALC
            CALC["タイプ集計\n・countAnswers\n・getMainType\n・getSubType"]
        end
    end

    CALC -->|localStorage保存\n→ result.html へ| RES

    subgraph RESULT["結果ページ (result.html)"]
        RES[ローディング画面\n「DNAを解析中...」]
        RES -->|localStorage読み込み| API
        API["POST /api/diagnose\nAnthropic Claude API\n→ JSONレスポンス"]
        API -->|成功| DISP
        API -->|失敗| ERR[フォールバック表示]
        DISP["診断結果表示\n・タイプ名 / サブ型\n・強み・向いてる職種\n・キャリアメッセージ\n・アフィリエイトCTA"]
    end

    DISP -->|判定タイプに対応した\n詳細ページへリンク| TYPES

    subgraph TYPES["タイプ別詳細ページ (8種)"]
        TS[type-strategist.html\n戦略家タイプ]
        TA[type-analyst.html\n分析者タイプ]
        TC[type-craftsman.html\n職人タイプ]
        TCR[type-creator.html\n表現者タイプ]
        TG[type-guardian.html\n守護者タイプ]
        TM[type-mediator.html\n調整役タイプ]
        TN[type-nurturer.html\n育成者タイプ]
        TCH[type-challenger.html\n挑戦者タイプ]
        TS & TA & TC & TCR & TG & TM & TN & TCH -->|「他のタイプを見る」\n全8タイプに相互リンク| TYPES
    end

    subgraph INFO["情報ページ"]
        FAQ[faq.html\nよくある質問]
        JB[jobs.html\n求人情報]
        AB[about.html\nサービス概要]
        CT[contact.html\nお問い合わせ]
        PR[privacy.html\nプライバシーポリシー]
        DS[disclaimer.html\n免責事項]
    end

    LP --> INFO
    DISP --> INFO
    TYPES --> LP
    TYPES --> INFO
    INFO --> LP
```

### タイプページへの遷移元まとめ

| 遷移元 | 経路 |
|---|---|
| result.html | 診断完了後、判定タイプに対応したページへリンク表示 |
| index.html | タイプ一覧セクションの各カードから直接リンク |
| 各タイプページ | 「他のタイプを見る」セクションで全8タイプに相互リンク |

---

## タイプ判定ロジック

```mermaid
flowchart TD
    ANS["25問の回答\nA/B/C/D"] --> CNT["各選択肢を集計\nA: n回 / B: n回\nC: n回 / D: n回"]

    CNT --> DIFF{"1位と2位の差\n≤ 3?"}

    DIFF -->|Yes（混合型）| PAIR{"上位2選択肢の組み合わせ"}
    DIFF -->|No（単独型）| SINGLE{"最多選択肢"}

    PAIR -->|AB| P1[分析者タイプ]
    PAIR -->|BC| P2[守護者タイプ]
    PAIR -->|BD| P3[表現者タイプ]
    PAIR -->|CD| P4[育成者タイプ]
    PAIR -->|その他| SINGLE

    SINGLE -->|A最多| S1[戦略家タイプ]
    SINGLE -->|B最多| S2[職人タイプ]
    SINGLE -->|C最多| S3[調整役タイプ]
    SINGLE -->|D最多| S4[挑戦者タイプ]

    P1 & P2 & P3 & P4 & S1 & S2 & S3 & S4 --> SUB["サブ型判定\n（スコア条件で2分岐）"]
    SUB --> DONE["main_type + sub_type\n→ localStorage保存"]
```

---

## API通信フロー

```mermaid
sequenceDiagram
    participant Browser as ブラウザ (result.html)
    participant LS as localStorage
    participant API as /api/diagnose (Vercel)
    participant AI as Anthropic Claude API

    Browser->>LS: diagnosisResult 読み込み
    LS-->>Browser: { main_type, sub_type, counts, answers }
    Browser->>API: POST { main_type, sub_type, counts }
    API->>AI: メッセージ送信（systemPrompt + userPrompt）
    AI-->>API: JSON レスポンス
    API-->>Browser: { parsed: { type_name, strengths, ... } }
    Browser->>Browser: 診断結果を画面に描画
    Browser->>Browser: アフィリエイトCTA表示
```
