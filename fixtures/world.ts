import { setWorldConstructor, Before, After } from '@cucumber/cucumber'
import { Page, Browser, chromium, firefox, webkit } from 'playwright'
import { Helpers } from '../utils/helpers'
import { Search } from '../utils/search'

class CustomWorld {

  public page: Page
  public browser: Browser
  public helpers: Helpers
  public search: Search

  constructor() {
    this.page = null!
    this.browser = null!
    this.helpers = null!
    this.search = null!
  }

  // Async function to handle the browser launch and page creation
  async setupBrowser() {
    const browserName = process.env.BROWSER || 'chromium'
    const isHeadless = process.env.HEADLESS !== 'false'

    try {
      if (browserName === 'chromium') {
        this.browser = await chromium.launch({ headless: isHeadless })
      } else if (browserName === 'firefox') {
        this.browser = await firefox.launch({ headless: isHeadless })
      } else if (browserName === 'webkit') {
        this.browser = await webkit.launch({ headless: isHeadless })
      } else {
        throw new Error('Browser not supported')
      }

      // this.browser.on('disconnected', () => {
      //   console.error('Browser disconnected unexpectedly')
      // })

      // Now that the browser is launched, create a new page
      this.page = await this.browser.newPage()

      // Initialize the Helpers and Search(POM) with the page objects
      this.helpers = new Helpers(this.page)
      this.search = new Search(this.page)

    } catch (error) {
      console.error('Error launching the browser:', error)
      throw error
    }
  }

  // Close the browser after the scenario
  public async closeBrowser() {
    try {
      // Ensure the page is not already closed before proceeding
      if (this.page && !this.page.isClosed()) {
        console.log('Waiting for page navigation to complete...')
        await this.page.waitForLoadState('load') // Wait for page load to complete
        console.log('Closing page...')
        await this.page.close()
      }

      // Ensure the browser is closed as well
      if (this.browser && !this.browser.close()) {
        console.log('Closing browser...')
        await this.browser.close()
      }
    } catch (error) {
      console.error('Error closing browser or page:', error)
    }
  }

}

// Register the custom world constructor
setWorldConstructor(CustomWorld)

// Use Cucumber's Before hook to set up the browser before each scenario
Before(async function (this: CustomWorld) {
  console.log("Before hook: Setting up browser")
  await this.setupBrowser()
})

// Optionally, use After hook to close the browser after each scenario
After(async function (this: CustomWorld) {
  try {
    // Ensure page load is completed before attempting to close
    if (this.page && !this.page.isClosed()) {
      console.log("Waiting for page navigation to complete...")
      await this.page.waitForLoadState('load') // Ensure the page has fully loaded
    }

    // Now attempt to close the page safely
    if (this.page && !this.page.isClosed()) {
      console.log("Closing page...")
      await this.page.close()
    }

    // Finally, close the browser after the page has been closed
    if (this.browser && !this.browser.close()) {
      console.log("Closing browser...")
      await this.browser.close()
    }
  } catch (err) {
    console.error('Error in After hook:', err)
  }
});
