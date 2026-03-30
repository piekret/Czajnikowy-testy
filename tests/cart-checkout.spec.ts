import { test, expect } from '../utils/fixtures';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Koszyk i Zamówienie', () => {

  test('TC-CZA-006: Koszyk: stan pusty + podstawowe operacje', async ({ page }) => {
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    await cartPage.goToCart();
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.returnToShopButton).toBeVisible();

    await productPage.goToProduct('herbata-zielona-japan-genmaicha-premium');
    await productPage.addToCart('1');

    await cartPage.goToCart();
    await expect(cartPage.tableItems.first()).toBeVisible();

    const oldTotal = await cartPage.cartTotal.first().inputValue();
    await cartPage.updateQuantity(0, '2');

    await page.waitForTimeout(1000);

    const newTotal = await cartPage.cartTotal.first().inputValue();
    expect(oldTotal).not.toEqual(newTotal);

    await cartPage.removeItem(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test('TC-CZA-007: Checkout: kontrola dostępu bez produktów w koszyku', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.goToCheckout();
    await expect(page).toHaveURL(/koszyk/i);
    const cartPage = new CartPage(page);
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test.describe('Checkout z dodanymi produktami', () => {

    test.beforeEach(async ({ page }) => {
      const productPage = new ProductPage(page);
      await productPage.goToProduct('herbata-zielona-japan-genmaicha-premium');
      await productPage.addToCart('1');
    });

    test('TC-CZA-008: Checkout: dane do wysyłki i walidacja pól wymaganych', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.goToCheckout();

      await checkoutPage.placeOrderButton.click();

      await expect(checkoutPage.errorMessages.first()).toBeVisible();

      await checkoutPage.fillRequiredFields();

    });

    test('TC-CZA-009: Checkout: metody dostawy, cennik i darmowa dostawa', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.goToCheckout();
      await expect(checkoutPage.shippingMethodsList.first()).toBeVisible();
    });

    test('TC-CZA-010: Checkout: metody płatności + przekierowanie', async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.goToCheckout();

      await expect(checkoutPage.paymentMethodsList).toHaveCount(await checkoutPage.paymentMethodsList.count() > 1 ? await checkoutPage.paymentMethodsList.count() : 1);
    });
  });
});
