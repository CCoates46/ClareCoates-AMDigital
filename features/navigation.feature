Feature: Navigation

@test3
Scenario: Navigate to a specific link from a Timeline content block
    Given user is on any page of the Quartex Site  
    And user has navigated to a Timeline content block  
    When user clicks a hyperlink available  
    Then the correct webpage is launched in a new tab 
    
  