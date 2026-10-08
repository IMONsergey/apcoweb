import { expect, test } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`keyboard focus pauses the marquee with a quiet visible cue in ${theme}`, async ({
    page,
  }) => {
    await page.addInitScript((mode) => localStorage.setItem('apcosys-theme-mode', mode), theme);
    await page.goto('./');

    const viewport = page.getByRole('region', {
      name: 'Organizations — focus to pause scrolling',
    });
    await viewport.scrollIntoViewIfNeeded();
    await page.keyboard.press('Tab');
    await viewport.focus();
    const style = await viewport.evaluate((element) => {
      const css = getComputedStyle(element);
      return {
        focused: element === document.activeElement,
        insetIndicator: css.boxShadow,
        outline: css.outlineStyle,
      };
    });
    expect(style.focused).toBe(true);
    await expect(page.locator('.trust-track')).toHaveCSS('animation-play-state', 'paused');
    await expect(viewport).toHaveCSS('outline-style', 'none');
    if (await viewport.evaluate((el) => el.matches(':focus-visible'))) {
      expect(style.insetIndicator).not.toBe('none');
    }
  });
}
