# BAL STUDIO Membership Guide

BAL STUDIOの7日間体験を利用した方へ、本入会を案内する専用ランディングページです。

## このLPの目的

体験中に得た気づきを一度きりで終わらせず、BAL STUDIOで継続して学ぶ意義を伝え、本入会の判断を後押しします。申込み導線はBAL STUDIO本入会の1本だけです。

## 対象者

- BAL STUDIOの7日間体験を利用した方
- 体験終了後のステップメールから訪問する方
- 解剖学・評価・運動指導を継続して現場へ定着させたい方

初見ユーザー、無料講義の申込者、別サービスの申込者を対象にしたページではありません。

## 料金・契約条件

- 通常月額：12,800円（税込）
- 7日間体験者限定：月額10,800円（税込）
- 月額制・自動更新
- 月額10,800円（税込）は、会員契約が継続している間適用
- 退会手続きは次回更新日前まで可能
- 決済完了後、視聴権限は当日〜翌営業日中を目安に案内
- 本入会後も体験時のアカウントを継続利用

## 技術構成

- Vite
- HTML / CSS / Vanilla JavaScript
- Node.js 20以上を推奨
- GitHub repository（予定）：`KENTA-KAJI/bal-studio-membership-guide`
- Vercel project（予定）：`bal-studio-membership-guide`
- Production URL（予定）：`https://bal-studio-membership-guide.vercel.app/`

現時点ではGitHubリポジトリ作成、Vercel接続、本番公開は未実施です。

## ローカル起動方法

```bash
git clone https://github.com/KENTA-KAJI/bal-studio-membership-guide.git
cd bal-studio-membership-guide
npm install
```

`.env.example` を `.env.local` としてコピーし、必要な値を設定します。

PowerShellの場合：

```powershell
Copy-Item .env.example .env.local
npm.cmd run dev
```

macOS / Linuxの場合：

```bash
cp .env.example .env.local
npm run dev
```

ローカルURLは通常 `http://localhost:5173/` です。

## ビルド方法

```bash
npm run build
npm run preview
```

WindowsでPowerShellの実行ポリシーにより `npm` が実行できない場合：

```powershell
npm.cmd run build
npm.cmd run preview
```

生成物は `dist/` に出力され、Git管理には含めません。

## 環境変数

| 変数 | 用途 | 公開前の扱い |
|---|---|---|
| `VITE_STRIPE_CHECKOUT_URL` | 全CTA共通の本入会専用Stripe URL | 必須 |
| `VITE_BAL_STUDIO_VIDEO_URL` | BAL STUDIO説明動画のYouTube URL | 正式URL確定後に必須 |
| `VITE_SITE_URL` | Vercelの本番URL | 公開前に必須 |
| `VITE_GA4_MEASUREMENT_ID` | GA4 Measurement ID | 導入決定時のみ |
| `VITE_META_PIXEL_ID` | Meta Pixel ID | 導入決定時のみ |

`.env.local` はGit管理しません。VercelではProject SettingsのEnvironment Variablesへ同じ項目を登録します。

## Stripe URLの変更方法

すべての申込みCTAは `.js-checkout-link` を持ち、`VITE_STRIPE_CHECKOUT_URL` を参照します。

1. ローカルでは `.env.local` の `VITE_STRIPE_CHECKOUT_URL` を変更
2. Vercelでは対象プロジェクトのEnvironment Variablesを変更
3. 再ビルドまたは再デプロイ
4. 全CTAの遷移先が同じURLか確認

現在の本入会専用URLは、ローカルの環境変数に設定されています。HTMLへ複数回直書きしないでください。

## 動画URLの設定方法

`VITE_BAL_STUDIO_VIDEO_URL` に正式なYouTube URLを設定します。未設定時は準備中のプレースホルダーを表示し、設定後はYouTubeのプライバシー強化モードで埋め込みます。

掲載予定動画：

> 【ミナミ解説｜BAL STUDIOとは？】トレーナーの未来を変える新しい学習プラットフォーム

設定後はスマホとPCで、サムネイル、再生、アスペクト比、動画タイトルを確認してください。

## 画像素材の差し替え方法

正式なロゴや画像が確定したら、次の形で管理します。

1. `public/images/` を作成
2. 英数字とハイフンでファイル名を付けて配置
3. `index.html` の対象箇所から `/images/ファイル名` で参照
4. `alt` に画像の内容を記載
5. WebPまたは適切に圧縮した画像を使用
6. 390px・1440px表示でトリミングと文字の可読性を確認

画像やロゴを外部PCだけに置かず、公開利用が確定した素材はリポジトリへ含めます。権利確認前の素材は追加しません。

## GitHub / Vercel移行手順

実行には別途許可が必要です。

1. GitHubに `bal-studio-membership-guide` リポジトリを作成
2. このフォルダをGit管理し、不要ファイルが除外されていることを確認
3. 初回コミットを作成してGitHubへpush
4. VercelでGitHubリポジトリをImport
5. Vercel project名を `bal-studio-membership-guide` に設定
6. Framework PresetがVite、Build Commandが `npm run build`、Output Directoryが `dist` であることを確認
7. Vercelへ必要な環境変数を登録
8. Preview Deploymentでスマホ・PC・CTA・動画・規約リンクを確認
9. 人間の最終確認後にProduction Deploymentへ進む

`.env.local`、秘密情報、未確定素材はGitHubへpushしません。

## 公開前に必ず確定・確認する項目

- BAL STUDIO説明動画の正式YouTube URL
- 正式ロゴ
- 使用画像
- 特定商取引法に基づく表記のページURL
- プライバシーポリシーURL
- GA4設置有無
- Meta Pixel設置有無
- 退会後の具体的な視聴終了タイミング
- OGP画像

## 公開前チェックリスト

### 内容・料金

- [ ] 月額10,800円（税込）が全箇所で一致している
- [ ] 通常月額12,800円（税込）が料金セクションに表示されている
- [ ] 10,800円が会員契約継続中ずっと適用されると明記されている
- [ ] 申込期限の日付を断定していない
- [ ] 退会後の具体的な視聴終了タイミングを断定していない
- [ ] FAQと注意事項が最新の運用条件に一致している

### 導線

- [ ] CTAがすべて同じ本入会専用Stripe URLを参照している
- [ ] 通常価格用のStripeリンクがない
- [ ] 別商品・別サービスへの申込みリンクがない
- [ ] 問い合わせ先が `info@bal-okinawa.jp` になっている

### 素材・法務

- [ ] 正式動画URLが設定されている
- [ ] ロゴと使用画像の権利・表示を確認した
- [ ] OGP画像を設定した
- [ ] 特商法・プライバシーポリシーのリンク先を設定した

### 計測・表示

- [ ] GA4とMeta Pixelの導入方針を決定した
- [ ] 390px幅で文字切れ・横スクロール・CTAの押しにくさがない
- [ ] 1440px幅で本文が広がりすぎず、表示崩れがない
- [ ] 全CTAリンクを実ブラウザで確認した
- [ ] YouTube動画をスマホ・PCで再生確認した
- [ ] `npm run build` が成功する
- [ ] ブラウザコンソールにエラーがない

## 運用上の注意

- LP内容、価格、Stripe URLを変更した場合は、ビルドと全CTA確認を必ず再実施します。
- GA4やMeta Pixelは導入方針確定前に本番IDを設定しません。
- 未確定項目が残っている状態では本番公開しません。
