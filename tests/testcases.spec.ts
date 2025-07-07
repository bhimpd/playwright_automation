import {test} from "@playwright/test"
import { Helper } from "../helpers/helper";
import { TestCasesPage } from "../pages/TestCasesPage";


test.beforeEach("Login Page", async({page}) =>{

    const helper = new Helper(page);
    await helper.visitpage("https://automationexercise.com/");

});
test("test the test cases lists", async({page})=>{
    const testcase = new TestCasesPage(page);
    const helper = new Helper(page);

    await testcase.testCaseAssertion("Test Cases","/test_cases");
    await testcase.clickTestCases();
    await helper.urlAssertion("https://automationexercise.com/test_cases");
    await testcase.assertTestCaseTitle("Test Cases");

    await testcase.assertTestCasesLists();

    await page.waitForTimeout(5000);

});