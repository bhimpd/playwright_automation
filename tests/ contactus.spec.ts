import test from "@playwright/test"
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";
import { ContactUsPage } from "../pages/ContactUsPage";


test.beforeEach("Login Page", async({page}) =>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await helper.visitpage("https://automationexercise.com/");
    await register.clickSignUp();
    await helper.urlAssertion("https://automationexercise.com/login");

});


test("Test the contact form", async({page}) =>{

    const contact = new ContactUsPage(page);
    const helper = new Helper(page);

    await contact.loginSignInAssertion("Contact us","/contact_us");
    await contact.clickContactUs();
    await helper.urlAssertion("https://automationexercise.com/contact_us");

    await contact.assertContactUsTitle("Contact Us");
    await contact.getInTouchAssertion("Get In Touch");

    await page.waitForTimeout(5000);

})