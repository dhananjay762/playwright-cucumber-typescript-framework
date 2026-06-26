import { Page, BrowserContext } from "@playwright/test";


export const pageFixture = {
  //ts-ignore
  page: undefined as unknown as Page,
  //ts-ignore
  context: undefined as unknown as BrowserContext
}