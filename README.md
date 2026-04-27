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

## ビジュアル・イグニッションテスト
画像回帰テスト。ChromaticとLokiを比べる。

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

## 参考
[React + Storybook + Chromatic + GitHub Actions でUIの見た目を守る！CI付き導入ガイド](https://zenn.dev/kogepan159/articles/899b155519246b)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
