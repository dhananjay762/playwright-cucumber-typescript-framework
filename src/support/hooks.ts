import {Before, After, BeforeAll, AfterAll, ITestCaseHookParameter } from "@cucumber/cucumber";
import {pageFixture} from "./pageFixture";
import { Browser, chromium, firefox, webkit, BrowserType } from "@playwright/test";
import { PageManager } from "./pageManager";
import { initEnv } from "../helper/env/env";
import { config } from "../helper/env/config";
import { url } from "inspector/promises";

let browser: Browser;
export let pageManager: PageManager;

// Load environment variables before anything else
initEnv();

const getBrowser = (browserName: string): BrowserType => {
    switch (browserName.toLowerCase()) {
        case 'firefox':
            return firefox;
        case 'webkit':
        case 'safari':
            return webkit;
        case 'chromium':
        default:
            return chromium;
    }
};

BeforeAll(async function () {
    console.log("\nExecuting test suite...");
    console.log(`Base URL : ${config.baseUrl}`);
    console.log(`Browser  : ${config.browser}`);
    console.log(`Headless : ${config.headless}`);
});

AfterAll(async function () {
    console.log("\nFinished execution of test suite...");
});

Before({ timeout: 60 * 1000 }, async function () {
    const browserType = getBrowser(config.browser);
    browser = await browserType.launch({headless: config.headless});
    pageFixture.context = await browser.newContext();
    pageFixture.page = await pageFixture.context.newPage();
    await pageFixture.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
    //initialize page objects here
    pageManager = new PageManager();
});

After({ timeout: 60 * 1000 }, async function ({pickle, result} : ITestCaseHookParameter) {
    if(result?.status === "FAILED") {
        console.log(`\nTest case failed: ${pickle.name}`);
        const screenshot = await pageFixture.page.screenshot({ 
            path: `./reports/screenshots/${pickle.name}-${Date.now()}.png`,
            type: "png",
            fullPage: true
        });
        console.log(`Screenshot captured for failed test case: ${pickle.name}`);
        this.attach(screenshot, "image/png");
    }
    await pageFixture.page?.close();
    await browser?.close();
});