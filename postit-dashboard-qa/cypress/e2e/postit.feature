Feature: Log in test cases

  Scenario Outline: Nominal case user log in
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | mj       | password |
    And I click on the log in button
    Then I'm redirected to the home page
    And the home page welcome message contains the user "mj"
    Then the "Create a new Post-it" is displayed
    When I create new post it with the message "QA Cypress note"
    Then the post it number 4 appears
