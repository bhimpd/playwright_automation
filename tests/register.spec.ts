import { test,expect } from "@playwright/test";
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";


test("Should Register the New User", async({page})=>{

    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await helper.visitpage("https://automationexercise.com/");
    await register.clickSignUp();

    await register.assertLoginAccountLabel("Login to your account");
    await register.assertSignInUserLabel("New User Signup!");
    await register.assertLoginLabel("Login");
    await register.assertSignInLabel("Signup");

    await page.waitForTimeout(5000);
});