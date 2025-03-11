Feature: Log in test cases

  Background:
    Given I don't have a post it with the message "QA Cypress note" via API

  Scenario: Add post it
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | mj       | password |
    And I click on the log in button
    Then I'm redirected to the home page
    And the home page welcome message contains the user "mj"
    Then the "Create a new Post-it" is displayed
    And I can see 3 post its
    When I create new post it with the message "QA Cypress note"
    Then the post it with the message "QA Cypress note" appears with "MJ" as the author
    And I can see 4 post its
    When I click on the log out button
    And I fill in the form with the following credentials :
      | username | password |
      | yann     |   123123 |
    And I click on the log in button
    Then I see the post it "QA Cypress note" written by "MJ"
