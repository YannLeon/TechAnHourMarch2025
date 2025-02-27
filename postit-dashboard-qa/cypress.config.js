const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: 'http://localhost:5173',
  },
  e2e: {
    specPattern: "**/*.feature",
    experimentalStudio: true,
    supportFile: "./cypress/support/e2e.js",
    // prefix async
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

      // await here
      await require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // return any mods to Cypress
      return config
    }
  },
});