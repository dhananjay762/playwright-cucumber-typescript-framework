const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'reports/',
    reportPath: 'reports/html-report/',
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Local Machine',
        platform: {
            name: 'Windows',
            version: '10'
        }
    },
    customData: {
        title: 'Test Execution Info',
        data: [
            { label: 'Project', value: 'Playwright Cucumber TypeScript Framework' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toLocaleString() }
        ]
    }
});

