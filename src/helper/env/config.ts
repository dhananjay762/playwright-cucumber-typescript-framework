export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
    browser: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS === 'true' || false,
};