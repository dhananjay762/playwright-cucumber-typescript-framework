const { execSync } = require('child_process');
const report = require('multiple-cucumber-html-reporter');

const reportOnly = process.argv.includes('--report-only');

// Step 1 — Run tests only if not report-only mode
if (!reportOnly) {
    try {
        execSync('npx cucumber-js', { stdio: 'inherit' });
    } catch (e) {
        console.log('\n⚠️  Some scenarios failed. Generating report anyway...\n');
    }
}

// Step 2 — Always generate report
report.generate({
    jsonDir: 'reports/',
    reportPath: 'reports/html-report/',
    metadata: {
        browser: {
            name: process.env.BROWSER || 'chromium',
            version: 'latest'
        },
        device: 'Jenkins CI',
        platform: {
            name: 'Windows',
            version: '10'
        }
    },
    customData: {
        title: 'Test Execution Info',
        data: [
            { label: 'Project',         value: 'Playwright Cucumber TypeScript Framework' },
            { label: 'Browser',         value: process.env.BROWSER || 'chromium' },
            { label: 'Parallel Workers',value: process.env.PARALLEL || '1' },
            { label: 'Base URL',        value: process.env.BASE_URL || 'https://www.saucedemo.com/' },
            { label: 'Headless',        value: process.env.HEADLESS || 'false' },
            { label: 'Execution Time',  value: new Date().toLocaleString() }
        ]
    }
});