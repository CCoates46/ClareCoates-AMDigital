import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import { expect } from 'playwright/test'


Given('user is on any page of the Quartex Published Site', async function () {
    await this.helpers.goto()  
    })

When('user enters valid search term in the basic search input box', async function () {
    await this.helpers.fill('Brown')
        })

Then('the search button is clicked', async function () {
    await this.helpers.click()
})

Then('user is navigated to the Browse All page', async function () {
    await expect(this.search.browseAll).toBeVisible()
    await this.page.waitForLoadState('domcontentloaded')
})

Then('the first page of search results is displayed', async function () {
    const resultsList = this.search.mediaList
    const pageInput = this.search.paginationValue
    const pageValue = await pageInput.inputValue()

    await expect(resultsList).toBeVisible()

    expect(pageValue).toBe('1')   
})

Then('the assets listed meet the search criteria:', async function (dataTable: DataTable) {
    // get the expected results from the table
    const expectedData = dataTable.hashes()[0]
    const expectedSearchTerm = expectedData['Search term']
    const expectedResultCount = parseInt(expectedData['Number of search results'])
    const expectedTitle = expectedData['Title of asset listed']

    // Verify the search term
    try {
        const searchTermTag = this.search.searchTerms;
    
        await expect(searchTermTag).toHaveCount(1);
    
        const actualText = await searchTermTag.textContent();
        console.log('Actual Text:', actualText.trim());
    
        expect(actualText.trim()).toBe(expectedSearchTerm);
    
        console.log('Search term is present and matches the expected value.');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during search term verification:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
        throw error; // Re-throw the error to allow the test to fail
    }

    // verify the number of results
    try {
        const totalResults = await this.search.paginationResults.textContent()
        const actualResultCount = parseInt(totalResults.split('of ')[1]);
        console.log('Actual search result count:', actualResultCount);
        expect(actualResultCount).toBe(expectedResultCount)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error occurred during total results verification:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
        throw error; // Re-throw the error to allow the test to fail
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
            console.error('Error occurred during asset title verification:', error.message);
        } else {
            console.error('An unknown error occurred');
        }
        throw error; // Re-throw the error to allow the test to fail
    }
})

