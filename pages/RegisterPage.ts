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


    async fillAccountInformation(){
        await this.titleSelector.click();
        await expect(this.signUpnameSelector).toHaveValue('Bhim');
        await expect(this.signUpemailSelector).toHaveValue('dreamypd73@gmail.com');
        await this.passwordSelector.fill("Password1!");
        await this.daySelector.selectOption({label:"1"});
        await this.monthSelector.selectOption({label:"January"});
        await this.yearSelector.selectOption({label:"2000"});
    }




}