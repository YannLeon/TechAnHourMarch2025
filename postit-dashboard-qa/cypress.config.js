const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  videoCompression: 32, // Lower value for better quality
  videoUploadOnPasses: false, // Keep videos even if tests pass

  env: {
    baseUrl: "http://localhost:5173",
  },
  e2e: {
    specPattern: "**/*.feature",
    experimentalStudio: true,
    supportFile: "./cypress/support/e2e.js",
    // prefix async
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin =
        require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
      const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

      // await here
      await require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin(
        on,
        config
      );

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on("task", {
        renameVideo({ original, newFile }) {
          return new Promise((resolve, reject) => {
            if (fs.existsSync(original)) {
              fs.rename(original, newFile, (err) => {
                if (err) reject(err);
                resolve(true);
              });
            } else {
              resolve(false);
            }
          });
        },
      });

      // return any mods to Cypress
      return config;
    },
  },
});
