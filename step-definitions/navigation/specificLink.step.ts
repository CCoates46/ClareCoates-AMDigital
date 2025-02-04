import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import { expect } from 'playwright/test'

Given('user is on any page of the Quartex Site',{ timeout: 50000 }, async function () {
    await this.helpers.goto()
    await this.page.waitForLoadState('domcontentloaded')
    await this.helpers.clickDiscoveryAids()
    await this.page.waitForLoadState('networkidle')
        })

Then('user has navigated to a Timeline content block', { timeout: 50000 }, async function () {
   // selects a content block and verifies navigated to correct page
    try {
        await this.helpers.clickContentBlock()
        await this.page.waitForLoadState('networkidle')

        await this.search.clickCookieBanner('https://demo.quartexcollections.com/discovery-aids/the-brownings-a-brief-history')
        await this.page.waitForLoadState('networkidle')

        const title = await this.timeline.getTimelineTitleText()
        console.log(title)
        expect(title).toBe('The Brownings: A Brief History')
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during search term verification:', error.message)
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }

    // scrolls to date in timeline and selects hyperlink

    await this.timeline.scrollToDate()
})

When('user clicks a hyperlink available', async function () {
   await this.timeline.selectHyperlink()
})
   
Then('the correct webpage is launched in a new tab', async function () {
    const [newPage] = await Promise.all([
        this.page.waitForEvent('popup'),  // Wait for the new tab
        this.page.locator('a:has-text("one of their first love letters")').click() // Click the link
        ])
    
        // Wait for the new tab to fully load
        await newPage.waitForLoadState()
    
        // Perform actions/assertions on the new tab
        console.log(await newPage.title());  // Example: Print the new page title
        await expect(newPage).toHaveURL(/\/Documents\/Detail\/\d+/)
})
