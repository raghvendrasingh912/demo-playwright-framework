import { test, expect } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

/**
 * Test Suite: Google iPhone Search
 *
 * Steps:
 *  1. Go to www.google.co.in
 *  2. Search for "latest iphone"
 *  3. Print + assert the first result title
 *  4. Click on it and verify navigation
 *
 * Retry behaviour:
 *  - playwright.config.ts sets retries: 3 (local) / 5 (CI)
 *  - The test keeps retrying on ANY failure until retry budget is exhausted,
 *    at which point Playwright marks it as failed (error surfaced).
 */
test.describe('Google Search – Latest iPhone', () => {

  test(
    'should search for latest iPhone, print first result and click it',
    async ({ page }) => {

      const searchPage = new GoogleSearchPage(page);

      // ── Step 1: Navigate to Google India ──────────────────────────────────
      console.log('\n📌 Step 1: Navigating to www.google.co.in');
      await searchPage.goto();
      await expect(page).toHaveURL(/google\.co\.in/, { timeout: 10000 });
      console.log('✅ Google India loaded');

      // ── Dismiss cookie / consent banner if shown ───────────────────────────
      await searchPage.dismissCookieBanner();

      // ── Step 2: Search for "latest iphone" ────────────────────────────────
      console.log('\n📌 Step 2: Searching for "latest iphone"');
      await searchPage.searchFor('latest iphone');
      console.log('✅ Search submitted');

      // ── Step 3: Print the first result title ──────────────────────────────
      console.log('\n📌 Step 3: Reading first search result title');
      const firstTitle = await searchPage.getFirstResultTitle();

      // Log ALL result titles so we have full visibility in the report
      const allTitles = await searchPage.getAllResultTitles();
      console.log('\n📋 All result titles found:');
      allTitles.forEach((t, i) => console.log(`   ${i + 1}. ${t}`));

      // Assert that at least one iPhone-related result is present
      const hasIphoneResult = allTitles.some(
        t => t.toLowerCase().includes('iphone') || t.toLowerCase().includes('apple')
      );
      expect(
        hasIphoneResult,
        `Expected at least one result to mention iPhone or Apple, got: ${allTitles.join(' | ')}`
      ).toBeTruthy();

      // The first title should not be empty
      expect(firstTitle.length, 'First result title should not be empty').toBeGreaterThan(0);

      // ── Step 4: Click the first result ────────────────────────────────────
      console.log(`\n📌 Step 4: Clicking on first result: "${firstTitle}"`);
      await searchPage.clickFirstResult();

      // Verify we navigated away from Google
      await page.waitForURL(url => !url.toString().includes('google.co.in/search'), {
        timeout: 15000,
      });
      const landedUrl = page.url();
      console.log(`✅ Navigated to: ${landedUrl}`);

      expect(
        landedUrl,
        'Should have navigated away from Google search results'
      ).not.toContain('google.co.in/search');

      console.log('\n🎉 Test PASSED – all steps completed successfully!');
    }
  );

});
