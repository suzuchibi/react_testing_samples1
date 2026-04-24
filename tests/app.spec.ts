import { test, expect } from '@playwright/test'

test('ルートページのタイトルの確認', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page).toHaveTitle(/React Samples/)
  await expect(
    page.getByRole('heading', { name: 'Vite + React' }),
  ).toBeVisible()
})

test('ルートページのボタン動作確認', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // 初期状態はカウンターは0
  await expect(page.getByText('Count: 0')).toBeVisible()
  await page.getByRole('button', { name: 'Increment' }).click()
  // Incrementボタンをクリックした後、カウンターは1になる
  await expect(page.getByText('Count: 1')).toBeVisible()

  // リロードした後、カウンターは0に戻る
  await page.reload()
  await expect(page.getByText('Count: 0')).toBeVisible()
})

test('ルートページの画像デッドリンクがないこと（自ドメインのみ）', async ({
  page,
}) => {
  const failedImages = [] as any[]
  const baseURL = 'http://localhost:5173'

  page.on('response', (response) => {
    const url = response.url()
    const status = response.status()

    const parsed = new URL(url)

    // 自ドメインのみ対象
    if (
      parsed.origin === baseURL &&
      url.match(/\.(png|jpg|jpeg|webp|gif|svg)$/) &&
      status >= 400
    ) {
      failedImages.push({ url, status })
    }
  })

  await page.goto(baseURL)
  // ページ読み込み完了を待つ
  await page.waitForLoadState('networkidle')
  expect(failedImages).toEqual([])
})

test('ルートページのaタグのデッドリンクがないこと（自ドメインのみ）', async ({
  page,
  request,
}) => {
  const baseURL = 'http://localhost:5173'
  await page.goto(baseURL)

  // aタグのhrefを全部取得
  const links = await page.$$eval('a', (anchors) =>
    anchors
      .map((a) => a.href)
      .filter(
        (href) =>
          href && !href.startsWith('mailto:') && !href.startsWith('tel:'),
      ),
  )

  const failedLinks = []

  for (const url of links) {
    const parsed = new URL(url)
    // 自ドメインだけチェック
    if (parsed.origin !== baseURL) continue
    const response = await request.get(url)
    if (response.status() >= 400) {
      failedLinks.push({ url, status: response.status() })
    }
  }

  expect(failedLinks).toEqual([])
})

test('ルートページのリンク動作確認', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByRole('link', { name: 'React Hook Form' }).click()
  await expect(
    page.getByRole('heading', { name: 'React Hook Form' }),
  ).toBeVisible()
})
