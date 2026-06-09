import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('StarPets UI Tests', () => {

  test('Main page opens successfully', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.open();

    await expect(page).toHaveTitle(/StarPets/i);
  });

  test('Page URL is correct', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.open();

    await expect(page).toHaveURL(/starpets/i);
  });

  test('Page loads successfully', async ({ page }) => {

    const productPage = new ProductPage(page);
  
    await productPage.open();
  
    await expect(page.locator('body')).toBeVisible();
  
    expect(await page.title()).not.toBe('');
  });

});