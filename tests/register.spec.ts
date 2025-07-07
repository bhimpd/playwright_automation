import { test } from "@playwright/test";
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";
import { faker } from '@faker-js/faker';
import { saveCredentials, getCredentials} from "../utilis/userData";


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


test.describe.serial("Register and Login Flow", () => {

    test("Should fill the input,click Sign and Assert the text in Register Page and Register the User", async({page})=>{
        const helper = new Helper(page);
        const register = new RegiserPage(page);

        const randomEmail = `dreamypd73+${faker.string.alphanumeric(6)}@gmail.com`;
        const password ="Password1!"
        saveCredentials(randomEmail,password);
        
        await register.fillname("Bhim");
        await register.fillemail(randomEmail);

        register.clickSignIn();
        await helper.urlAssertion("https://automationexercise.com/signup");
        
        await register.assertAccountAndAddressLabel(0,"Enter Account Information");
        await register.assertAccountAndAddressLabel(1,"Address Information");

        await register.fillAccountInformation(randomEmail,password);
        await register.fillAddressInformation();

        await helper.urlAssertion("https://automationexercise.com/account_created");
        await register.accountCreatedLabelAssertion("Account Created!");
        await register.continueButtonAssertionAndClick("Continue");
        
        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

        await register.clickLogOutButton();
        await helper.urlAssertion("https://automationexercise.com/login");
        await register.loginSignInAssertion("Signup / Login", "/login")
        await register.loggeOutAssertion();

        await page.waitForTimeout(5000);
    });

    test("Login with saved credentials", async ({ page }) => {
        const helper = new Helper(page);
        const register = new RegiserPage(page);

        const { email, password } = getCredentials(); // 👈 Read saved email & password

        await helper.visitpage("https://automationexercise.com/");
        await register.clickSignUp();
        await helper.urlAssertion("https://automationexercise.com/login");

        await register.login(email, password); 

        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

        await page.waitForTimeout(3000);
    });

});


test("Login with incorrect credentials", async({page})=>{
    const register = new RegiserPage(page)

    await register.login("dreamypd72@gmail.com", "Hello"); 
    await register.errorMessageAssertion("Your email or password is incorrect!")

})


test("Signup with already existing  credentials", async({page})=>{
    const register = new RegiserPage(page)

    await register.fillname("Bhim"); 
    await register.fillemail("dreamypd73@gmail.com"); 
    await register.clickSignIn();
    await register.errorMessageAssertion("Email Address already exist!")

})

