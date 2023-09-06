exports.config = {
    runner: 'local',
    specs: [
        './test/specs/*.js'
    ],
    maxInstances: 3,
    capabilities: [{
        maxInstances: 3,
        browserName: 'chrome',
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://clips4sale.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    injectGlobals: false,
    framework: 'mocha',
    reporters: [
        'spec',
        ['junit', {
            outputDir: './junit_reports',
            outputFileFormat: function(options) {
                return `results.xml`
            }
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
