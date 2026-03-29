import { test as base, expect, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

// Aktywujemy wtyczkę usuwającą ślady "bota" (np. navigator.webdriver)
chromium.use(stealth());

type MyFixtures = {
  page: Page;
};

// Rozszerzamy podstawowy mechanizm testowy Playwrighta, wymuszając
// by domyślna zmienna `page` wewnątrz { page } korzystała z "Chrome Stealth"
export const test = base.extend<MyFixtures>({
  page: async ({}, use) => {
    // Ignorujemy domyślnego chromium na rzecz naszego uzbrojonego w stealth
    const browser = await chromium.launch({ 
      headless: false,
    });
    
    const context = await browser.newContext({
      baseURL: 'https://www.czajnikowy.com.pl',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    });

    const stealthPage = await context.newPage();
    
    // Przekazujemy podrasowany obiekt page do właściwych testów
    await use(stealthPage);
    
    await stealthPage.close();
    await context.close();
    await browser.close();
  }
});

// Eksportujemy natywne asercje, aby import 'expect' nadal działał wszędzie prawidłowo
export { expect };
