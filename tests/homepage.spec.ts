import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Playwright Homepage Tests', () => {

  test('should load homepage and verify title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title).toContain('Playwright');
  });

  test('should display Get Started button', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(homePage.getStartedBtn).toBeVisible();
  });

  test('should navigate to Get Started page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickGetStarted();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('should verify page has correct heading', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const heading = await homePage.getHeroTitle();
    expect(heading.length).toBeGreaterThan(0);
  });

});
