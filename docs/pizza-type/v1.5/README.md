# Pizza Type Ver.1.5 — 技術的な公開準備

最終の結果・固定Preview・未確認事項は [HANDOFF.md](HANDOFF.md) と [summary.json](summary.json) を参照。この最終記録はQA docs branchに保存する。

2026-10-19、本人のVer.1.5指示に基づく最小修正。新候補は `feat/pizza-type` に保存し、検証結果と固定Preview/SHAの最終引継ぎは `docs/pizza-v1.5-preview-qa` に保存する。main/Productionは変更しない。

- QA docsで検証済みの `e355ad48a1705f777d6d48abac0498e67b1574e4` を取り込み、`verification-v1.2/browser-check.cjs` を `.mjs` に変更、3つのrequireを標準importに置換した。既存のlintルール・ignore・依存は保持する。
- v1.1検証ログ3ファイルの末尾空白/EOF空行6件を整形した。[変更前後の記録](log-whitespace-audit.json)に元SHA、前後SHA256、diff、非空白token一致を保存する。実行結果・数値・失敗履歴・タイムスタンプは変更しない。
- 元の固定SHA `4dfcbe0a5c4c554e6dcd2095236bc277e4252c53` はlint3 errors・mainとの差分空白6件でFAILだった。旧v1.2 summaryの「lint0 errors」は固定SHAについて誤りであり、過去の失敗ログはそのまま保持する。新候補の検証結果を旧SHAへ遡及しない。
- 呼出元を検索した結果、`.cjs` 参照は旧失敗ログにのみ残る。これは当時の証跡であり変更しない。現在の実行対象は `docs/pizza-type/verification-v1.2/browser-check.mjs`。
- Pizza原稿・結果文・採点・配置・原画像8枚・visualKey/faceTransform・共通engine・既存5診断・Home designは変更しない。100万runは入力同一性を照合した場合に既存証拠を再利用し、正式閾値未定義の統計項目は未判定を維持する。

QA helperは既存のPlaywright/system Chromiumが利用できる環境で、許可された検証originを `PIZZA_QA_BASE`、出力先を `PIZZA_QA_OUT` に指定して実行する。repoへの不要な依存追加やブラウザ再ダウンロードは行わない。実Preview・local・実機Safariの確認範囲は最終引継ぎで区別する。

第7弾は次の診断1本の手順準備のみ。テーマ決定・原稿制作・画像生成、M/W依頼、新しい自動化基盤、Scaffold改造は今回の範囲に含めない。
