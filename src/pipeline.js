class Pipeline {
  constructor(config, emailer, log) {
    this.config = config;
    this.emailer = emailer;
    this.log = log;
  }
  
  run(project) {
    let testsPassed;
    let deploySuccessful

    if (project.hasTests()) {
      if (project.runTests() === "success") {
        this.log.info("Tests passed");
        testsPassed = true;
      } else {
        this.log.error("Tests failed");
        testsPassed = false;
      }
    } else {
      this.log.info("No tests");
      testsPassed = true;
    }

    if (testsPassed) {
      if (project.deploy() === "success") {
        this.log.info("Deployment successful");
        deploySuccessful = true;
      } else {
        this.log.error("Deployment failed");
        deploySuccessful = false;
      }
    } else {
      deploySuccessful = false;
    }

    if (this.config.sendEmailSummary()) {
      this.log.info("Sending email");
      if (testsPassed) {
        if (deploySuccessful) {
          this.emailer.send("Deployment completed successfully");
        } else {
          this.emailer.send("Deployment failed");
        }
      } else {
        this.emailer.send("Tests failed");
      }
    } else {
      this.log.info("Email disabled");
    }
  }
}

module.exports = Pipeline
