import { Locator, Page } from "@playwright/test"

export class Search {
   
    private readonly page: Page
    readonly browseAll: Locator
    readonly mediaList: Locator
    readonly paginationValue: Locator
    readonly searchTerms: Locator
    readonly paginationResults: Locator
    readonly getAssetTitle: (title: string) => Locator
    readonly applyButton: Locator
    readonly collectionsFilter: Locator
  
    constructor(page: Page) {
      this.page = page
      this.browseAll = page.getByRole('heading', { name: 'Browse All' })
      this.mediaList = page.locator('ul.media-list__items[data-testid="documentSearchResultContainer"]')
      this.paginationValue = page.locator('input#pagination-top-page.form-field.media-list__top-pagination-options__input')
      this.searchTerms = page.locator('ul.tag-group__list .related-search-term-tag').filter({ hasText: 'Brown' })
      this.paginationResults = page.locator('div.media-list__top-pagination-info.bold').first()
      this.getAssetTitle = (title: string) => page.getByText(title, { exact: true })
      this.applyButton = this.page.locator('button.button--smaller[aria-label="Apply filters"]')
      this.collectionsFilter = this.page.locator('ul.tag-group__list .related-search-term-tag').filter({ hasText: 'Interwar Periodicals' })
    }

    async clickCookieBanner(url: string) {
      const frame = this.page.frame({ url: url })

      if (frame) {
        await frame.locator('.cc-btn.cc-dismiss').click()
      }
    }
      
    async checkCheckbox(filterName: string) {
      const formattedFilterName = `chk-box-${filterName.replace(/\s+/g, '-').toLowerCase()}`

      const checkbox = this.page.locator(`#${formattedFilterName}`)
      console.log('am i here')
      console.log(checkbox)
      
      const isEnabled = await checkbox.isEnabled()
      console.log(isEnabled)
      
      if(!isEnabled){
        console.log(`checkbox is disabled`)
      } else {
        await checkbox.check({ force: true })
      }
    }

    async applyFilters() {
      const isVisible = await this.applyButton.isVisible()
      console.log(isVisible)

      if (isVisible) {
        console.log('is visible')
        this.applyButton.click()
      } else {
        console.log("not visible")
      }
    }
    }
    