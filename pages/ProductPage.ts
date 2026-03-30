import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly inStockLabel: Locator;
  readonly outOfStockLabel: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly notifyMeButton: Locator;
  readonly notifyMeEmailInput: Locator;
  readonly notifyMeSubmitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = page.locator('h1.product_title');
    this.productPrice = page.locator('.woocommerce-Price-amount').nth(2);
    this.productDescription = page.locator('.woocommerce-product-details__short-description, #tab-description');
    this.inStockLabel = page.locator('.stock.in-stock');
    this.outOfStockLabel = page.locator('.stock.out-of-stock');
    this.quantityInput = page.locator('input.qty, input[name="quantity"]');
    this.addToCartButton = page.locator('.single_add_to_cart_button');

    this.notifyMeButton = page.locator('.xoo-wl-action-btn').first();
    this.notifyMeEmailInput = page.locator('input[type="email"].xoo-aff-email');
    this.notifyMeSubmitButton = page.locator('.xoo-wl-submit-btn');
  }

  async goToProduct(productSlug: string) {
    await this.goto(`/produkt/${productSlug}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addToCart(quantity: string = '1') {
    if (quantity !== '1') {
      await this.quantityInput.fill(quantity);
    }
    await this.addToCartButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openNotifyMePopup() {
    await this.notifyMeButton.click();
  }
}
