import { Locator, Page } from "@playwright/test"

export class Helpers {
   
    private readonly page: Page
    readonly searchField: Locator
    readonly clickSearchButton: Locator
    readonly clickDiscoveryAidsMenu: Locator
    readonly selectATimelineContent: Locator
  
    constructor(page: Page) {
      this.page = page
      this.searchField = page.getByRole('searchbox', { name: 'Search digital collections' })
      this.clickSearchButton = page.getByRole('button', { name: 'Search the site'})
      this.clickDiscoveryAidsMenu = page.getByRole('button', { name: 'Discovery Aids' })
      this.selectATimelineContent = page.getByText("The Brownings: A Brief History")
    }

    async goto() {
        await this.page.goto("https://demo.quartexcollections.com/", { 
            timeout: 200000,
            waitUntil: 'domcontentloaded'
            })
    }

    async fill(searchTerm: string) {
            const searchField = this.searchField
            await searchField.waitFor({ state: 'visible' })
            
            console.log("Typing search term...")
            await searchField.fill(searchTerm) // Mimic real typing
            console.log(`Entered search term: ${searchTerm}`)
    }

    async click() {
        const searchButton = this.clickSearchButton
        await searchButton.waitFor({ state: 'visible' })
        await searchButton.waitFor({ state: 'attached' })

        const isEnabled = await searchButton.isEnabled()
        
        if (!isEnabled) {
            throw new Error("Search button is disabled and cannot be clicked.")
        }
    
        console.log("Clicking the search button...")
       
        await searchButton.click(), { 
            timeout: 200000,
            waitUntil: 'domcontentloaded'
            }
    }

    async clickDiscoveryAids() {
        await this.clickDiscoveryAidsMenu.click()
    }

    async clickContentBlock() {
        await this.selectATimelineContent.click()
    }

    async performingASearch() {
        await this.goto()  
        await this.fill('Brown')
        await this.click()
    }
    
}