import { defineConfig } from "cypress";
import { afterSpecHook } from "cypress-qase-reporter/hooks";
import qasePlugin from "cypress-qase-reporter/plugin";
import qaseMetadata from "cypress-qase-reporter/metadata";

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-qase-reporter",
    cypressQaseReporterReporterOptions: {
      /*
            // You can define the reporter options here, or in a separate `qase.config.json` file.

            mode: 'testops',
            debug: false,
            testops: {
              api: {
                token: 'api_key',
              },
              project: 'project_code',
              uploadAttachments: true,
              run: {
              //  id: 1,
                title: "Your test run title",
                description: "Cypress Automated Test run",
                complete: true,
              },
              environment: 'prod',
            },
            framework: {
                cypress: {
                    screenshotsFolder: 'cypress/screenshots',
                    videosFolder: 'cypress/videos',
                    uploadDelay: 10,
                }
            }
          */
    },
  },
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      qasePlugin(on, config);
      qaseMetadata(on);
      on("after:spec", async (spec, results) => {
        await afterSpecHook(spec, config);
      });
    },
  },
});
