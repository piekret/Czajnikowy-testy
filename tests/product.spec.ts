import { test, expect } from '../utils/fixtures';
import { ProductPage } from '../pages/ProductPage';

test.describe('Karta Produktu', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
  });

  test('TC-CZA-004: Karta produktu: komplet informacji', async ({ page }) => {
    const searchPage = new (require('../pages/SearchPage').SearchPage)(page);
    await searchPage.goto('/');
    await searchPage.searchFor('herbata czarna');
    await searchPage.productItems.first().click();
    await page.waitForLoadState('domcontentloaded');

    await expect(productPage.productTitle).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.productDescription).toBeVisible();

    await expect(productPage.inStockLabel).toBeVisible();

    await expect(productPage.quantityInput).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('TC-CZA-005: Karta produktu "Brak w magazynie" i "Powiadom o dostępności"', async ({ page }) => {
    await productPage.goToProduct('herbata-czarna-caykur-tirebolu-cayi-turecka-200g');
    await expect(productPage.outOfStockLabel).toBeVisible();

    await expect(productPage.addToCartButton).not.toBeVisible();
    await expect(productPage.notifyMeButton).toBeVisible();

    await productPage.openNotifyMePopup();

    await expect(productPage.notifyMeEmailInput).toBeVisible();
    await expect(productPage.notifyMeSubmitButton).toBeVisible();
  });
});
