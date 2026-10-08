import { wcagAxe } from './helpers/accessibility';
import { expect, test, type Page } from '@playwright/test';

type Timeline = {
  duration: () => number;
  time: (value?: number, suppressEvents?: boolean) => number;
};
type ProductScene = HTMLElement & { scene: string; animated: boolean; _timeline?: Timeline };

async function ready(page: Page, width = 1440, height = 900) {
  await page.setViewportSize({ width, height });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-site-ready', 'true');
}

async function storageTheme(page: Page, mode: 'light' | 'dark') {
  await page.evaluate((value) => {
    localStorage.setItem('apcosys-theme-mode', value);
    window.dispatchEvent(
      new StorageEvent('storage', { key: 'apcosys-theme-mode', newValue: value }),
    );
  }, mode);
  await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
}

for (const width of [390, 1366, 1440, 1600, 1920]) {
  test(`body typography and wrapping stay identical between themes at ${width}px`, async ({
    page,
  }) => {
    await ready(page, width);
    await page.evaluate(() => document.fonts.ready);
    const paragraphs = page.locator(
      '.steps-intro p, .step-copy p, .audience-copy > p, .data-copy > p, .api-copy > p',
    );
    const measure = () =>
      paragraphs.evaluateAll((nodes) =>
        nodes.map((node) => {
          const style = getComputedStyle(node);
          const box = node.getBoundingClientRect();
          return {
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            width: box.width,
            height: box.height,
          };
        }),
      );
    await storageTheme(page, 'light');
    const light = await measure();
    expect(light.length).toBe(10);
    await storageTheme(page, 'dark');
    expect(await measure()).toEqual(light);
    await storageTheme(page, 'light');
    expect(await measure()).toEqual(light);
    if (width >= 1200) {
      const bodySize = Math.min(20, 18 + Math.max(0, width - 1600) * 0.005);
      // Engines quantize CSS lengths differently; the theme-to-theme geometry above is exact.
      const actualSize = await page
        .locator('.audience-copy > p')
        .first()
        .evaluate((node) => parseFloat(getComputedStyle(node).fontSize));
      expect(actualSize).toBeCloseTo(bodySize, 1);
    }
  });
}

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`Appearance supports keyboard opening, navigation, selection and leaving (${reducedMotion})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await ready(page);
    const trigger = page.getByRole('button', { name: 'Appearance', exact: true });
    const system = page.getByRole('menuitemradio', { name: 'System', exact: true });
    const light = page.getByRole('menuitemradio', { name: 'Light', exact: true });
    const dark = page.getByRole('menuitemradio', { name: 'Dark', exact: true });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(system).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(light).toBeFocused();
    await page.keyboard.press('End');
    await expect(dark).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('Space');
    await expect(system).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(dark).toBeFocused();
    await page.keyboard.press('Home');
    await expect(system).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'EN — Language', exact: true })).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(system).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('.desktop-nav > a[href="#pricing"]')).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
}

test('mobile theme radios select with arrows and have one native Tab stop', async ({ page }) => {
  await ready(page, 390, 844);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const group = page.getByRole('radiogroup', { name: 'Appearance' });
  const system = group.getByRole('radio', { name: 'System', exact: true });
  const light = group.getByRole('radio', { name: 'Light', exact: true });
  const dark = group.getByRole('radio', { name: 'Dark', exact: true });
  await system.focus();
  await page.keyboard.press('ArrowRight');
  await expect(light).toBeChecked();
  await expect(light).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(dark).toBeChecked();
  await expect(page.locator('html')).toHaveAttribute('data-theme-mode', 'dark');
  await page.keyboard.press('Tab');
  // Appearance is the final control in the mobile drawer; Tab wraps to close.
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dark).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(light).toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('apcosys-theme-mode'))).toBe('light');
});

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`drawer releases modality and visible focus on desktop resize (${reducedMotion})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await ready(page, 390, 844);
    await storageTheme(page, 'dark');
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(dialog).toBeVisible();
    await page.setViewportSize({ width: 1199, height: 900 });
    await expect(dialog).toBeVisible();
    await page.setViewportSize({ width: 1200, height: 900 });
    await expect(page.locator('.mobile-navigation')).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await expect(page.locator('.site-header .brand')).toBeFocused();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.mobile-navigation[open]')).toHaveCount(0);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.mobile-navigation[open]')).toHaveCount(0);
  });
}

test('new navigation sessions start at the first group after closing', async ({ page }) => {
  await ready(page, 390, 844);
  const open = page.getByRole('button', { name: 'Open navigation' });
  const dialog = page.locator('.mobile-navigation');
  for (const closeWith of ['escape', 'button']) {
    await open.click();
    await dialog.evaluate((node) => {
      node.scrollTop = node.scrollHeight;
    });
    expect(await dialog.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
    if (closeWith === 'escape') await page.keyboard.press('Escape');
    else await page.getByRole('button', { name: 'Close dialog' }).click();
    await expect(dialog).not.toBeVisible();
    await open.click();
    await expect.poll(() => dialog.evaluate((node) => node.scrollTop)).toBe(0);
    const first = dialog.getByRole('link', { name: 'Search & Investigation', exact: true });
    await expect(first).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  }
});

test('control names match visible language and closing CTA in both themes', async ({ page }) => {
  await ready(page);
  await expect(page.getByRole('button', { name: 'EN — Language', exact: true })).toBeVisible();
  for (const theme of ['light', 'dark'] as const) {
    await storageTheme(page, theme);
    const closing = page.locator('.closing-hotspot');
    await expect(closing).toHaveAccessibleName('Try free search');
    await expect(closing.locator('.double-button__label')).toHaveText('Try free search');
    expect((await closing.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});

test('prices fit their real content area around the 600px breakpoint', async ({ page }) => {
  for (const width of [599, 600, 601, 613, 768]) {
    await ready(page, width, 1000);
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    for (const theme of ['light', 'dark'] as const) {
      await storageTheme(page, theme);
      for (const period of ['monthly', 'annually']) {
        const input = page.locator(`.billing-dock input[value="${period}"]`);
        await input.check({ force: true });
        const spill = await page.locator('.plan-card').evaluateAll((cards) =>
          cards.map((card) => {
            const content = card.getBoundingClientRect();
            const style = getComputedStyle(card);
            const last = card.querySelector('.plan-price')!.lastElementChild!;
            return (
              last.getBoundingClientRect().right - (content.right - parseFloat(style.paddingRight))
            );
          }),
        );
        spill.forEach((value) =>
          expect(value, `${width}px ${theme} ${period}`).toBeLessThanOrEqual(0.5),
        );
      }
    }
  }
});

test('a 320px viewport with reserved scrollbar gutter cannot scroll horizontally', async ({
  page,
}) => {
  await ready(page, 320, 568);
  for (const theme of ['light', 'dark'] as const) {
    await storageTheme(page, theme);
    await page.evaluate(() => window.scrollTo({ left: 1000, top: scrollY, behavior: 'instant' }));
    expect(await page.evaluate(() => scrollX), theme).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
      theme,
    ).toBeLessThanOrEqual(0);
  }
});

test('expanded Appearance, pricing and mobile navigation pass accessibility scans in both themes', async ({
  page,
}, info) => {
  const incomplete: Array<{ state: string; rules: Array<{ id: string; targets: unknown[] }> }> = [];
  const scan = async (state: string) => {
    const result = await wcagAxe(page).analyze();
    incomplete.push({
      state,
      rules: result.incomplete.map((rule) => ({
        id: rule.id,
        targets: rule.nodes.map((node) => node.target),
      })),
    });
    expect(
      result.violations.map((rule) => ({
        id: rule.id,
        targets: rule.nodes.map((node) => node.target),
      })),
      state,
    ).toEqual([]);
  };
  for (const theme of ['light', 'dark'] as const) {
    await ready(page);
    await storageTheme(page, theme);
    await page.getByRole('button', { name: 'Appearance', exact: true }).click();
    await scan(`${theme} appearance`);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'View Plus', exact: true }).click();
    await scan(`${theme} plan`);
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await page.getByRole('button', { name: /View a detailed comparison/ }).click();
    await scan(`${theme} comparison`);
    await page.getByRole('button', { name: 'Close dialog' }).click();
    await ready(page, 390, 844);
    await storageTheme(page, theme);
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await scan(`${theme} navigation`);
  }
  await info.attach('manual-contrast-review', {
    body: JSON.stringify(incomplete, null, 2),
    contentType: 'application/json',
  });
});

test('all five active dark scene timelines preserve their palette in phase samples', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await ready(page);
  await storageTheme(page, 'dark');
  await page.locator('#research-track').scrollIntoViewIfNeeded();
  const next = page.getByRole('button', { name: 'Next research step' });
  await next.click();
  await next.click();
  const hosts = page.locator('apcosys-product-demo');
  await expect(hosts).toHaveCount(5);
  await expect
    .poll(() =>
      hosts.evaluateAll((nodes) => nodes.every((node) => (node as ProductScene)._timeline)),
    )
    .toBe(true);
  const phases = await hosts.evaluateAll((nodes) =>
    nodes.map((node) => {
      const host = node as ProductScene;
      const timeline = host._timeline!;
      const previous = timeline.time();
      const duration = timeline.duration();
      const bright: Array<{ time: number; selector: string; color: string }> = [];
      for (let time = 0; time < duration; time += 0.6) {
        timeline.time(time, false);
        for (const element of host.shadowRoot!.querySelectorAll('*')) {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (
            box.width < 20 ||
            box.height < 16 ||
            style.visibility === 'hidden' ||
            Number(style.opacity) < 0.1
          )
            continue;
          const match = style.backgroundColor.match(/rgba?\(([^)]+)\)/);
          if (!match) continue;
          const [r, g, b, alpha = 1] = (match[1] ?? '')
            .split(/[,\s/]+/)
            .filter(Boolean)
            .map(Number);
          if (r === undefined || g === undefined || b === undefined) continue;
          if (alpha > 0.8 && (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255 > 0.62)
            bright.push({ time, selector: element.className, color: style.backgroundColor });
        }
      }
      timeline.time(previous);
      return { scene: host.scene, animated: host.animated, duration, bright };
    }),
  );
  phases.forEach((phase) => {
    expect(phase.animated, phase.scene).toBe(true);
    expect(phase.duration, phase.scene).toBeGreaterThan(0);
    expect(phase.bright, phase.scene).toEqual([]);
  });
  await info.attach('dark-phase-samples', {
    body: JSON.stringify(phases, null, 2),
    contentType: 'application/json',
  });
});
