# React テスト サンプル

| Node |
| --- |
| v22.22.2 |

- Vitest
- Storybook
- Chromatic
- Playwright

## ユニットテスト
Vitestを使用。ユーティリティテスト・カスタムフックテストを行う。

## インタラクションテスト
Storybookを使用

## ビジュアル・リグレッションテスト
画像回帰テスト（VRT）。Chromatic使用。  
Playwright + StorybookでのVRTも検証。

### Chromatic

```sh
npm install --save-dev chromatic
```
```sh
npx chromatic --project-token=*************************
```
▽ `chromatic`のスクリプトを`package.json`に追加するかどうか
```sh
⚠ No 'chromatic' script found in your package.json
Would you like me to add it for you? [y/N]y

ℹ Your project token was added to the script via the --project-token flag.
If you're running Chromatic via continuous integration, we recommend setting
the CHROMATIC_PROJECT_TOKEN environment variable in your CI environment.
You can then remove the --project-token from your package.json script.
```

このままだと、`token`が表示されてしまうので、環境変数に登録する。
```sh
CHROMATIC_PROJECT_TOKEN=project-token
```
### Chromatic （Localで実行）
scriptsで環境変数を参照。  
`--delay=3000` <- フォント読み込み待ちのため追加
```sh
npm install dotenv-cli --save-dev
```
```json
  "scripts": {
    "dev": "vite",
    "chromatic": "dotenv -e .env -- npx chromatic --delay=3000 --project-token=$CHROMATIC_PROJECT_TOKEN"
  }
```

### Chromatic （Githubアクション 推奨）
GitHubにトークンを登録  
Settings → Secrets and variables → Actions → New repository secret

```
.github/workflows/chromatic.yml
```

### npx chromatic がやってること （ざっくり）
1. Storybookをビルド
2. ビルド成果物をChromaticにアップロード
3. 各コンポーネントのスクリーンショットを生成
4. 既存との差分を比較（Visual Regression Test）
5. レビュー用URLを発行


## E2Eテスト
Playwrightを使用。

### First Init
```sh
npm init playwright@latest
```
```sh
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · true
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

Writing playwright.config.ts.
Writing .github/workflows/playwright.yml.
Writing tests/example.spec.ts.
Writing package.json.
```

### Playwright Browsers
```sh
npx playwright install
```
```sh
npx playwright install chromium
```
```sh
npx playwright install firefox
```
```sh
npx playwright install webkit
```

### Playwright Command Examples
```sh
npx playwright test
```
```sh
npx playwright test --project=chromium
```
```sh
npx playwright test --ui --project=chromium
```

### Playwright VRT
初回実行
```sh
npx playwright test --project=chromium --update-snapshots
```
２回目以降
```sh
npx playwright test --project=chromium
```

## 参考
[React + Storybook + Chromatic + GitHub Actions でUIの見た目を守る！CI付き導入ガイド](https://zenn.dev/kogepan159/articles/899b155519246b)
