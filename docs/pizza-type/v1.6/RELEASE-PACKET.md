# Pizza Type 夜間 Ver.1.6 — 2026-10-20

**PARTIAL：資料と既存証拠の照合は完了。Hosted QAと現在のserved SHA確認が未完。公開はSTOP、本人の明示承認待ち。**

今夜の変更はこの`docs/pizza-type/v1.6/`配下のQA・引継ぎ資料のみ。コード、本文、採点、画像、共通engine、既存5診断、Scaffold0.2は変更していない。新診断制作・画像生成・main更新・Production操作は行っていない。

## 固定対象と保存先

| 対象 | 固定値 |
|---|---|
| Repository | `Alexf0820/papipu-type` |
| 公開候補branch | `feat/pizza-type` |
| 公開候補SHA | `0a2d19831ca190f7ad7b8dad39957799bf134e37` |
| 今夜読取した実remote main | `6252305bceaeb1a823b91b8e58ee6f6707c9b6d7` |
| 既存QA docs | `docs/pizza-v1.5-preview-qa` / `d301622333f4656c753df8a7383a06e64ab9b482` |
| 今夜の保存branch | `docs/pizza-v1.6-release-packet`（既存QA docsから分岐） |
| 既存固定Preview | `dpl_k6YYLh9kxi5bWS8yVnQN5B9PbTLS` |
| 最後に確認できたProduction / rollback候補 | `dpl_2LvUCjnhfx39qhMXw46frLKbEzRG` / `6252305bceaeb1a823b91b8e58ee6f6707c9b6d7`（2026-10-19証拠） |

- [JA Pizza Preview](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/ja/pizza) / [EN Pizza Preview](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/en/pizza)
- [JA Home](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/ja) / [EN Home](https://papipu-type-o0p5ehldr-alex-fujiokas-projects.vercel.app/en)
- [実main→公開候補の固定比較](https://github.com/Alexf0820/papipu-type/compare/6252305bceaeb1a823b91b8e58ee6f6707c9b6d7...0a2d19831ca190f7ad7b8dad39957799bf134e37)、[保存した差分一覧](candidate-vs-main.txt)。

開始時に全remote headsを確認し、上記feature・main・v1.5 docsに新しいcommitがないことを確認した。元の`/workspace/papipu-type`はcleanな`work`のまま保持し、別worktreeで資料を作った。今夜のdocs SHAはcommit後のGitHub再読取記録・最終報告で特定する。docs自動Previewが作られても公開候補Previewの代わりにはしない。

## Served SHAとHosted QAの正確な状態

2026-10-19の[deployment証拠](../v1.5/verification/deployment.json)では固定Previewのsource=git、branch=`feat/pizza-type`、SHA=`0a2d198…`、state=READY、target=nullが確認されている。

**2026-10-20の再確認は未完。** `GET /v13/deployments/{idOrUrl}`を上記deployment・scope=`alex-fujiokas-projects`・Git情報付きで1回実行し、scope権限不足の403で拒否された。別actor/認証/CLIへの切替、同要求の再試行、共有用認証リンク作成はしていない。[拒否記録](deployment-read.json)。過去のREADY/SHA一致を「今夜再確認済み」とは扱わない。Productionの現時点のdeployment identityも未確認で、こちらからの変更操作は0。

新しい実行環境の既存system Chromium 151、390×844、環境標準proxyで固定JA Previewを1回開いたが、`ERR_TUNNEL_CONNECTION_FAILED`で最初の画面より前に停止した。**Hosted完了画面0、完走0。** ENや他routeへの追加接続・proxy回避・ブラウザ再downloadはしていない。[今回のブラウザ記録](hosted-browser.json)。Safari/native shareは実行していない。

## 既存QAを再利用できる根拠

[照合JSON](evidence-reuse.json)で、候補と今夜のdocs checkoutのdocs外221ファイルが全byte一致。原稿handoff SHA256は`4e1f773e746e03e6b4f2b75e1926214f0510b1f2e0aa6b764a0aa09c0148e8f8`、原画像8枚はmanifestと一致。既存5診断のデータ・route計50ファイルと共通engine本体12ファイルは実mainと一致。registryには既存候補のPizza追加があるがengine計算処理の変更はない。Scaffold関連scriptもmainと同一。

2026-10-19の候補SHAに対する9コマンドの記録・保存log SHA256を検証した。**今夜の再実行結果ではない。**

| チェック | 同一SHAの保存済み結果 |
|---|---|
| lint | 0 errors / 既存OUTLINE・STROKE warnings 2件 |
| tests / Scaffold | 109 tests / 6 tests成功 |
| typegen / TypeScript / validate / build | すべてexit 0 |
| diff check | v1.5で旧空白6件解消。今夜も実main→固定候補はexit 0 |
| 100万run | 12.4388–12.5508%、max–min 0.112pp |
| 感度 / parity | 8条件×50万run、差0.111–0.204pp、JA/EN 10,000/10,000 |
| 統計総合判定 | **未判定：正式な合格閾値なし**。exit 0・表示flagを独自の合格基準にしない |

参照：[コマンドとhash](../v1.5/verification/commands.json)、[採点入力と統計](../v1.5/verification/invariants.json)。既存の失敗履歴を成功で上書きしていない。

| UI項目 | local：2026-10-19、同一候補の既存証拠 | Hosted / 実機 |
|---|---|---|
| Home→Pizza、JA/EN 8問 | 両言語カードtap・通常抽選・完走確認 | 未確認 |
| 8type × a/b/c × JA/EN | 48完走、各言語32問/128択、本文照合 | 未確認 |
| 8画像・顔 | 8smile capture目視、48結果の3表情bounds確認 | 未確認 |
| GOOD / BAD / Motto | 全48結果と原稿を照合 | 未確認 |
| Share | 実Chromium clipboard 16回、文面/URL照合 | Hosted clipboard / Safari / native shareは未確認 |
| Try Again / 前の質問・再回答 | 両言語確認 | 未確認 |
| 言語切替 | Home・途中・結果から計10回。結果からは新診断開始 | 未確認 |
| 320px・長文・横overflow | 8セッション、両言語全32問/128択、overflow 0 | 実機は未確認 |
| 390px・結果画面 | pageerror 0 / overflow 0 | 未確認 |

根拠：[48結果](../v1.5/verification/local-browser/report.json)、[320pxと言語](../v1.5/verification/mobile-language/report.json)、[Home](../v1.5/verification/home-navigation/report.json)、[EN結果viewport](../v1.5/verification/viewport-visual/report.json)。今回JSONの内容とcoverageを再照合し、新たな画面目視検査とは記録していない。320pxの「日本語」縦折返しは既知、欠けなし。EN fullPage captureの描画欠けは正常画面の証拠とせず、上/中/下viewport証拠を使う。

既存5診断の回帰は次の**10routeを各8問完走したlocal証拠**を再利用する。Hosted成功への読み替えはしない。

| 診断 | JA route | EN route | local / Hosted |
|---|---|---|---|
| Camp Gear | `/ja/camp-gear` | `/en/camp-gear` | PASS再利用 / 未確認 |
| Spaghetti | `/ja/spaghetti` | `/en/spaghetti` | PASS再利用 / 未確認 |
| Sushi | `/ja/sushi` | `/en/sushi` | PASS再利用 / 未確認 |
| Ice Cream | `/ja/ice-cream` | `/en/ice-cream` | PASS再利用 / 未確認 |
| Donut | `/ja/donut` | `/en/donut` | PASS再利用 / 未確認 |

## 本人へまとめて渡す判断事項

現時点の公開判断は**承認なし・公開STOP**。依頼文や以前の「公開準備完了／本人Production承認待ち」を公開許可と解釈しない。

通常の許可された接続が使える時に、固定Previewの現在のsource SHAを確認し、Hostedの上表と既存10routeを埋める。iPhone/SafariではJA/ENのHome→8問→結果、8画像の顔、GOOD/BAD/Motto、戻る/再回答、Try Again、言語、長文/横はみ出しとnative shareを確認する。native sheetは開く/キャンセル/コピーの挙動とpayloadを区別し、確認のための外部投稿は要求しない。未実施項目は日付・端末・結果を空欄のまま残す。

確認結果・残件・固定候補SHAを一度に提示して、本人の明示的な公開/保留判断を記録する。今回、追加質問・人間中継・コピペ要求は各0回。制作全体の本人介入総数、コピペ総数、総制作時間、手戻り総数は未計測。

## 将来のProduction手順（未実行）

1. 公開前に実remote main、feature head、現在のProduction ID/SHAを再読取。rollback対象の現在値を保存する。新しい仕事があれば保全し、今夜のmain/SHAで上書きしない。
2. 本人が承認した候補SHA・対象差分・Hosted/Safari残件を確認。専用docs branchは公開元にしない。レビュー済み`feat/pizza-type`を通常のGitレビュー経路でmainへ統合する。force push/resetは使わない。現在のmainとの統合で実内容が変わる場合は影響QAと公開判断を更新する。
3. 通常のGit連携Productionを確認し、source commitが実際の承認済み統合commitと一致すること、state=READY、対象ドメインが正しいことを記録する。DNS、認証、Secret、料金設定を変えない。
4. 公開後に`/ja`・`/en`→Pizza、JA/EN 8問→結果、画像/顔、GOOD/BAD/Motto、Share、Try Again、戻る、言語切替、320pxと横overflowを確認。既存5診断の上記10routeも各8問→結果まで回帰する。Hosted browserと実機Safari/native shareの結果を分ける。
5. 欠落画像、route/採点の異常、既存診断の回帰などがあれば新たな公開操作を止める。本人の復旧指示の下で、直前に保存した既知正常Production deploymentへ通常のrollbackを行い、必要なソース復旧は新しいrevert commitで扱う。履歴を破壊しない。rollback後もJA/EN Pizzaの期待状態と既存10routeを確認する。

今夜のrollback **候補SHAは`6252305bceaeb1a823b91b8e58ee6f6707c9b6d7`**。2026-10-19のProduction証拠に基づく値であり、実公開直前の現在値で再確認する必要がある。ここに手順を書くことは公開・rollback実行の承認ではない。

## 第7診断と引継ぎ

[最小factoryチェックリスト](FACTORY-SEVENTH-CHECKLIST.md)と[lint/diff予防策](PREVENTION.md)は準備済み。第7診断のテーマ・内容・画像・Scaffold生成は開始していない。TSURUHASHIは承認済み通常経路が示されていないため操作せず、許可済みGitHub docsを引継ぎ先にした。新規automation、追加の有料resource、認証情報変更、desktop切替はない。
