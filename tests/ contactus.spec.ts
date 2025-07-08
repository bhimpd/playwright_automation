import test, { expect } from "@playwright/test"
import { Helper } from "../helpers/helper";
import { ContactUsPage } from "../pages/ContactUsPage";
import { generateContactFormData } from "../helpers/faker"

test.beforeEach("Login Page", async({page}) =>{
    const helper = new Helper(page);

    await helper.visitpage("https://automationexercise.com/");

});


test("Test the contact form", async({page}) =>{

    const contact = new ContactUsPage(page);
    const helper = new Helper(page);
    const testData = generateContactFormData();

    await contact.loginSignInAssertion("Contact us","/contact_us");
    await contact.clickContactUs();
    await helper.urlAssertion("https://automationexercise.com/contact_us");

    await contact.assertContactUsTitle("Contact Us");
    await contact.getInTouchAssertion("Get In Touch");

    await contact.fillContact(testData,"test-images/test.png");

    await contact.assertDialogue();
    await page.waitForTimeout(4000);

    await contact.assertAndClickSubmitButton("Submit");
    await contact.assertSuccessMessage("Success! Your details have been submitted successfully.")

    await page.waitForTimeout(5000);

})