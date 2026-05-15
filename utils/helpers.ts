import { Page } from '@playwright/test';

export async function waitMs(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomEmail(): string {
  return `test_${randomString()}@example.com`;
}

export async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export async function clearBrowserState(page: Page): Promise<void> {
  await page.context().clearCookies();
  await page.evaluate(() => localStorage.clear());
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
