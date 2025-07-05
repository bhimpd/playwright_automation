import { test,expect } from "@playwright/test";
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";
import { beforeEach } from "node:test";

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

    await register.fillname("Bhim");
    await register.fillemail("dreamypd73@gmail.com");

    register.clickSignIn();
    await helper.urlAssertion("https://automationexercise.com/signup");
    
    await register.assertAccountAndAddressLabel(0,"Enter Account Information")
    await register.assertAccountAndAddressLabel(1,"Address Information")

    await register.fillAccountInformation();

    await page.waitForTimeout(5000);
});