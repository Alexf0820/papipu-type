# Pizza Type Ver.1.3 — 最終QA記録

2026-10-18。実装レビュー対象は `feat/pizza-type` の **`4dfcbe0a5c4c554e6dcd2095236bc277e4252c53` 固定**。本版は `docs/pizza-v1.3-final-qa` に記録を保存する。公開・main統合は行っていない。

**公開準備は残件あり。固定SHAのlintはFAIL。** 以前の `HANDOFF-v1.2.md` と `verification-v1.2/summary.json` にある「lint 0 errors」は、固定SHAに対して誤りだった。本記録がその訂正となる。過去ログを成功内容へ書き換えない。

追加指示に基づき、docsブランチだけでQA補助スクリプトを `.cjs` から `.mjs` に変更し、3つの `require()` を標準 `import` に変更した。ルール無効化・ignore追加・依存変更なし。修正commit `e355ad48a1705f777d6d48abac0498e67b1574e4` はpushとremote読戻し済み。**docs修正版のlintはexit 0（0 errors / 既存2 warnings）。固定SHAのFAILとは別結果であり、docs修正版を公開候補へ自動採用していない。**

## QA判定と証拠の範囲

| 項目 | 証拠・結果 | 今回の扱い |
|---|---|---|
| 完成原稿 | 8 result types / 8 traits、32問 / 128択、JA/EN全文、a/b/c、各3 motto、GOOD/BAD、visualKey、Home | 既存確定原稿を保持。handoff SHA256 `4e1f773e746e03e6b4f2b75e1926214f0510b1f2e0aa6b764a0aa09c0148e8f8` |
| 採点・配置 | 各type Main16 / Secondary16、各役割ABCD各4。Main +3 / Secondary +1 | v1.1、v1.2、固定SHAの採点投影hash一致 |
| 百万回・感度 | 1,000,000回 + 8ケース各500,000回。分布12.4388–12.5508%、差0.112pp。感度差0.111–0.204pp | 保存出力の合計・差を再計算。入力不変なので再実行せず再利用 |
| 質問偏り・言語parity | ±5pp表示flag 0、JA/EN 10,000/10,000一致 | 正式な統計合格閾値は未確定。**統計総合判定は未判定** |
| npm test | 20 files / 109 tests pass | v1.2最終原稿と固定SHAのアプリ入力一致を照合して再利用 |
| test:scaffold | 6 pass | Scaffold関連ファイル不変。再利用 |
| typegen / tsc / validate / build | 保存記録で成功。buildでJA/EN静的route生成 | 再利用。空のtscログ単体は成功証明にならず、当時の実行記録・buildのTypeScript成功と合わせて読む |
| 固定SHA lint | **exit 1、3 errors / 2 warnings** | 今回単独再実行。[lint-frozen.log](lint-frozen.log) |
| docs修正版 lint | **exit 0、0 errors / 既存2 warnings** | [lint-docs-fixed.log](lint-docs-fixed.log)、[helper-fix-audit.json](helper-fix-audit.json) |
| diff --check | 今回docs差分はexit 0。main→固定候補・main→docsはexit 2 | 既存v1.1 build/lint/testsログの末尾空白等6件。[diff-check.json](diff-check.json)。過去ログは修正していない |
| 8問・8結果・全variation | 過去48セッション＝JA/EN×8type×3variation。各言語32問・128択表示 | 原稿hash・結果fixtureを照合。修正QA helperの実行結果も別ファイル保存 |
| 画像・顔・GOOD/BAD・motto | 過去48結果で原稿一致、3表情、3motto、各visualKey。24顔のキャプチャ目視 | 親もGitHub取得画像を独立目視。顔は前側クラスト上、クリッピングなし |
| Share / Try Again / Back | 過去16回の実clipboard共有、両言語retry・戻る・再回答 | ネイティブOS共有sheetや外部投稿の検証ではない |
| 言語切替 | 今回10回、Home・途中・結果から両方向 | 目的のlocale/pathと表示変更を確認。結果から切替時は新しい診断を開始する既存動作 |
| 320px長文折返し | 今回8セッション、各言語32問・全128択。横overflow 0、pageerror 0 | [missing-qa.json](missing-qa.json)。縦スクロールで読める。日本語ヘッダーは1文字ずつ折返す表示上の注意点あり |
| 既存5診断回帰 | 各JA/ENの計10routeを8問完走、pageerror/overflow 0 | 過去証拠に加え、修正helperで今回も10routeを完走 |
| Preview | API READY、Git branch / SHA一致、target null | **実Previewのブラウザ完走は未確認**。過去のtunnel失敗経路を今回再試行しない |
| iPhone / Safari | v1.1のJA1完走は本人申告あり。今回の固定版・EN・全結果の承認ではない | 実機Safari・native shareは未確認 |

修正版helperも今回48セッション（JA/EN×8type×3variation）、全32問/128択表示、16clipboard、両言語Back/再回答、既存10route完走を新規実行し、assertion failure 0 / pageerror 0 / horizontal overflow 0。全てmobile touchで操作し、resume機能は使っていない。[新規実行JSON](esm-qa/report.json) と [実行ログ](esm-qa/run.log) を保存した。Playwrightは環境既存パッケージを一時ディレクトリから参照し、repo依存を変更していない。実行したscript copyとcommit済みscriptのSHA256一致を確認。

画面キャプチャは機械PASSと別に確認した。新規実行のEN fullPage captureには背景/原画像等の描画欠けがあり、追加fullPage captureでも欠けを観測した。一方、同じbuild・同じ結果をスクロールした実viewport captureでは画像/顔/カード/文面が表示された。原因は未特定で、fullPage画像を正常画面の証拠として扱わない。[描画再確認記録](esm-qa/visual-followup.json) を参照。アプリ変更や画像加工による修復は行っていない。

既存5診断の `src/data/quizzes/<id>/` と各routeはmainと固定SHAの50ファイルをbyte照合し不一致0。共通engineのregistry以外12ファイル、Scaffold関連CLI5ファイルも不変。registryへのPizza追加をengine仕様変更と混同しない。さらにdocs修正版では、固定SHAのdocs外221ファイル全てをbyte照合し差分0、新規docs外ファイル0。詳細は [evidence-audit.json](evidence-audit.json) と [helper-fix-audit.json](helper-fix-audit.json)。

| 既存診断 | JA 8問→結果 | EN 8問→結果 |
|---|---|---|
| camp-gear | 過去証拠＋今回完走 | 過去証拠＋今回完走 |
| spaghetti | 過去証拠＋今回完走 | 過去証拠＋今回完走 |
| sushi | 過去証拠＋今回完走 | 過去証拠＋今回完走 |
| ice-cream | 過去証拠＋今回完走 | 過去証拠＋今回完走 |
| donut | 過去証拠＋今回完走 | 過去証拠＋今回完走 |

## lint訂正の理由

固定版の `docs/pizza-type/verification-v1.2/browser-check.cjs` 先頭行の3つの `require()` が `@typescript-eslint/no-require-imports` に違反している。`eslint.config.mjs` はdocsも検査する。既存 `OUTLINE` / `STROKE` の未使用warning2件とは別問題。

`0d08862` に保存された成功ログは、その補助スクリプトが含まれる前のもの。最終 `61e0f56` / `4dfcbe0` の保存ログと今回の再実行は3 errorsを示すため、「初期失敗を後で直した」という説明は成立しない。修正版の成功を固定SHAへ遡及して適用しない。

保存直前にmain全体との差分も検査したところ、固定版に元からあるv1.1 `build.log` の末尾空白3箇所・EOF空行1件、`lint.log` / `tests.log` のEOF空行各1件を検出した。今回docs差分には同種問題はない。以前のfeature基準の差分確認をmain全体のPASSへ拡張しない。既存ログの整形は今回行っていない。

## 保存と引継ぎ

- [公開手順・公開後確認・戻し先](RELEASE.md)
- [制作の振り返りと次の第7弾1本の標準手順](FACTORY-SEVENTH-QUIZ.md)
- [独立レビュー](independent-review.json)：保存ログ/画像の再レビューと、新規実行を明確に区別
- [追加QA再現記録](QA-REPRODUCTION.md)、[local build入力照合](build-source-proof.json)
- [デプロイ読取記録](deployment-readback.json)、[固定版証拠hash一覧](evidence-audit.json)

TSURUHASHIの呼出可能な保存経路がないため、承認済みのGit docsフォールバックを使った。接続・認証・Secret・別repoの探索や変更はしていない。今回M/W依頼、新しい診断、Scaffold改造、自動化基盤追加は行っていない。Production承認待ちSTOP。
