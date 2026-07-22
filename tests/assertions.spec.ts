import { test, expect, chromium } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/assertions');
});

test.describe('Header and page basics', () => {
  test('Check header visibility', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Assertions demo stand' }))
      .toHaveText('Assertions demo stand');
    await expect(page.getByRole('heading', { name: 'Assertions demo stand' })).toBeVisible();
  });

  test.fixme('Value assertions vs web-assertion', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Assertions demo');
    await expect(page.getByTestId('status')).toHaveText('Idle');
  });

  test('Check url', async ({ page }) => {
    await expect(page).toHaveURL('https://osstep.github.io/locators/assertions');
  });
});

test.describe('Modal visible/hidden', () => {
  test('Modal visible/hidden', async ({ page }) => {
    test.slow;
    const openButton = page.getByRole('button', { name: 'Open modal' });
    const closeButton = page.getByRole('button', { name: 'Close modal' });
    const modal = page.getByRole('dialog', { name: 'Demo modal' });

    await test.step('Modal is hidden by default', async () => {
      await expect(modal).toBeHidden();
    });
    await test.step('Open modal', async () => {
      await openButton.click();
      await expect(modal).toBeVisible();
    });
    await test.step('Close modal', async () => {
      await closeButton.click();
      await expect(modal).toBeHidden();
    });
  });
});

test.describe('Form interaction', () => {
  test('Auto wait', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'I agree' }).check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('status')).toHaveText('Submitted');
    await expect(page.getByTestId('status')).toContainText('Sub');
  });

  test('Check input required atribute', async ({ page }) => {
    const email = page.getByLabel('email');
    await expect(email).toHaveAttribute('required', '');
    await email.fill('test@test.ru');
    await expect(email).toHaveValue('test@test.ru');
  });

  test('Check button state ', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'I agree' });
    const button = page.getByRole('button', { name: 'Submit' });
    await expect(button).toBeDisabled();
    await checkbox.check();
    await expect(button).toBeEnabled();
  });
});

test.describe('UI state', () => {
  test('Check tab class', { tag: '@smoke' }, async ({ page }) => {
    const homeTab = page.getByRole('tab', { name: 'Home' });
    const profileTab = page.getByRole('tab', { name: 'Profile' });

    await expect(homeTab).toHaveClass('active');
    await expect(profileTab).not.toHaveClass('active');

    await profileTab.click();

    await expect(homeTab).not.toHaveClass('active');
    await expect(profileTab).toHaveClass('active');
  });

  test('Check list count', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add item' });
    const items = page.getByTestId('items').getByRole('listitem');

    await expect(items).toHaveCount(3);
    await addButton.click();
    await expect(items).toHaveCount(4);
  });

  test('Check css style', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'CSS стили отличаются в Chrome');
    const toggleButton = page.getByRole('button', { name: 'Toggle highlight' });
    const box = page.getByTestId('highlight-box');

    await expect(box).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await toggleButton.click();
    await expect(box).toHaveCSS('background-color', 'rgb(255, 235, 59)');
  });
});
