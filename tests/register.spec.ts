import { test,expect } from "@playwright/test";
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";
import { faker } from '@faker-js/faker';


test.beforeEach("Login Page", async({page}) =>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await helper.visitpage("https://automationexercise.com/");
    await register.clickSignUp();
    await helper.urlAssertion("https://automationexercise.com/login");

});


test("Should assert Text in Auth Page", async({page})=>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await register.assertLoginAccountLabel("Login to your account");
    await register.assertSignInUserLabel("New User Signup!");
    await register.assertLoginLabel("Login");
    await register.assertSignInLabel("Signup");

    await page.waitForTimeout(5000);
});

test.only("Should fill the input,click Sign and Assert the text in Register Page", async({page})=>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    const randomEmail = `dreamypd73+${faker.string.alphanumeric(6)}@gmail.com`;
    
    await register.fillname("Bhim");
    await register.fillemail(randomEmail);
    await page.waitForTimeout(4000);

    register.clickSignIn();
    await helper.urlAssertion("https://automationexercise.com/signup");
    
    await register.assertAccountAndAddressLabel(0,"Enter Account Information")
    await register.assertAccountAndAddressLabel(1,"Address Information")

    await register.fillAccountInformation(randomEmail);
    await page.waitForTimeout(3000);
    await register.fillAddressInformation();

    await helper.urlAssertion("https://automationexercise.com/account_created");
    await register.accountCreatedLabelAssertion("Account Created!")
    await register.continueButtonAssertionAndClick("Continue")
    
    await helper.urlAssertion("https://automationexercise.com");
    await register.logoutAssertion("Logout","/logout")
    await register.deleteAccountAssertion("Delete Account","/delete_account")

    await page.waitForTimeout(5000);
});