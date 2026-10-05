import type { Page } from '@playwright/test';

export async function selectLanguage(page: Page, language: 'en' | 'ru') {
  await page.locator('[data-language-selector]').click();
  await page
    .getByRole('menuitemradio', { name: language === 'en' ? 'English' : 'Русский', exact: true })
    .click();
}
