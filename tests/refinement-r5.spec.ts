import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { revealHeader, selectLanguage } from './helpers/locale';

const visit = async (page: Page, width = 1440) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('./?lang=en', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
};
const priceAnimations = (page: Page) =>
  page
    .locator('#plan-plus .price-amount')
    .evaluate(
      (node) =>
        node
          .getAnimations({ subtree: true })
          .filter((animation) => animation.playState === 'running').length,
    );

test('language disclosure and Pricing use the existing soft navigation treatment', async ({
  page,
}) => {
  await visit(page);
  const platform = page.getByRole('button', { name: 'Platform', exact: true });
  const language = page.getByRole('button', { name: 'Language', exact: true });
  await platform.click();
  await language.click();
  await expect(platform).toHaveAttribute('aria-expanded', 'false');
  await expect(language).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toBeFocused();
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await expect(page.locator('.language-control select')).toHaveCount(0);
  await expect(page.locator('.language-panel')).toHaveCSS('background-color', 'rgb(241, 242, 244)');
  await expect(page.locator('.language-panel')).toHaveCSS('border-radius', '12px');
  await expect(page.getByRole('menuitemradio', { name: 'English' })).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await page.keyboard.press('Escape');
  await expect(language).toBeFocused();
  await expect(page.locator('.language-panel')).toHaveAttribute('inert', '');
  const pricing = page.locator('.desktop-nav a[href="#pricing"]');
  await pricing.hover();
  await expect(pricing).toHaveCSS('background-color', 'rgb(241, 242, 244)');
  await expect(pricing).toHaveCSS('border-radius', '12px');
  await language.click();
  await pricing.click();
  await revealHeader(page);
  await expect(language).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('language menu keyboard selection, dismissal and mobile bounds', async ({ page }) => {
  for (const width of [320, 390, 768, 1199, 1200, 1440]) {
    await visit(page, width);
    const language = page.locator('[data-language-selector]');
    await language.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitemradio', { name: 'English' })).toBeFocused();
    const bounds = (await page.locator('.language-panel').boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitemradio', { name: 'Русский' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await expect(language).toBeFocused();
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('menuitemradio', { name: 'Русский' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(language).toBeFocused();
    await language.click();
    await page.keyboard.press('Tab');
    await expect(language).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  }
});

// Capture/freeze the application's own opacity timeline in the selection click turn.
const freezeLocaleSelection = (page: Page, locale: 'en' | 'ru') =>
  page.evaluate((locale) => {
    const remember = (event: MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(`.language-panel button[lang="${locale}"]`)
      )
        return;
      Reflect.set(window, 'r6ScrollBefore', scrollY);
      Reflect.set(
        window,
        'r6OriginalLines',
        Array.from(document.querySelectorAll('.locale-text')).map((node) => {
          const range = document.createRange();
          range.selectNodeContents(node);
          return {
            node,
            text: node.textContent,
            lines: Array.from(range.getClientRects()).map((rect) => [
              rect.x,
              rect.y,
              rect.width,
              rect.height,
            ]),
          };
        }),
      );
    };
    const freeze = (event: MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(`.language-panel button[lang="${locale}"]`)
      )
        return;
      document.removeEventListener('click', remember, true);
      document.removeEventListener('click', freeze);
      document
        .getAnimations()
        .filter((animation) => animation.id === 'locale-text-out')
        .forEach((animation) => {
          animation.pause();
          animation.currentTime = 0;
        });
    };
    document.addEventListener('click', remember, true);
    document.addEventListener('click', freeze);
  }, locale);

const sampleLocaleFade = (page: Page, time: number) =>
  page.evaluate((time) => {
    const animations = document
      .getAnimations()
      .filter((animation) => animation.id.startsWith('locale-text-'));
    animations.forEach((animation) => (animation.currentTime = time));
    document
      .getAnimations()
      .filter((animation) => animation.id === 'locale-layout')
      .forEach((animation) => (animation.currentTime = time));
    const originals = Reflect.get(window, 'r6OriginalLines') as {
      node: HTMLElement;
      text: string;
      lines: number[][];
    }[];
    return animations.map((animation) => {
      const effect = animation.effect as KeyframeEffect;
      const node = effect.target as HTMLElement;
      const range = document.createRange();
      range.selectNodeContents(node);
      const style = getComputedStyle(node);
      return {
        phase: animation.id,
        text: node.textContent,
        original: originals
          .filter((original) => original.node === node)
          .map(({ text, lines }) => ({ text, lines }))[0],
        lines: Array.from(range.getClientRects()).map((rect) => [
          rect.x,
          rect.y,
          rect.width,
          rect.height,
        ]),
        opacity: Number(style.opacity),
        transform: style.transform,
        filter: style.filter,
        delay: effect.getTiming().delay,
        opacityOnly: effect
          .getKeyframes()
          .every((frame) => frame.transform === undefined && frame.filter === undefined),
      };
    });
  }, time);

const finishOutgoing = (page: Page) =>
  page.evaluate(async () => {
    const outgoing = document
      .getAnimations()
      .filter((animation) => animation.id === 'locale-text-out');
    if (!outgoing.length) throw new Error('The application has no outgoing language animation');
    const before = document.documentElement.lang;
    // Capture the handoff in its own microtask, before a busy engine can finish the short fade.
    const handoff = new Promise<number>((resolve) => {
      const observer = new MutationObserver(() => {
        if (document.documentElement.lang === before) return;
        const incoming = document
          .getAnimations()
          .filter((animation) => animation.id === 'locale-text-in');
        document
          .getAnimations()
          .filter(
            (animation) => animation.id === 'locale-text-in' || animation.id === 'locale-layout',
          )
          .forEach((animation) => {
            animation.pause();
            animation.currentTime = 0;
          });
        observer.disconnect();
        resolve(incoming.length);
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    });
    outgoing.forEach((animation) => animation.finish());
    return handoff;
  });
const resumeLocale = (page: Page) =>
  page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation.id.startsWith('locale-'))
      .forEach((animation) => animation.play()),
  );

test('locale text dissolves, rapid changes settle, and form state stays mounted', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const search = page.getByRole('searchbox');
  await search.fill('example.com');
  await search.evaluate((node) => {
    node.setAttribute('data-original-input', '');
    (node as HTMLInputElement).blur();
  });
  await freezeLocaleSelection(page, 'ru');
  await selectLanguage(page, 'ru');
  await expect(page.locator('html')).toHaveAttribute('data-locale-transition', 'ru');
  await expect(page.locator('#hero-title')).toContainText('Start with a query.');
  await sampleLocaleFade(page, 70);
  expect(await finishOutgoing(page)).toBeGreaterThan(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  const scroll = await page.evaluate(() => ({
    before: Number(Reflect.get(window, 'r6ScrollBefore')),
    after: scrollY,
  }));
  expect(scroll.after).toBe(scroll.before);
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
  await sampleLocaleFade(page, 150);
  await page.screenshot({ path: info.outputPath('language-transition-midpoint.png') });
  await expect(search).toHaveValue('example.com');
  await expect(search).toHaveAttribute('data-original-input', '');
  // Interrupt the partially visible incoming text and check opacity continuity.
  const opacity = await page
    .locator('#hero-title .locale-text')
    .first()
    .evaluate((node) => Number(getComputedStyle(node).opacity));
  await freezeLocaleSelection(page, 'en');
  await page.locator('[data-language-selector]').dispatchEvent('click');
  await page.getByRole('menuitemradio', { name: 'English', exact: true }).dispatchEvent('click');
  const reversed = await page
    .locator('#hero-title .locale-text')
    .first()
    .evaluate((node) => Number(getComputedStyle(node).opacity));
  expect(reversed).toBeLessThanOrEqual(opacity + 0.03);
  for (const locale of ['ru', 'en'] as const) {
    await page.locator('[data-language-selector]').dispatchEvent('click');
    await page
      .getByRole('menuitemradio', { name: locale === 'en' ? 'English' : 'Русский', exact: true })
      .dispatchEvent('click');
  }
  await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
  await expect(page.locator('#hero-title')).toContainText('Start with a query.');
  await expect(search).toHaveValue('example.com');
  await expect(search).toHaveAttribute('data-original-input', '');
  await expect(page.locator('#hero-title .locale-text').first()).toHaveCSS('opacity', '1');
  // Returning to the displayed language during the outgoing phase must cancel the queued RU commit.
  await freezeLocaleSelection(page, 'ru');
  await selectLanguage(page, 'ru');
  await sampleLocaleFade(page, 70);
  await selectLanguage(page, 'en');
  await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#hero-title')).toContainText('Start with a query.');
});

test('language dissolve stays in place without overlapping EN and RU on phone and desktop', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [390, 1440]) {
    await visit(page, width);
    for (const locale of ['ru', 'en'] as const) {
      const current = locale === 'ru' ? 'en' : 'ru';
      await freezeLocaleSelection(page, locale);
      await selectLanguage(page, locale);
      await expect(page.locator('html')).toHaveAttribute('lang', current);
      await expect(page.locator('html')).toHaveAttribute('data-locale-transition', locale);
      const outgoing = await sampleLocaleFade(page, 70);
      expect(outgoing.length).toBeGreaterThan(0);
      expect(
        outgoing.every(
          (frame) =>
            frame.phase === 'locale-text-out' &&
            frame.opacity > 0 &&
            frame.opacity < 1 &&
            frame.text === frame.original?.text,
        ),
      ).toBe(true);
      expect(outgoing.map((frame) => frame.lines)).toEqual(
        outgoing.map((frame) => frame.original?.lines),
      );
      expect(
        outgoing.every(
          (frame) =>
            frame.opacityOnly &&
            frame.delay === 0 &&
            frame.transform === 'none' &&
            frame.filter === 'none',
        ),
      ).toBe(true);
      await page.screenshot({ path: info.outputPath(`dissolve-${width}-${locale}-out.png`) });
      // Complete the real outgoing animation; the application performs the hidden language handoff.
      expect(await finishOutgoing(page)).toBeGreaterThan(0);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      const hidden = await sampleLocaleFade(page, 0);
      expect(hidden.every((frame) => frame.phase === 'locale-text-in' && frame.opacity === 0)).toBe(
        true,
      );
      const incoming = await sampleLocaleFade(page, 150);
      expect(incoming.length).toBeGreaterThan(0);
      expect(
        incoming.every(
          (frame) =>
            frame.opacity > 0 &&
            frame.opacity < 1 &&
            frame.opacityOnly &&
            frame.transform === 'none' &&
            frame.filter === 'none',
        ),
      ).toBe(true);
      // Container dimensions may morph together; individual words never translate or blur.
      const overlap = await page.evaluate(() => {
        const title = document.querySelector('.hero h1')!.getBoundingClientRect();
        const copy = document.querySelector('.hero .lead')!.getBoundingClientRect();
        return title.bottom > copy.top + 1;
      });
      expect(overlap).toBe(false);
      await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
      await page.screenshot({ path: info.outputPath(`dissolve-${width}-${locale}-in.png`) });
      await resumeLocale(page);
      await expect(page.locator('html')).not.toHaveAttribute('data-locale-transition');
      await expect(page.locator('#hero-title .locale-text').first()).toHaveCSS('opacity', '1');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width + 1,
      );
    }
  }
});

test('prices roll in both directions and rapid billing switches finish on the right digits', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  const grid = page.locator('.plan-grid');
  const height = (await grid.boundingBox())!.height;
  const annual = page.getByRole('radio', { name: 'Annually', exact: true });
  const monthly = page.getByRole('radio', { name: 'Monthly', exact: true });
  const directions = () =>
    page.locator('#plan-plus .price-digit__reel').evaluateAll((nodes) =>
      nodes.flatMap((node) =>
        node.getAnimations().map((animation) => {
          const frames = (animation.effect as KeyframeEffect).getKeyframes();
          return (
            new DOMMatrixReadOnly(String(frames.at(-1)!.transform)).m42 -
            new DOMMatrixReadOnly(String(frames[0].transform)).m42
          );
        }),
      ),
    );
  await annual.check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBeGreaterThan(0);
  expect((await directions()).every((distance) => distance > 0)).toBe(true);
  await page.locator('.price-amount').evaluateAll((nodes) =>
    nodes.forEach((node) =>
      node.getAnimations({ subtree: true }).forEach((animation) => {
        animation.pause();
        animation.currentTime = 280;
      }),
    ),
  );
  await grid.screenshot({ path: info.outputPath('pricing-transition-midpoint.png') });
  await page
    .locator('.price-amount')
    .evaluateAll((nodes) =>
      nodes.forEach((node) =>
        node.getAnimations({ subtree: true }).forEach((animation) => animation.play()),
      ),
    );
  await expect.poll(() => priceAnimations(page)).toBe(0);
  await monthly.check();
  expect((await directions()).every((distance) => distance < 0)).toBe(true);
  await annual.check();
  await monthly.check();
  await annual.check();
  await expect.poll(() => priceAnimations(page)).toBe(0);
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  const final = await page.locator('.price-digit__reel').evaluateAll((nodes) =>
    nodes.map((node) => {
      const height = node.firstElementChild!.getBoundingClientRect().height;
      const index = -new DOMMatrixReadOnly(getComputedStyle(node).transform).m42 / height;
      return {
        visible: Math.round(index) % 10,
        target: Number((node as HTMLElement).dataset.digit),
      };
    }),
  );
  expect(final.every((digit) => digit.visible === digit.target)).toBe(true);
  expect((await grid.boundingBox())!.height).toBeCloseTo(height, 0);
});

test('reduced motion cancels text and price transitions without losing the selected value', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  await selectLanguage(page, 'ru');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
  await expect(page.locator('#hero-title')).toContainText('Начните с запроса.');
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  await page.getByRole('radio', { name: 'За год', exact: true }).check();
  await expect(page.locator('.price-amount')).toHaveText(['$0', '$32', '$192', '$576']);
  expect(await priceAnimations(page)).toBe(0);
  await selectLanguage(page, 'en');
  await expect(page.locator('.locale-text-ghost')).toHaveCount(0);
});

test('marquee keeps moving under the pointer and phone logos are smaller', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visit(page);
  const viewport = page.locator('.trust-viewport');
  const track = page.locator('.trust-track');
  await viewport.scrollIntoViewIfNeeded();
  await viewport.hover();
  await expect(track).toHaveCSS('animation-play-state', 'running');
  const offset = () =>
    track.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41);
  const before = await offset();
  await page.waitForTimeout(300);
  expect(await offset()).toBeLessThan(before - 2);
  await page.setViewportSize({ width: 390, height: 844 });
  await viewport.scrollIntoViewIfNeeded();
  await expect(page.locator('.trust-mark img').first()).toHaveCSS('width', '96px');
  await expect(page.locator('.trust-mark img').first()).toHaveCSS('height', '26px');
  await expect(track).toHaveCSS('animation-play-state', 'running');
});

test('R5 visual evidence and open language menu accessibility', async ({ page }, info) => {
  for (const width of [320, 390, 768, 1200, 1440]) {
    for (const locale of ['en', 'ru'] as const) {
      await visit(page, width);
      if (locale === 'ru') await selectLanguage(page, 'ru');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('[data-language-selector]').click();
      await expect(page.getByRole('menu')).toBeVisible();
      await page.screenshot({ path: info.outputPath(`language-${width}-${locale}.png`) });
      if (width === 390 && locale === 'ru') {
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          result.violations.map((violation) => ({
            id: violation.id,
            targets: violation.nodes.map((node) => node.target),
          })),
        ).toEqual([]);
      }
      await page.keyboard.press('Escape');
      if ([390, 1440].includes(width)) {
        await page.locator('#plan-plus').scrollIntoViewIfNeeded();
        await page
          .locator('.plan-grid')
          .screenshot({ path: info.outputPath(`pricing-${width}-${locale}-monthly.png`) });
        await page
          .getByRole('radio', { name: locale === 'en' ? 'Annually' : 'За год', exact: true })
          .check();
        await page
          .locator('.plan-grid')
          .screenshot({ path: info.outputPath(`pricing-${width}-${locale}-annual.png`) });
      }
    }
  }
});
