import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Google Search (www.google.co.in)
 * Extends BasePage to reuse shared helpers (navigate, click, fill, getText)
 */
export class GoogleSearchPage extends BasePage {
  // ── Locators ────────────────────────────────────────────────────────────────
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstOrganicResult: Locator;
  readonly allOrganicResultTitles: Locator;
  readonly cookieAcceptBtn: Locator;

  constructor(page: Page) {
    super(page);
    // Main search box (works before and after search)
    this.searchInput = page.locator('textarea[name="q"], input[name="q"]').first();
    // "Google Search" submit button on homepage
    this.searchButton = page.locator('input[name="btnK"]').first();
    // First organic result heading link
    this.firstOrganicResult = page.locator('h3').first();
    // All result heading elements
    this.allOrganicResultTitles = page.locator('h3');
    // Google consent / cookie banner (shows in some regions)
    this.cookieAcceptBtn = page.locator('button:has-text("Accept all"), button:has-text("I agree")').first();
  }

  // ── Actions ─────────────────────────────────────────────────────────────────

  /** Navigate to Google India homepage */
  async goto(): Promise<void> {
    await this.navigate('https://www.google.co.in');
  }

  /** Dismiss cookie / consent banner if it appears (best-effort) */
  async dismissCookieBanner(): Promise<void> {
    try {
      await this.cookieAcceptBtn.waitFor({ state: 'visible', timeout: 3000 });
      await this.cookieAcceptBtn.click();
    } catch {
      // banner not present – continue
    }
  }

  /** Type a query and submit via Enter key */
  async searchFor(query: string): Promise<void> {
    await this.waitForElement(this.searchInput);
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    // Wait for results heading or result stats to confirm SERP loaded
    await this.page.waitForSelector('#search, #rcnt', { timeout: 10000 });
  }

  /**
   * Returns the text of the FIRST organic result <h3> on the page.
   * Also prints it to the console.
   */
  async getFirstResultTitle(): Promise<string> {
    await this.waitForElement(this.firstOrganicResult, 10000);
    const title = (await this.firstOrganicResult.textContent()) ?? '';
    console.log(`\n🔍 First search result: "${title}"`);
    return title.trim();
  }

  /**
   * Returns the text of ALL visible <h3> result titles as an array.
   * Useful for debugging / asserting broader result sets.
   */
  async getAllResultTitles(): Promise<string[]> {
    await this.allOrganicResultTitles.first().waitFor({ state: 'visible', timeout: 10000 });
    const titles = await this.allOrganicResultTitles.allTextContents();
    return titles.map(t => t.trim()).filter(Boolean);
  }

  /** Click the first organic result <h3> link */
  async clickFirstResult(): Promise<void> {
    await this.waitForElement(this.firstOrganicResult, 10000);
    await this.firstOrganicResult.click();
  }
}
