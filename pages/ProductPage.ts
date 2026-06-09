import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.item-card');
  }

  async open() {
    await this.page.goto('https://starpets.gg/');
  }

  async getProductsCount() {
    return await this.productCards.count();
  }
}