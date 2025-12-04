import { defineConfig } from "cypress";
import { afterSpecHook } from "cypress-qase-reporter/hooks";
import qasePlugin from "cypress-qase-reporter/plugin";
import qaseMetadata from "cypress-qase-reporter/metadata";

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-qase-reporter",
    cypressQaseReporterReporterOptions: {
            mode: 'testops',
            debug: false,
            testops: {
              api: {
                token: 'API_TOKEN',
              },
              project: 'PROJECT',
              uploadAttachments: true,
              run: {
                title: "Sample Test Run",
                complete: true,
              },
            },
            framework: {
                cypress: {
                    screenshotsFolder: 'cypress/screenshots',
                    videosFolder: 'cypress/videos',
                    uploadDelay: 10,
                }
            }
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
