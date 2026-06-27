console.log("✅ cucumber.js config loaded");

module.exports = {
  default: {
    timeout: 60000,
    paths: ['src/features/**/*.feature'],
    require: [
      'src/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'pretty', 
      'html:reports/report.html',
      'json:reports/cucumber-report.json'
    ],
    parallel: 2
  }
}