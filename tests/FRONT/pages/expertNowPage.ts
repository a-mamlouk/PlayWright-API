import { Page, Locator } from '@playwright/test';

export class ExpertNowPage {
  readonly page: Page;

  // Header & Navigation
  readonly learnMoreButton: Locator;
  readonly aboutLink: Locator;

  // Services Section
  readonly cyberSecurityService: Locator;
  readonly cloudSolutionsService: Locator;
  readonly devOpsService: Locator;
  readonly sysOpsService: Locator;
  readonly qaTestAutomationService: Locator;
  readonly trainingService: Locator;

  // Footer Links
  readonly latestNewsLink: Locator;
  readonly contactLink: Locator;
  readonly linkedinLink: Locator;
  readonly githubLink: Locator;

  // Contact Information
  readonly phoneNumber: Locator;
  readonly emailLink: Locator;

  // Call-to-Action Buttons
  readonly exploreUsButton: Locator;
  readonly contactUsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header & Navigation
    this.learnMoreButton = page.locator('a:has-text("Learn More")').first();
    this.aboutLink = page.locator('a:has-text("About US")');

    // Services Section - using heading text
    this.cyberSecurityService = page.locator('text=Cyber-Security').first();
    this.cloudSolutionsService = page.locator('text=Cloud Solutions').first();
    this.devOpsService = page.locator('text=DevOps').first();
    this.sysOpsService = page.locator('text=SysOps').first();
    this.qaTestAutomationService = page.locator('text=QA & Test Automation').first();
    this.trainingService = page.locator('text=Training').first();

    // Footer Links
    this.latestNewsLink = page.locator('a:has-text("Latest News")');
    this.contactLink = page.locator('a[href*="/contact"]');
    this.linkedinLink = page.locator('a[href*="linkedin"]');
    this.githubLink = page.locator('a[href*="github"]');

    // Contact Information
    this.phoneNumber = page.locator('text=+33 6 41 05 54 13');
    this.emailLink = page.locator('a[href="mailto:contact-idf@expertnow.fr"]');

    // Call-to-Action Buttons
    this.exploreUsButton = page.locator('a:has-text("Explore Us")');
    this.contactUsButton = page.locator('a:has-text("Contact Us")');
  }

  /**
   * Navigate to ExpertNow homepage
   */
  async goto(): Promise<void> {
    await this.page.goto('https://expertnow.fr/');
  }

  /**
   * Click on Learn More button in the hero section
   */
  async clickLearnMore(): Promise<void> {
    await this.learnMoreButton.click();
  }

  /**
   * Click on About link in navigation/footer
   */
  async clickAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  /**
   * Click on Explore Us button
   */
  async clickExploreUs(): Promise<void> {
    await this.exploreUsButton.click();
  }

  /**
   * Click on Contact Us button
   */
  async clickContactUs(): Promise<void> {
    await this.contactUsButton.click();
  }

  /**
   * Verify if a service section is visible
   */
  async isServiceVisible(serviceName: string): Promise<boolean> {
    const service = this.page.locator(`text=${serviceName}`).first();
    return await service.isVisible();
  }

  /**
   * Get service description text
   */
  async getServiceDescription(serviceName: string): Promise<string> {
    // Navigate to the service section and get the description
    const service = this.page.locator(`text=${serviceName}`).first();
    const parent = service.locator('xpath=ancestor::div[1]');
    return await parent.textContent() || '';
  }

  /**
   * Check if all services are visible
   */
  async areAllServicesVisible(): Promise<boolean> {
    const services = [
      this.cyberSecurityService,
      this.cloudSolutionsService,
      this.devOpsService,
      this.sysOpsService,
      this.qaTestAutomationService,
      this.trainingService,
    ];

    for (const service of services) {
      const isVisible = await service.isVisible().catch(() => false);
      if (!isVisible) return false;
    }
    return true;
  }

  /**
   * Click on a specific service by name
   */
  async clickService(serviceName: string): Promise<void> {
    const service = this.page.locator(`text=${serviceName}`).first();
    await service.click();
  }

  /**
   * Get contact email
   */
  async getContactEmail(): Promise<string | null> {
    return await this.emailLink.getAttribute('href');
  }

  /**
   * Get phone number text
   */
  async getPhoneNumber(): Promise<string | null> {
    return await this.phoneNumber.textContent();
  }

  /**
   * Click on LinkedIn link
   */
  async clickLinkedin(): Promise<void> {
    await this.linkedinLink.click();
  }

  /**
   * Click on GitHub link
   */
  async clickGithub(): Promise<void> {
    await this.githubLink.click();
  }

  /**
   * Verify page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Scroll to a specific section by text
   */
  async scrollToSection(sectionText: string): Promise<void> {
    const section = this.page.locator(`text=${sectionText}`).first();
    await section.scrollIntoViewIfNeeded();
  }
}
