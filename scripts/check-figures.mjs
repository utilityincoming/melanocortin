import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const baseURL = process.env.FIGURE_CHECK_URL ?? 'http://localhost:4321';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const pillarRoutes = ['/', '/system', '/pomc', '/receptors', '/receptors/mc2r', '/receptors/mc4r'];
const routes = [
  ...pillarRoutes,
  '/pomc-deficiency', '/setmelanotide', '/mc1r-selectivity', '/selectivity',
];

async function checkLabels(svg) {
  return svg.evaluate((figure) => {
    const bounds = figure.getBoundingClientRect();
    const labels = Array.from(figure.querySelectorAll('text'), (element) => ({
      text: element.textContent,
      rect: element.getBoundingClientRect(),
    }));
    const issues = [];

    for (const [index, { text, rect }] of labels.entries()) {
      if (rect.left < bounds.left || rect.right > bounds.right ||
          rect.top < bounds.top || rect.bottom > bounds.bottom) {
        issues.push(`Clipped label: ${text}`);
      }

      for (const other of labels.slice(index + 1)) {
        const overlapWidth = Math.min(rect.right, other.rect.right) - Math.max(rect.left, other.rect.left);
        const overlapHeight = Math.min(rect.bottom, other.rect.bottom) - Math.max(rect.top, other.rect.top);
        if (overlapWidth > 1 && overlapHeight > 1) {
          issues.push(`Overlapping labels: ${text} / ${other.text}`);
        }
      }
    }

    return issues;
  });
}

async function checkTissueControls(page) {
  const jump = page.getByRole('link', { name: 'Choose a tissue', exact: true });
  await jump.focus();
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#tissue-controls');
  await page.keyboard.press('Tab');

  const first = page.getByRole('group', { name: 'Choose a tissue' }).getByRole('button').first();
  assert.equal(await first.evaluate((button) => button === document.activeElement), true);
  assert.equal(await first.getAttribute('aria-pressed'), 'false');

  const note = page.locator('#tissue-note');
  const before = await note.innerText();
  await page.keyboard.press('Space');
  assert.equal(await first.getAttribute('aria-pressed'), 'true');
  const after = (await note.innerText()).trim();
  assert.ok(after, 'The tissue note should explain the selected tissue');
  assert.notEqual(after, before.trim(), 'The tissue note should change with the selection');
}

try {
  for (const width of [320, 1280]) {
    for (const colorScheme of ['light', 'dark']) {
      const page = await browser.newPage({
        viewport: { width, height: 850 },
        colorScheme,
        reducedMotion: 'reduce',
      });
      for (const route of routes) {
        const context = `${route} at ${width}px (${colorScheme})`;
        const response = await page.goto(new URL(route, baseURL).href);
        assert.ok(response?.ok(), `Could not load ${context}`);
        await page.evaluate(() => document.fonts.ready);
        const figures = await page.locator('svg.schematic:visible').all();
        assert.ok(figures.length, `No schematic on ${context}`);
        for (const svg of figures) {
          assert.deepEqual(await checkLabels(svg), [], context);
        }
        if (pillarRoutes.includes(route)) {
          const heading = await page.locator('h1').boundingBox();
          const visual = await page.locator('.pillar-visual').boundingBox();
          assert.ok(heading && visual, context);
          assert.ok(
            width >= 1024 ? visual.x > heading.x + heading.width : visual.y > heading.y + heading.height,
            `Opening figure should follow the intro in the expected layout: ${context}`,
          );
        }
        if (route === '/receptors/mc4r') {
          assert.equal(figures.length, 2, 'MC4R should show the overview and the full circuit');
          const link = page.getByRole('link', { name: 'See the full appetite circuit' });
          await link.focus();
          await page.keyboard.press('Enter');
          assert.equal(new URL(page.url()).hash, '#appetite-circuit');
        }
        if (route === '/selectivity') {
          const picker = page.getByRole('group', { name: 'Choose a ligand' });
          for (const button of await picker.getByRole('button').all()) {
            await button.click();
            const visible = page.locator('svg.affinity-chart:visible');
            const name = await button.innerText();
            assert.equal(await button.getAttribute('aria-pressed'), 'true', name);
            assert.equal(await visible.count(), 1, name);
            assert.deepEqual(await checkLabels(visible), [], `${context}: ${name}`);
          }
        }
        if (route === '/pomc') await checkTissueControls(page);
        console.log(`OK ${context}`);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
