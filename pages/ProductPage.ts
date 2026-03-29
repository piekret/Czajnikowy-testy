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
    
    // Typowe selektory WooCommerce
    this.productTitle = page.locator('h1.product_title');
    this.productPrice = page.locator('.summary .price');
    this.productDescription = page.locator('.woocommerce-product-details__short-description, #tab-description');
    this.inStockLabel = page.locator('.stock.in-stock');
    this.outOfStockLabel = page.locator('.stock.out-of-stock');
    this.quantityInput = page.locator('input.qty, input[name="quantity"]');
    this.addToCartButton = page.locator('.single_add_to_cart_button');
    
    // Elementy wtyczki "Powiadom o dostepności"
    this.notifyMeButton = page.locator('button:has-text("Powiadom"), .cwginstock-subscribe-btn');
    this.notifyMeEmailInput = page.locator('input[type="email"].cwg-email, #user_email');
    this.notifyMeSubmitButton = page.locator('button.cwginstock-subscribe');
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
