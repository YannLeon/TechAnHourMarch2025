Feature: Log in test cases

  Background:
    # Given I have a post it with the message "QA post it to be deleted" via API

  Scenario: Delete post it
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | yann       | 123123 |
    And I click on the log in button
    Then I'm redirected to the home page
    And the home page welcome message contains the user "yann"
    And I can see 4 post its

