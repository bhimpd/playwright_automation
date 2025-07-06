import { Locator, Page,expect } from "@playwright/test";
import { Helper } from "../helpers/helper";

export class RegiserPage{
    readonly page:Page
    readonly helper:Helper;
    readonly signInOrLoginSelector:Locator;
    readonly loginAccountSelector:Locator;
    readonly signInUserSelector:Locator;
    readonly loginSelector:Locator;
    readonly signInSelector:Locator;
    readonly nameSelector:Locator;
    readonly emailSelector:Locator;
    readonly accountAndAddressInfoSelector:Locator;
    readonly titleSelector: Locator;
    readonly signUpnameSelector: Locator;
    readonly signUpemailSelector: Locator;
    readonly passwordSelector: Locator;
    readonly daySelector: Locator;
    readonly monthSelector: Locator;
    readonly yearSelector: Locator;
    readonly newsLetterSelector: Locator;
    readonly specialOfferSelector: Locator;

    readonly firstNameSelector: Locator;
    readonly lastNameSelector: Locator;
    readonly companySelector: Locator;
    readonly address1Selector: Locator;
    readonly address2Selector: Locator;
    readonly stateSelector: Locator;
    readonly citySelector: Locator;
    readonly zipcodeSelector: Locator;
    readonly mobileNumberSelector: Locator;
    readonly countrySelector: Locator;
    readonly createAccountSelector: Locator;
    readonly accountCreatedSelectcor: Locator;
    readonly continueButtonSelector: Locator;
    readonly deleteAccountSelector: Locator;
    readonly logoutSelector: Locator;
    readonly loginSignInSelector: Locator;
    readonly loginEmailAddressSelector: Locator;
    readonly loginPasswordSelector: Locator;
    readonly loginButtonSelector: Locator;




    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page); 
        this.signInOrLoginSelector = page.locator(".fa.fa-lock");
        this.loginAccountSelector = page.locator(".login-form h2");
        this.signInUserSelector = page.locator(".signup-form h2");
        this.loginSelector = page.locator("button[data-qa='login-button']");
        this.signInSelector = page.locator("button[data-qa='signup-button']");
        this.nameSelector = page.locator("input[data-qa='signup-name']");
        this.emailSelector = page.locator("input[data-qa='signup-email']");

        this.accountAndAddressInfoSelector = page.locator(".login-form h2.title.text-center");
        this.titleSelector = page.locator("#uniform-id_gender1");
        this.signUpnameSelector = page.locator("#name");
        this.signUpemailSelector = page.locator("#email");
        this.passwordSelector = page.locator("#password");
        this.daySelector = page.locator("#days");
        this.monthSelector = page.locator("#months");
        this.yearSelector = page.locator("#years");
        this.newsLetterSelector = page.locator("#newsletter");
        this.specialOfferSelector = page.locator("#optin");


        this.firstNameSelector = page.locator("#first_name");
        this.lastNameSelector = page.locator("#last_name");
        this.companySelector = page.locator("#company");
        this.address1Selector = page.locator("#address1");
        this.address2Selector = page.locator("#address2");
        this.stateSelector = page.locator("#state");
        this.citySelector = page.locator("#city");
        this.zipcodeSelector = page.locator("#zipcode");
        this.mobileNumberSelector = page.locator("#mobile_number");
        this.countrySelector = page.locator("#country");
        this.createAccountSelector = page.locator("button[data-qa='create-account']");
        this.accountCreatedSelectcor = page.locator("h2[data-qa='account-created']");
        this.continueButtonSelector = page.locator("a[data-qa='continue-button']");


        this.deleteAccountSelector = page.locator('a[href="/delete_account"]');
        this.logoutSelector = page.locator('a[href="/logout"]');
        this.loginSignInSelector = page.locator('a[href="/login"]');
        this.loginEmailAddressSelector = page.locator('input[data-qa="login-email"]');
        this.loginPasswordSelector = page.locator('input[data-qa="login-password"]');
        this.loginButtonSelector = page.locator('button[data-qa="login-button"]');


    }

    async clickSignUp(){
        await this.signInOrLoginSelector.click();
    }

    async assertLoginAccountLabel(expectedtext:string){
        await this.helper.textAssertion(this.loginAccountSelector,expectedtext)
    }

    async assertSignInUserLabel(expectedtext:string){
        await this.helper.textAssertion(this.signInUserSelector,expectedtext)
    }

    async assertLoginLabel(expectedtext:string){
        await this.helper.textAssertion(this.loginSelector,expectedtext)
    }

    async assertSignInLabel(expectedtext:string){
        await this.helper.textAssertion(this.signInSelector,expectedtext)
    }

    async fillname(expectedname:string){
        await this.nameSelector.fill(expectedname);
    }

    async fillemail(expectedemail:string){
        await this.emailSelector.fill(expectedemail);
    }

    async clickSignIn(){
        await this.signInSelector.click();
    }

    async assertAccountAndAddressLabel(index: number, expectedText: string) {
        await expect(this.accountAndAddressInfoSelector.nth(index)).toHaveText(expectedText);
    }


    async fillAccountInformation(expectedemail:string,expectedPassword: string){
        await this.titleSelector.click();
        console.log(`Using email: ${expectedemail}`);

        await expect(this.signUpnameSelector).toHaveValue('Bhim');
        await expect(this.signUpemailSelector).toHaveValue(expectedemail);
        await this.passwordSelector.fill(expectedPassword);
        await this.daySelector.selectOption({label:"1"});
        await this.monthSelector.selectOption({label:"January"});
        await this.yearSelector.selectOption({label:"2000"});
        await this.newsLetterSelector.check();
        await expect(this.newsLetterSelector).toBeChecked();
        await this.specialOfferSelector.check();
        await expect(this.specialOfferSelector).toBeChecked();
    }

    async fillAddressInformation(){
        await this.firstNameSelector.fill("Bhim");
        await this.lastNameSelector.fill("Lamichhane");
        await this.companySelector.fill("Test Company");
        await this.address1Selector.fill("Kalika Margh 25, Sanepa");
        await this.address2Selector.fill("Lalitpur");
        await this.countrySelector.selectOption({label:"United States"});
        await this.stateSelector.fill("Provience 4");
        await this.citySelector.fill("Balen City");
        await this.zipcodeSelector.fill("6969");
        await this.mobileNumberSelector.fill("+977-9814412345");
        await expect(this.createAccountSelector).toHaveText("Create Account");
        await this.createAccountSelector.click();
    }

    async accountCreatedLabelAssertion(expectedText:string){
        await expect(this.accountCreatedSelectcor).toHaveText(expectedText);
    }

    async continueButtonAssertionAndClick(expectedText:string){
        await expect(this.continueButtonSelector).toHaveText(expectedText);
        await this.continueButtonSelector.click();
    }

    async logoutAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.logoutSelector,expectedText,expectedHref);
    }

    async deleteAccountAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.deleteAccountSelector,expectedText,expectedHref);
    }

    async clickLogOutButton(){
        await this.logoutSelector.click();
    }

    async loginSignInAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.loginSignInSelector,expectedText,expectedHref);
    }

    async login(email: string, password: string) {
        await this.loginEmailAddressSelector.fill(email);
        await this.loginPasswordSelector.fill(password);
        await this.loginButtonSelector.click();
    }
    


}
