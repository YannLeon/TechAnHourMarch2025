Feature: Delete post it cases

  Background:
    Given I have a post it with the message "QA post it to be deleted" via API
    And I don't have a post it with the message "QA Cypress note" via API

  Scenario: Delete post it
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | yann     |   123123 |
    And I click on the log in button
    Then I'm redirected to the home page
    And the home page welcome message contains the user "yann"
    And I can see 4 post its
    When I delete post it with the message "QA post it to be deleted"
    Then I can see 3 post its

  Scenario: User role can only delete their post its
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | yann     |   123123 |
    And I click on the log in button
    And I can see 4 post its
    Then the user "Yann" can only delete their post it
    When I delete post it with the message "QA post it to be deleted"
    Then I can see 3 post its

  Scenario: Admin role can delete everyone's post its
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | admin    | admin    |
    And I click on the log in button
    And I can see 4 post its
    Then the admin user can delete everyone's post it
    When I delete post it with the message "QA post it to be deleted"
    Then I can see 3 post its
