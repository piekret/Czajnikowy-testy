import { test, expect } from '../utils/fixtures';
import { HomePage } from '../pages/HomePage';

test.describe('Elementy Globalne (TC-CZA-001)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.getToHomePage();
  });

  test('TC-CZA-001: Spójność elementów globalnych (wyszukiwarka, logowanie, koszyk)', async ({ page }) => {
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.loginRegisterLink).toBeVisible();
    await expect(homePage.cartIcon).toBeVisible();
    await homePage.goToLogin();

    const loginForm = page.locator('#customer_login');
    await expect(loginForm).toBeVisible();
    await homePage.getToHomePage();
    await homePage.openCart();

    await expect(homePage.emptyCartMessage).toBeVisible();
  });
});
