import {test} from "@playwright/test"
import { Helper } from "../helpers/helper";
import { TestCasesPage } from "../pages/TestCasesPage";
import { generateContactFormData } from "../helpers/faker"


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

test("Check Subscription.", async({page})=>{
    const testcase = new TestCasesPage(page);
    const helper = new Helper(page);
    const testData = generateContactFormData();

    await testcase.scrollTo();
    await testcase.subscriptionAssertion("Subscription");

    console.log("email:: ",testData.email);
    await testcase.fillSubscribeemail(testData.email);
    await testcase.clickSubscribe();

    await testcase.subscriptionAlertAssertion("You have been successfully subscribed!")

    await page.waitForTimeout(5000);

})


test("Check Subscription in Cart page", async({page})=>{
    const testcase = new TestCasesPage(page);
    const helper = new Helper(page);
    const testData = generateContactFormData();

    await testcase.viewCartAssertion("Cart","/view_cart");
    await testcase.clickViewCart();
    await helper.urlAssertion("https://automationexercise.com/view_cart");
   
    await testcase.subscriptionAssertion("Subscription"); 
    await testcase.fillSubscribeemail(testData.email);
    await testcase.clickSubscribe();

    await testcase.subscriptionAlertAssertion("You have been successfully subscribed!")

    await page.waitForTimeout(5000);

})