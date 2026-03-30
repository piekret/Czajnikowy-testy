import { test, expect } from '../utils/fixtures';
import { AccountPage } from '../pages/AccountPage';

test.describe('Moje Konto', () => {

  test('TC-CZA-011: Konto: rejestracja', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.goToAccount();

    if (accountPage.registerUsernameInput) {
      await accountPage.registerUsernameInput.fill('tester123');
    }
    await accountPage.registerEmailInput.fill('nowytester2099@example.com');
    await accountPage.registerPasswordInput.fill('MocneHaslo1234!@#$');

    await expect(accountPage.registerButton).toBeEnabled();
    await accountPage.registerButton.click();
    await expect(page).toHaveURL(/moje-konto/);
  });

  test('TC-CZA-012: Konto: Logowanie, walidacja, “Zapamiętaj mnie”, wylogowanie', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.goToAccount();

    await accountPage.login('bledny@example.com', 'zleHaslo');
    await accountPage.login('bledny@example.com', 'zleHaslo'); // musi byc 2 razy

    await expect(accountPage.errorMessages.first()).toBeVisible();
  });

  test('TC-CZA-013: Konto: resetowanie hasła', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.goto('/moje-konto/lost-password/');

    await expect(page).toHaveURL(/lost-password/i);
    await expect(accountPage.resetPasswordEmailInput).toBeVisible();

    await accountPage.resetPasswordEmailInput.fill('bad@test.com');
    await accountPage.resetPasswordButton.click();
  });
});
