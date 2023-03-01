const { defineConfig } = require('cypress');

module.exports = defineConfig({
  includeShadowDom: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
