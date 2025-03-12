// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
afterEach(function () {
  if (Cypress.config("video")) {
    const scenarioName = this.currentTest.title.replace(/\s+/g, "_"); // Format scenario name
    const specFileName = Cypress.spec.name.replace(/\.feature$/, ""); // Remove extension
    const videoDir = `cypress/videos/`;

    cy.task("renameVideo", {
      original: `${videoDir}${specFileName}.mp4`,
      newFile: `${videoDir}${specFileName}_${scenarioName}.mp4`,
    });
  }
});

import "./commands";
