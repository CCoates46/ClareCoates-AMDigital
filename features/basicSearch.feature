Feature: Basic Search

@test1
Scenario: Perform a basic Search
    Given user is on any page of the Quartex Published Site 
    When user enters valid search term in the basic search input box 
    And the search button is clicked 
    Then user is navigated to the Browse All page 
    And the first page of search results is displayed 
    And the assets listed meet the search criteria: 
        | Search term | Number of search results | Title of asset listed | 
        | Brown         | 59                        | 1 April 1875. Browning, Robert to Pollock, Lady. | 

@test2
Scenario: Filter Search Results
    Given user has performed a successful basic search 
    When user selects to filter the search results by collection 
    Then the assets listed meet the search and filter criteria: 
        | Search term | Collection filtered by| Number of search results | Title of asset listed | 
        | Brown | Interwar Periodicals | 13 | Woman's Weekly, July-December 1919 | 
 