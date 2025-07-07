import { Page,expect,Locator } from "@playwright/test";
import { Helper } from "../helpers/helper";
import testcases from "../fixtures/testcases.json"


export class TestCasesPage{

    readonly page: Page;
    readonly helper:Helper;

    readonly testcaseSelector: Locator;
    readonly titleTestSelector: Locator;
    readonly eachTestCaseSelector: Locator;


    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.testcaseSelector = page.locator(".header-middle a[href='/test_cases']");
        this.titleTestSelector = page.locator("h2.title");
        this.eachTestCaseSelector = page.locator("h4.panel-title a u");

    }


    async testCaseAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.testcaseSelector,expectedText,expectedHref);
    }

    async clickTestCases(){
        await this.testcaseSelector.click();
    }

    async assertTestCaseTitle(expectedText: string){
        await this.helper.textAssertion(this.titleTestSelector, expectedText);
    }

    async assertTestCasesLists(){
        const expectedTestCases = testcases.testcaseslists;

        for(const list of expectedTestCases){
            const testcaselistText = this.eachTestCaseSelector.filter({hasText:list});
            await expect(testcaselistText).toBeVisible();
            await expect(testcaselistText).toHaveText(list);
        }
    }

    



}