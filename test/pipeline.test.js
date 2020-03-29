const assert = require('assert');
const Pipeline = require('../src/pipeline.js');

describe('Pipeline', () => {
  it('project with tests where deploy succeeds with email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return true },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      runTests() { return 'success'},
      deploy() { return 'success'},
      hasTests() { return true },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, ['Deployment completed successfully'])
    assert.deepStrictEqual(logsSent, [
      'INFO: Tests passed',
      'INFO: Deployment successful',
      'INFO: Sending email'
    ]);
  });
  
  it('project with tests where deploy succeeds without email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return false },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      runTests() { return 'success'},
      deploy() { return 'success'},
      hasTests() { return true },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, [])
    assert.deepStrictEqual(logsSent, [
      'INFO: Tests passed',
      'INFO: Deployment successful',
      'INFO: Email disabled'
    ]);
  });
  
  it('project without tests where deploy succeeds with email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return true },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      deploy() { return 'success'},
      hasTests() { return false },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, ['Deployment completed successfully'])
    assert.deepStrictEqual(logsSent, [
      'INFO: No tests',
      'INFO: Deployment successful',
      'INFO: Sending email'
    ]);
  });
  
  it('project without tests where deploy succeeds without email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return false },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      deploy() { return 'success'},
      hasTests() { return false },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, [])
    assert.deepStrictEqual(logsSent, [
      'INFO: No tests',
      'INFO: Deployment successful',
      'INFO: Email disabled'
    ]);
  });
  
  it('project with failing tests with email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return true },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      hasTests() { return true },
      runTests() { return 'failure'},
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, ['Tests failed'])
    assert.deepStrictEqual(logsSent, [
      'ERROR: Tests failed',
      'INFO: Sending email'
    ]);
  });
  
  it('project with failing tests without email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return false },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      hasTests() { return true },
      runTests() { return 'failure'},
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, [])
    assert.deepStrictEqual(logsSent, [
      'ERROR: Tests failed',
      'INFO: Email disabled'
    ]);
  });
  
  it('project with tests where deploy fails with email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return true },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      runTests() { return 'success'},
      deploy() { return 'failure'},
      hasTests() { return true },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, ['Deployment failed'])
    assert.deepStrictEqual(logsSent, [
      'INFO: Tests passed',
      'ERROR: Deployment failed',
      'INFO: Sending email'
    ]);
  });
  
  it('project with tests where deploy fails without email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return false },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      runTests() { return 'success'},
      deploy() { return 'failure'},
      hasTests() { return true },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, [])
    assert.deepStrictEqual(logsSent, [
      'INFO: Tests passed',
      'ERROR: Deployment failed',
      'INFO: Email disabled'
    ]);
  });
  
  it('project without tests where deploy fails with email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return true },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      deploy() { return 'failure'},
      hasTests() { return false },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, ['Deployment failed'])
    assert.deepStrictEqual(logsSent, [
      'INFO: No tests',
      'ERROR: Deployment failed',
      'INFO: Sending email'
    ]);
  });
  
  it('project without tests where deploy fails without email notifications', () => {
    const emailsSent = [];
    const logsSent = [];

    const config = {
      sendEmailSummary() { return false },
    }
    
    const emailer = {
      send(message) { emailsSent.push(message) },
    }
    
    const log = {
      info(message) { logsSent.push(`INFO: ${message}`) },
      error(message) { logsSent.push(`ERROR: ${message}`) },
    }

    const project = {
      deploy() { return 'failure'},
      hasTests() { return false },
    }
    
    const pipeline = new Pipeline(config, emailer, log);
    
    pipeline.run(project);
    
    assert.deepStrictEqual(emailsSent, [])
    assert.deepStrictEqual(logsSent, [
      'INFO: No tests',
      'ERROR: Deployment failed',
      'INFO: Email disabled'
    ]);
  });
});
