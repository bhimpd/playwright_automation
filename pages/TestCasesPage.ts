import { Page,expect,Locator } from "@playwright/test";
import { Helper } from "../helpers/helper";
import testcases from "../fixtures/testcases.json"


export class TestCasesPage{

    readonly page: Page;
    readonly helper:Helper;

    readonly testcaseSelector: Locator;
    readonly titleTestSelector: Locator;
    readonly eachTestCaseSelector: Locator;
    readonly subscriptionSelector: Locator;
    readonly subscribeemailSelector: Locator;
    readonly subscribeSelector: Locator;
    readonly subscriptionAlertSelector: Locator;
    readonly viewcartSelector: Locator;



    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.testcaseSelector = page.locator(".header-middle a[href='/test_cases']");
        this.viewcartSelector = page.locator(".header-middle a[href='/view_cart']");

        this.titleTestSelector = page.locator("h2.title");
        this.eachTestCaseSelector = page.locator("h4.panel-title a u");
        this.subscriptionSelector = page.locator(".single-widget h2")
        this.subscribeemailSelector = page.locator("#susbscribe_email");
        this.subscribeSelector = page.locator("#subscribe");
        this.subscriptionAlertSelector = page.locator("#success-subscribe .alert-success");


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

    async scrollTo(){
        await this.subscriptionSelector.scrollIntoViewIfNeeded();

    }

    async subscriptionAssertion(expectedText: string){
        await this.helper.textAssertion(this.subscriptionSelector, expectedText);
    }


    async fillSubscribeemail(expectedmail:string){
        await this.subscribeemailSelector.fill(expectedmail);
    }

    async clickSubscribe(){
        await this.subscribeSelector.click();
    }

    async subscriptionAlertAssertion(expectedText: string){
        await this.helper.textAssertion(this.subscriptionAlertSelector, expectedText);
    }


    async clickViewCart(){
        await this.viewcartSelector.click();
    }

    async viewCartAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.viewcartSelector,expectedText,expectedHref);
    }


}