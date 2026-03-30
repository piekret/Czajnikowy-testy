import { test, expect } from '../utils/fixtures';
import { HomePage } from '../pages/HomePage';

test.describe('Zgodność urządzeń i wydajność (Mobile & Desktop)', () => {

  test('TC-CZA-015: Zmierzenie podstawowej stabilności na mobile i desktop', async ({ page }) => {
    const urlsToTest = [
      '/',
      '/kategoria-produktu/herbata-czarna',
      '/koszyk',
      '/moje-konto',
    ];

    for (const url of urlsToTest) {
      const startTime = Date.now();

      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
      });

      expect(response).not.toBeNull();
      expect(response?.ok()).toBeTruthy();

      await expect(page.locator('body')).toBeVisible();

      const mainContent = page.locator('main, #main, .site-main, .content, .woocommerce').first();
      await expect(mainContent).toBeVisible();

      const loadTime = Date.now() - startTime;
      console.log(`[RWD/PERF] ${url} załadowana w: ${loadTime}ms.`);

      const textContent = await page.locator('body').textContent();
      expect(textContent?.trim().length).toBeGreaterThan(0);
    }

    const home = new HomePage(page);
    await home.getToHomePage();
  });
});
