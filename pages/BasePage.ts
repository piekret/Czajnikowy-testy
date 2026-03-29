import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly loginRegisterLink: Locator;
  readonly cartIcon: Locator;
  readonly miniCartSection: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('input[name="s"], input[type="search"]').first();
    this.searchButton = page.locator('button[type="submit"][aria-label="Szukaj"], .search-form button');

    this.loginRegisterLink = page.getByRole('button', { name: 'Logowanie / Zarejestruj się' }).first();

    this.cartIcon = page.getByRole('button', { name: 'Zobacz koszyk' });
    this.miniCartSection = page.locator('.mini-cart-content, .widget_shopping_cart_content').first();
    this.emptyCartMessage = page.getByText('Twój koszyk aktualnie jest pusty');
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async goToLogin() {
    await this.loginRegisterLink.click();
  }
}
