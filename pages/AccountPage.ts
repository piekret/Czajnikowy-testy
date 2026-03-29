import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;

  readonly registerUsernameInput: Locator;
  readonly registerEmailInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly registerButton: Locator;

  readonly lostPasswordLink: Locator;
  readonly resetPasswordEmailInput: Locator;
  readonly resetPasswordButton: Locator;

  readonly logoutLink: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    super(page);

    this.loginEmailInput = page.getByRole('textbox', { name: 'Nazwa użytkownika lub adres e' });
    this.loginPasswordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Zaloguj się' });
    this.rememberMeCheckbox = page.getByText('Zapamiętaj mnie');

    this.registerUsernameInput = page.getByRole('textbox', { name: 'Nazwa użytkownika Wymagane' });
    this.registerEmailInput = page.getByRole('textbox', { name: 'Adres e-mail Wymagane', exact: true });
    this.registerPasswordInput = page.locator('#reg_password');
    this.registerButton = page.getByRole('button', { name: 'Zarejestruj się' });

    this.lostPasswordLink = page.getByRole('link', { name: 'Nie pamiętasz hasła?' });
    this.resetPasswordEmailInput = page.getByRole('textbox', { name: 'Nazwa użytkownika lub adres e' });
    this.resetPasswordButton = page.getByRole('button', { name: 'ZResetuj hasło' });

    this.logoutLink = page.getByRole('link', { name: 'Wyloguj się' });
    this.errorMessages = page.locator('.woocommerce-error');
  }

  async goToAccount() {
    await this.goto('/moje-konto');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email: string, pass: string, remember: boolean = false) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    if (remember) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async register(username: string, email: string, pass: string) {
    if (this.registerUsernameInput) {
      await this.registerUsernameInput.fill(username);
    }
    await this.registerEmailInput.fill(email);
    await this.registerPasswordInput.fill(pass);
    await this.registerButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async logout() {
    await this.logoutLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
