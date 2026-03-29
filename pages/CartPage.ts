import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly tableItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly returnToShopButton: Locator;
  readonly quantityInput: Locator;
  readonly updateCartButton: Locator;
  readonly removeProductButton: Locator;
  readonly cartTotal: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.tableItems = page.locator('.cart_item, tbody tr.woocommerce-cart-form__cart-item');
    this.emptyCartMessage = page.getByText('Twój koszyk aktualnie jest pusty');
    this.returnToShopButton = page.getByRole('link', { name: 'Wróć do sklepu' });
    this.quantityInput = page.locator('input.qty');
    this.updateCartButton = page.locator('button[name="update_cart"]');
    this.removeProductButton = page.locator('a.remove');
    this.cartTotal = page.locator('input[type="number"][aria-label="Ilość produktu"]');
    this.proceedToCheckoutButton = page.locator('.checkout-button');
  }

  async goToCart() {
    await this.goto('/koszyk');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async updateQuantity(index: number, quantity: string) {
    await this.quantityInput.nth(index).fill(quantity);
    await this.updateCartButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async removeItem(index: number) {
    await this.removeProductButton.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
