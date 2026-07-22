import { test, expect } from '@playwright/test';

test('Fill form and make order', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/actions');
  await page.getByLabel('Name').fill('Ivan Ivanov');
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Country').selectOption('US');
  await page.getByLabel('Country').selectOption('US');
  await page.getByLabel('I accept the terms').check();
  await page.getByLabel('Express delivery').check();

  //загрузка файла
  await page.getByLabel('Invoice file').setInputFiles('tests/files/image2.png');
  const product = page.getByRole('article', { name: /Product 1/ });
  await product.hover();
  //await product.getByRole('button', { name: 'Add to cart' }).click();

  await product.dragTo(page.getByText('Drop product here'));
  await expect(page.getByTestId('order-total')).toHaveText('$199.99');
});
