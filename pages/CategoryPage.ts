import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  readonly resultCountText: Locator;
  readonly sortSelect: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly filterPriceButton: Locator;
  readonly productList: Locator;
  readonly productItems: Locator;

  constructor(page: Page) {
    super(page);

    this.resultCountText = page.locator('.woocommerce-result-count');
    this.sortSelect = page.locator('.orderby, select[name="orderby"]').first();
    this.minPriceInput = page.locator('#min_price');
    this.maxPriceInput = page.locator('#max_price');
    this.filterPriceButton = page.locator('.price_slider_amount button[type="submit"], button:has-text("Filtruj")').first();
    this.productList = page.locator('ul.products, .products-grid');
    this.productItems = page.locator('.shop-container');
  }

  async goToCategory(categorySlug: string) {
    await this.goto(`/kategoria-produktu/${categorySlug}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectSortOption(optionValue: string) {
    await this.sortSelect.selectOption(optionValue);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByPrice(min: string, max: string) {
    if (await this.minPriceInput.isVisible()) {
      await this.minPriceInput.fill(min);
      await this.maxPriceInput.fill(max);
      await this.filterPriceButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}
