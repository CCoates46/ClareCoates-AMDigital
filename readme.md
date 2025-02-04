#AMDigital-tests

This is a subset of tests that have been written as part of a technical challenge.

The project has been structured as follows:

features
 ┣ basicSearch.feature
 ┗ navigation.feature
fixtures
 ┗ world.ts
step-definitions
 ┣ basicSearch
 ┃ ┣ filterSearchResults.step.ts
 ┃ ┗ performSearch.step.ts
 ┗ navigation
 ┃ ┗ specificLink.step.ts 
utils
 ┣ helpers.ts
 ┣ search.ts
 ┗ timeline.ts

The scenarios within each feature are within 1 file as they are small files.
The tests are grouped by functionality and each scenario is a separate test as the files are large. This allows readability. I have also added tags to allow the tests to be ran individually.
I have also utilised Page Object Models which hold the locators and functions by each page.

The framework used is Playwright with Cucumber BDD and Angular.

## How to setup the repo

1. Clone the repo from `https://github.com/CCoates46/ClareCoates-AMDigital`
2. Install project dependencies:
    1. Run `yarn`
    2. Run `npm install --save-dev @playwright/test`
    3. Run `npx playwright install`
    4. Run `npm install --save-dev @cucumber/cucumber ts-node typescript`
    5. Run `npm install --save-dev playwright-cucumber`

#How to run locally
1. To run headless mode - Run `npm test`
2. To run in headed mode - Run `HEADLESS=false npx cucumber-js`
3. To run in a different browser - Run `HEADLESS=false BROWSER='firefox'  npx cucumber-js` - default is 'chromium'
4. To run a test individually - Run `HEADLESS=false npx cucumber-js --tags '@test1'`

## Limitations

Due to time constraints, I was only able to complete 3 out of the 6 scenarios.

Main issues encountered:
1. Demo website seems to be very slow and at times became unresponsive. 
    Due to this tests can be flaky if ran frequently and back to back.
    On further investigation it seems there are calls being made for GA4 tags which are returning a 204 code. This could well be clogging the network and causing it to slow down.
2. Adding cucumber BDD onto playwright was cumbersome. In my experience having cucumber BDD adds an extra layer of complexity and can take time
    maintaining this on top of tests. When writing tests alongside engineers writing the code, this extra level could lead to delays.

