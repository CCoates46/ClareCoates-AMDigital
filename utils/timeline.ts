import { Locator, Page } from "@playwright/test"

export class Timeline {
    private readonly page: Page
    readonly timelineTitle: Locator
    readonly dateInTimeline: Locator
    readonly hyperlink: Locator

    constructor(page: Page) {
        this.page = page
        this.timelineTitle = page.locator('h2.heading.heading--secondary:has-text("The Brownings: A Brief History")')
        this.dateInTimeline = page.locator('h3:has-text("1845")')
        this.hyperlink = page.locator('//a[contains(@href, "10-january-1845")]')

    }

    async scrollToDate() {
            let isVisible = false
            while (!isVisible) {
                // Check if the element is visible
                isVisible = await this.dateInTimeline.isVisible()
                if (!isVisible) {
                    await this.page.mouse.wheel(0, 500); // Simulate scrolling down
                    await this.page.waitForTimeout(1000); // Wait a bit for new content to load
                }
            }
            console.log('Element is now visible')
        }

    async selectHyperlink() {
        const linkElement = this.hyperlink
        
        await linkElement.scrollIntoViewIfNeeded()
        await linkElement.click()
    }

    async getTimelineTitleText() {
        await this.timelineTitle.waitFor({ state: 'visible' }) 

        const title = await this.timelineTitle
        const titleText = await title.textContent()
        return titleText?.trim()
    }
}