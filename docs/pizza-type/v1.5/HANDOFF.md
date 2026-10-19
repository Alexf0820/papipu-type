# Pizza Type Ver.1.5 — Production承認待ち

2026-10-19。**総合状態はPARTIAL。技術修正・local QA・Git保存は完了し、Vercel PreviewはREADY。実Previewのブラウザ操作は接続トンネル失敗により未確認。** main/Productionは変更していない。

## 固定した公開候補

| 対象 | 値 |
|---|---|
| Repository | `Alexf0820/papipu-type`（ID 1328708469） |
| 公開候補branch | `feat/pizza-type` |
| 候補SHA | `0a2d19831ca190f7ad7b8dad39957799bf134e37` |
| 元の固定SHA | `4dfcbe0a5c4c554e6dcd2095236bc277e4252c53` |
| QA docs branch | `docs/pizza-v1.5-preview-qa`。docsのSHAは公開候補と分けて最終報告する |
| Git Preview | `dpl_k6YYLh9kxi5bWS8yVnQN5B9PbTLS`、READY、source git、target null |
| 変更していないmain | `6252305bceaeb1a823b91b8e58ee6f6707c9b6d7` |

本人確認用の固定Preview：

- [JA Home](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/ja) / [EN Home](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/en)
- [JA Pizza](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/ja/pizza) / [EN Pizza](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/en/pizza)

Deploymentの完全SHA・branchを候補と照合済み。[deployment.json](verification/deployment.json) を参照。branch aliasは将来のpushで移動するため固定URLを優先する。QA docsの自動Previewは候補の置換ではない。LAN URLは本人確認用に提示しない。

## 技術修正と検証結果

開始時に全8 remote headsを一覧し、feature/docs/mainを明示fetchした。featureは旧固定SHA、QA docsは `4bc2324bae19b3a1c539ec416054cde9059a2028` と一致。Ver.1.4の追加成果・新commit・未保存作業はなかった。既存の検証済みhelper修正を再利用した。

| 項目 | 旧固定SHA | 新候補SHAの実行結果 |
|---|---|---|
| lint | **FAIL：3 errors** | **PASS：0 errors、既存OUTLINE/STROKE warnings 2件** |
| mainからのdiff check | **FAIL：6件** | **PASS：0件** |
| 作業差分のdiff check | 過去結果と区別 | PASS |
| npm test | 旧証拠は保持 | **20 files / 109 tests pass** |
| test:scaffold | 旧証拠は保持 | **6 pass / 0 fail** |
| next typegen | 旧証拠は保持 | exit 0、生成成功 |
| tsc --noEmit | 旧証拠は保持 | exit 0 |
| validate-quiz -- pizza | 旧証拠は保持 | Validation passed |
| npm run build | 旧証拠は保持 | exit 0、TypeScript成功、JA/EN Pizzaと既存route生成 |

検証9コマンドを順次実行し、候補SHA、command、開始/終了時刻、exit、raw/saved log hashを [commands.json](verification/commands.json) に記録。テスト/timeoutの変更なし。記録保存では機械上のディレクトリ名を置換し、末尾空白/EOF空行を整形した。数値・警告・出力結果は保持している。

QA helperは検証済み `e355ad4` をcherry-pickした `2620bb0`。`.cjs`→`.mjs` と3つの標準importへの置換だけで、残りのscript内容は同一。lintルール無効化・ignore追加・依存変更はない。呼出元の検索では実行用設定の旧名参照はなく、旧失敗ログや変更説明の `.cjs` は歴史的参照として保持する。

v1.1 `build.log` / `lint.log` / `tests.log` は末尾空白とEOF空行のみ変更した。実行結果、数値、失敗履歴、時刻、内部行は保存。[前後の完全diffとhash](log-whitespace-audit.json)、[6件→0件の再照合](verification/diff-check-audit.json)を参照。旧v1.2 summaryのlint成功記載は旧固定SHAに対して誤りであり、新候補の成功で過去のFAILを書き換えない。

## 保全と百万回検証の再利用

docs外のtracked 221ファイルを旧固定SHAとbyte照合し、差分0。Pizza handoff全文SHA256は `4e1f773e746e03e6b4f2b75e1926214f0510b1f2e0aa6b764a0aa09c0148e8f8` で一致。32 Questions / 128 Choices、JA/EN Result全文、8types/traits、採点/配置、visualKey/faceTransform、Home design、共通engineは不変。画像8枚はmanifestのSHA256と一致し、全て元のPNG 1254×1254。既存5診断のデータ/route 50ファイルもmainと一致。

採点・抽選・配置・engine・原稿の入力が同一なので、既存の百万回＋8ケース各50万回を再利用した。再実行とは記録しない。

- 100万run：12.4388–12.5508%、max–min **0.112pp**。
- 位置感度の差：**0.111–0.204pp**。質問±5ppの表示flag 0。
- JA/EN parity：**10,000/10,000**。
- 各typeのMain / Secondary：各16、各役割のA/B/C/D：4/4/4/4。
- **統計総合判定は未判定**。正式な合格閾値がなく、exit 0や±5pp表示を独自の合格基準にしない。

根拠は [invariants.json](verification/invariants.json) と既存 `verification-v1.2/statistics.json` / `million.log`。

## 実画面QAの範囲

全て新候補で作成したlocal本番形式buildをsystem Chromium 151で操作。公開済みESM helperと同一byteの一時コピーを使い、既存Playwrightを参照した。repo依存・ブラウザの再ダウンロードなし。remote Previewや実機Safariの成功には読み替えない。

| 確認 | 新規実行の証拠 |
|---|---|
| JA/EN Home→Pizza | 両言語の実カードtapで対象routeへ遷移し質問表示。[Home記録](verification/home-navigation/report.json) |
| 8問→8types×a/b/c | JA/EN計48完走。各言語32問/128択、全結果本文/GOOD/BAD/motto/画像hrefを照合。[全結果QA](verification/local-browser/report.json) |
| 画像・顔 | 8画像smile captureを目視確認、前側クラスト上に表示。全48結果の3表情boundsでクリッピングなし。原画像加工なし |
| Share / Retry / Back | 実clipboard共有16回、両言語の再診断・戻る・再回答を確認。外部投稿なし、native OS share sheetは未確認 |
| 既存5診断 | camp-gear / spaghetti / sushi / ice-cream / donutのJA/EN計10routeを各8問完走 |
| 390px画面 | pageerror 0 / horizontal overflow 0 |
| 320px長文・言語切替 | 8セッション、JA/EN各32問/128択表示、切替10回。pageerror/overflow 0。[記録](verification/mobile-language/report.json) |
| 結果の視覚確認 | JA結果、ENの上/中/下viewportを目視。画像・顔・カード・GOOD/BAD・motto・ボタンを確認。[EN記録](verification/viewport-visual/report.json) |

fixtureはRetry前の質問抽選と表情/motto用乱数を制御し、実際の8回答tapから既存engineで結果を計算する。結果データを直接注入していない。初回の通常抽選セッションも実行した。

既知のEN fullPage captureの描画欠けは、その画像を正常画面の証拠とせず、viewport captureで補完した。320pxでは共通ヘッダーの「日本語」が縦に折り返すがクリッピングはなく、デザインは変更していない。結果から言語を切り替えると新しい診断を開始する既存動作も記録した。

## 未確認・STOPと本人判断

新しい固定Previewへ一度ブラウザ接続したが、最初の `/ja` のload前に `ERR_TUNNEL_CONNECTION_FAILED`。完了画面0、完了セッション0であり、空のerror/overflow配列はPASSではない。[失敗記録](verification/preview-browser-blocked.json)。同経路の再試行、proxy回避、認証用共有リンク作成、Secret/認証変更はしていない。API READYとブラウザ検証を分けた。

本人には上の固定JA/EN PreviewをiPhone/Safariで確認してもらう。Home、8問→結果、画像/顔、GOOD/BAD、motto、共有、Try Again、言語切替・長文を確認する。native shareも未確認。**実Preview確認と明示的なProduction承認までSTOP。今回の依頼は公開承認ではない。**

mainは `6252305b…`、Productionも `dpl_2LvUCjnhfx39qhMXw46frLKbEzRG` / 同SHA / READY / target productionのまま読み取り確認した。通常のGit Preview以外のdeployment作成、main merge、Production promotion、DNS/Secret/認証変更、追加費用、破壊的Git操作は行っていない。公開直前にはmain/Productionの現在値を再確認し、本人承認した対象SHAだけを通常のレビュー経路で扱う。

## 第7弾への引継ぎ

対象は次の診断1本。既存の [第7弾準備手順](https://github.com/Alexf0820/papipu-type/blob/4bc2324bae19b3a1c539ec416054cde9059a2028/docs/pizza-type/v1.3/FACTORY-SEVENTH-QUIZ.md) を保全して引き継ぐ。今回の実Previewブラウザ確認が未完のため、余力条件付きの制作手順追加更新は進めていない。テーマ決定・原稿制作・画像生成・Scaffold改造・新基盤・M/W依頼はなし。

この夜間作業内で本人へ追加確認や人間中継を依頼した回数は0。制作全体の本人介入回数・コピペ回数・総制作時間・手戻り総数は未計測のまま。ログの所要時間を制作時間へ置き換えない。
