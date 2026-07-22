import { test, expect } from '@playwright/test';

const cases = [
  { label: 'Getting started', href: '/docs/getting-started', testId: 'nav-getting-started' },
  { label: 'Test structure', href: '/docs/test-structure', testId: 'nav-test-structure' },
  { label: 'Parametrization', href: '/docs/parametrization', testId: 'nav-parametrization' },
  { label: 'Fixtures', href: '/docs/fixtures', testId: 'nav-fixtures' },
  { label: 'Reporting', href: '/docs/reporting', testId: 'nav-reporting' },
];

cases.forEach(({ label, href, testId }) => {
  test(`Check header link ${label} has href ${href}`, async ({ page }) => {
    await page.goto('https://osstep.github.io/locators/parametrization.html');
    await expect(page.getByTestId(testId)).toHaveAttribute('href', href);
    await expect(page.getByTestId(testId)).toHaveText(label);
  });
});
