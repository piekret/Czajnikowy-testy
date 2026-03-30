import { test, expect } from '../utils/fixtures';
import { CategoryPage } from '../pages/CategoryPage';
import { SearchPage } from '../pages/SearchPage';

test.describe('Funkcjonalność Listingów: Kategorie i Wyszukiwarka', () => {
  test('TC-CZA-002: Funkcjonalność kategorii: sortowanie, filtry cen, liczba wyników', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    const searchPage = new SearchPage(page);

    await searchPage.goto('/');

    await page.waitForTimeout(4000);

    await searchPage.searchFor('herbata czarna');
    await page.waitForTimeout(4000);

    await expect(categoryPage.resultCountText).toBeVisible();
    await expect(categoryPage.sortSelect).toBeVisible();
    const priceFilterVisible = await categoryPage.minPriceInput.isVisible();

    await categoryPage.selectSortOption('price');

    await expect(page).toHaveURL(/orderby=price/);
    await expect(categoryPage.productItems.first()).toBeVisible();

    if (priceFilterVisible) {
      await categoryPage.filterByPrice('10', '50');
      expect(page.url()).toContain('min_price');
      await expect(categoryPage.productItems.first()).toBeVisible();
    }
  });

  test('TC-CZA-003: Wyszukiwanie produktów: trafność, sortowanie, filtr ceny', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.goto('/');
    await page.waitForTimeout(4000);

    await searchPage.searchFor('matcha');
    await page.waitForTimeout(4000);

    await expect(page).toHaveURL(/matcha/i);
    await expect(searchPage.productItems.first()).toBeVisible();

    if (await searchPage.sortSelect.isVisible()) {
      await searchPage.selectSortOption('price-desc');
      await expect(page).toHaveURL(/orderby=price/);
    }
    await searchPage.searchFor('losowenieistniejacafraza123321');

    await expect(searchPage.noResultsMessage).toBeVisible();
    await expect(searchPage.noResultsMessage).toContainText(/nie znaleziono|Brak wyników/i);
  });
});
