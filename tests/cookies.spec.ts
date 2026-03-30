import { test, expect } from '../utils/fixtures';

test.describe('Cookies i Zgody', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-CZA-014: Cookies i zgody: zgodność z polityką i koszykiem', async ({ page }) => {
    await page.goto('/');

    const cookieBanner = page.locator('.cmplz-cookiebanner');
    const rejectBtn = page.locator('.cmplz-btn cmplz-deny').first();

    await expect(cookieBanner).toBeVisible();

    if (await rejectBtn.isVisible()) {
      await rejectBtn.click();
    }

    await page.goto('/produkt/herbata-zielona-japan-genmaicha-premium');
    const addToCart = page.locator('.single_add_to_cart_button');
    if (await addToCart.isVisible()) {
      await addToCart.click();
      await page.waitForLoadState('networkidle');
    }

    await page.goto('/koszyk');
  });

});
