Feature: Log in test cases
@focus
  Scenario Outline: Nominal case user log in/ log out
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password   |
      | <user>   | <password> |
    And I click on the log in button
    Then I'm redirected to the home page
    And the home page welcome message contains the user "<user>"
    And I can see 3 post its
    When I click on the log out button
    Then I'm redirected to the authentication page

    Examples:
      | user | password |
      | mj   | password |
      | yann |   123123 |
      # | admin | admin    |

  Scenario: User not found case
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username       | password |
      | inexistantUser | password |
    And I click on the log in button
    Then the error message "User not found" appears in red

  Scenario: Incorrect password case
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password           |
      | admin    | incorrect password |
    And I click on the log in button
    Then the error message "Incorrect password" appears in red

  Scenario: Incorect registration
  Checking Register form and trying to create a new account with a username already used in our database

    Given I am on the log in page
    When I click on register account
    Then the "Register" form is displayed
    When I fill in the form with the following credentials :
      | username | password |
      | mj       | password |
    And I click on the register button
    Then the error message "User already exists" appears in red
