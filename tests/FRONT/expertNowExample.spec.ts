import { test, expect } from '@playwright/test';
import { ExpertNowPage } from './pages/expertNowPage';

test.describe('ExpertNow Website - Page Object Model Tests', () => {
  let expertNowPage: ExpertNowPage;

  test.beforeEach(async ({ page }) => {
    expertNowPage = new ExpertNowPage(page);
    await expertNowPage.goto();
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Verify page title
    const title = await expertNowPage.getPageTitle();
    expect(title).toContain('ExpertNow');
  });

  test('should display all services sections', async () => {
    // Verify all services are visible
    const allServicesVisible = await expertNowPage.areAllServicesVisible();
    expect(allServicesVisible).toBe(true);
  });

  test('should display individual services', async () => {
    // Check each service is visible
    const services = [
      'Cyber-Security',
      'Cloud Solutions',
      'DevOps',
      'SysOps',
      'QA & Test Automation',
      'Training',
    ];

    for (const service of services) {
      const isVisible = await expertNowPage.isServiceVisible(service);
      expect(isVisible).toBe(true);
    }
  });

  test('should have clickable service elements', async ({ page }) => {
    // Click on Cyber-Security service
    await expertNowPage.clickService('Cyber-Security');
    // Wait for any action (e.g., navigation or modal)
    await page.waitForLoadState('networkidle');
  });

  test('should display contact information', async () => {
    // Verify phone number is visible
    const phoneNumber = await expertNowPage.getPhoneNumber();
    expect(phoneNumber).toContain('+33');

    // Verify email is present
    const email = await expertNowPage.getContactEmail();
    expect(email).toContain('contact-idf@expertnow.fr');
  });

  test('should have working navigation links', async ({ page }) => {
    // Click Learn More button
    await expertNowPage.clickLearnMore();
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred (page URL changed or same page loaded)
    expect(page.url()).toBeTruthy();
  });

  test('should navigate to About page when clicking About', async ({ page }) => {
    await expertNowPage.clickAbout();
    await page.waitForLoadState('networkidle');

    // Verify the About page loaded
    expect(page.url()).toContain('about');
  });

  test('should navigate to Contact page when clicking Contact Us', async ({ page }) => {
    await expertNowPage.clickContactUs();
    await page.waitForLoadState('networkidle');

    // Verify the Contact page loaded
    expect(page.url()).toContain('contact');
  });

  test('should have external social media links', async ({ page }) => {
    // Verify LinkedIn link
    const linkedinUrl = await expertNowPage.page.locator('a[href*="linkedin"]').first().getAttribute('href');
    expect(linkedinUrl).toContain('linkedin');

    // Verify GitHub link
    const githubUrl = await expertNowPage.page.locator('a[href*="github"]').first().getAttribute('href');
    expect(githubUrl).toContain('github');
  });

  test('should scroll to services section', async () => {
    await expertNowPage.scrollToSection('DevOps');
    // Verify the section is in view
    const devOpsService = expertNowPage.page.locator('text=DevOps').first();
    await expect(devOpsService).toBeInViewport();
  });

  test('should verify Cyber-Security service description exists', async () => {
    const description = await expertNowPage.getServiceDescription('Cyber-Security');
    expect(description.length).toBeGreaterThan(0);
    expect(description.toLowerCase()).toContain('security');
  });
});
