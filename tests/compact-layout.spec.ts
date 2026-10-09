import { expect, test } from '@playwright/test';

for (const width of [390, 1440, 1920]) {
  test(`compact home composition at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./');
    const results = page.locator('.search-scene__results');
    const box = await results.boundingBox();
    expect(box!.height).toBeLessThan(width < 600 ? 460 : 300);
    await expect(page.locator('main .eyebrow')).toHaveCount(0);
    await expect(page.locator('.home-searchable .product-evidence')).toHaveCount(0);
    await expect(page.locator('.home-capabilities .product-evidence')).toHaveCount(0);
    await expect(page.locator('.home-searchable .double-button')).toHaveAttribute(
      'href',
      /data-methodology/,
    );
    const cards = page.locator('.home-usecases__grid article');
    await expect(cards).toHaveCount(3);
    if (width >= 768) {
      const boxes = await cards.evaluateAll((es) => es.map((e) => e.getBoundingClientRect().top));
      expect(Math.max(...boxes) - Math.min(...boxes)).toBeLessThan(1);
    }
    const images = page.locator('.home-usecases__grid img');
    await images.first().scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        images.evaluateAll((es: HTMLImageElement[]) =>
          es.every((e) => e.complete && e.naturalWidth > 0),
        ),
      )
      .toBe(true);
    const buttons = page.locator('#plan-business .plan-button');
    await expect(buttons).toHaveCount(2);
    const a = await buttons.first().boundingBox(),
      b = await buttons.last().boundingBox();
    expect(Math.abs(a!.y - b!.y)).toBeLessThan(1);
    expect(b!.x).toBeGreaterThan(a!.x);
    const gap = await page.evaluate(() => {
      const c = document.querySelector('.home-team-cta')!.getBoundingClientRect();
      const next = document.querySelector('.lower-scene')!.getBoundingClientRect();
      return next.top - c.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(63);
  });
}

test('internal pages use distinct compact visual narratives', async ({ page }) => {
  const routes = [
    ['teams', '.team-sequence'],
    ['use-cases/bug-bounty', '.scope-boundary'],
    ['use-cases/vulnerability-research', '.case-fragment--technology'],
    ['use-cases/osint-threat-investigation', '.indicator-trail'],
    ['platform/data-methodology', '.evidence-levels'],
    ['developers/api', '.stage-code-window'],
  ];
  for (const [route, selector] of routes) {
    await page.goto('./' + route);
    await expect(page.locator(selector!)).toBeVisible();
    await expect(page.locator('apcosys-product-demo,api-developer-demo')).toHaveCount(0);
    await expect(page.locator('main .eyebrow')).toHaveCount(0);
  }
});
