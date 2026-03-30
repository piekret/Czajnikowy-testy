import { test as base, expect, Page } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromium.use(stealth());

type MyFixtures = {
  page: Page;
};

export const test = base.extend<MyFixtures>({
  page: async ({ }, use) => {
    const browser = await chromium.launch({
      headless: false,
    });

    const context = await browser.newContext({
      baseURL: 'https://www.czajnikowy.com.pl',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    });

    const stealthPage = await context.newPage();

    await use(stealthPage);

    await stealthPage.close();
    await context.close();
    await browser.close();
  }
});

export { expect };
