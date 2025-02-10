import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import { expect } from 'playwright/test'

Given('user has performed a successful basic search',{ timeout: 20000 }, async function () {
    await this.helpers.performingASearch('Brown') 
    await this.page.waitForLoadState('domcontentloaded')
        })

When('user selects to filter the search results by collection', { timeout: 60000 }, async function () {
    
    await expect(this.search.browseAll).toBeVisible()
    const resultsList = this.search.mediaList
    expect(resultsList).toBeVisible
    
    await this.search.clickCookieBanner('https://demo.quartexcollections.com/documents?returning=true')
    await this.page.waitForLoadState('domcontentloaded')

    try {
        await this.search.checkCheckbox('Interwar Periodicals')
    
        console.log('Checkbox is present and matches the expected value.')
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during checkbox verification:', error.message);
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }

    await this.search.applyFilters()
    await this.page.waitForLoadState('networkidle')
    
})

Then('the assets listed meet the search and filter criteria:', async function (dataTable: DataTable) {
    // get the expected results from the table
    const expectedData = dataTable.hashes()[0]
    const expectedSearchTerm = expectedData['Search term']
    const expectedCollectionFilteredBy = expectedData['Collection filtered by']
    const expectedResultCount = parseInt(expectedData['Number of search results'])
    const expectedTitle = expectedData['Title of asset listed']

    // Verify the search term
    try {
        const searchTermTag = this.search.searchTerms
    
        await expect(searchTermTag).toHaveCount(1)
    
        const actualText = await searchTermTag.textContent()
        console.log('Actual Text:', actualText.trim())
    
        expect(actualText.trim()).toBe(expectedSearchTerm)
    
        console.log('Search term is present and matches the expected value.')
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during search term verification:', error.message)
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }

    // verify the Collection filtered by

    try {
        const collectionTermTag = this.search.collectionsFilter

        await expect(collectionTermTag).toHaveCount(1)

        const actualCollection = await collectionTermTag.textContent()
        console.log('Actual Collection Text:', actualCollection.trim())
    
        expect(actualCollection.trim()).toBe(expectedCollectionFilteredBy)

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during collections verification:', error.message)
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }

    // verify the number of results
    try {
        const totalResults = await this.search.paginationResults.textContent()
        console.log(totalResults)
        const actualResultCount = parseInt(totalResults.split('of ')[1])
        console.log('Actual search result count:', actualResultCount)
        expect(actualResultCount).toBe(expectedResultCount)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during total results verification:', error.message)
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }

    // Verify the title of asset is listed
    try {
        const titleLocator = this.search.getAssetTitle(expectedTitle)
        console.log('Asset title matches: ', expectedTitle)

        await expect(titleLocator).toBeVisible()

        const actualTitle = await titleLocator.textContent()

        expect(actualTitle.trim()).toBe(expectedTitle)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during asset title verification:', error.message)
        } else {
            console.error('An unknown error occurred')
        }
        throw error // Re-throw the error to allow the test to fail
    }
})
