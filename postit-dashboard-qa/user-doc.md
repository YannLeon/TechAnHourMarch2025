# 📝 User Documentation from Gherkin Scenarios

This document includes test scenarios along with their corresponding Cypress-generated videos.

## 📌 add-post-it

```gherkin
Feature: Add post it test cases

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

  Scenario: Add empty post it
    Given I am on the log in page
    When I fill in the form with the following credentials :
      | username | password |
      | yann     |   123123 |
    And I click on the log in button
    When I click on the add post it button
    Then I can see 3 post its
    And the error message "Post-it cannot be empty" appears in red

```

### 🎯 Scenario: Add post it
⚠️ No video found for this scenario.

### 🎯 Scenario: Add empty post it
⚠️ No video found for this scenario.

## 📌 delete-post-it

```gherkin
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

```

### 🎯 Scenario: Delete post it
⚠️ No video found for this scenario.

### 🎯 Scenario: User role can only delete their post its
⚠️ No video found for this scenario.

### 🎯 Scenario: Admin role can delete everyone's post its
⚠️ No video found for this scenario.

## 📌 login

```gherkin
Feature: Log in test cases

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
      | user  | password |
      | mj    | password |
      | yann  |   123123 |
      | admin | admin    |

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

```

### 🎯 Scenario: User not found case
⚠️ No video found for this scenario.

### 🎯 Scenario: Incorrect password case
⚠️ No video found for this scenario.

### 🎯 Scenario: Incorect registration
⚠️ No video found for this scenario.

