import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly getStartedBtn: Locator;
  readonly searchInput: Locator;
  readonly heroTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedBtn = page.getByRole('link', { name: 'Get started' });
    this.searchInput = page.getByPlaceholder('Search');
    this.heroTitle = page.locator('h1');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  async clickGetStarted(): Promise<void> {
    await this.click(this.getStartedBtn);
  }

  async getHeroTitle(): Promise<string> {
    return this.getText(this.heroTitle);
  }
}
