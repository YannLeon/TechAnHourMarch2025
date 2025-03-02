Feature: Log in test cases

  Scenario Outline: Nominal case user log in
    Given I am on the log in page
    When I fill in the log in form with the following credentials :
      | username   | password   |
      | <username> | <password> |
    And I click on the log in button
    Then I'm redirected to the home page

    Examples:
      | username | password |
      | admin    | admin    |
      | mj       | password |
      | yann     |   123123 |
