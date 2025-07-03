import { Locator, Page } from "@playwright/test";
import { Helper } from "../helpers/helper";

export class RegiserPage{
    readonly page:Page
    readonly helper:Helper;
    readonly signInOrLoginSelector:Locator;
    readonly loginAccountSelector:Locator;
    readonly signInUserSelector:Locator;
    readonly loginSelector:Locator;
    readonly signInSelector:Locator;


    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page); 
        this.signInOrLoginSelector = page.locator(".fa.fa-lock");
        this.loginAccountSelector = page.locator(".login-form h2");
        this.signInUserSelector = page.locator(".signup-form h2");
        this.loginSelector = page.locator("button[data-qa='login-button']");
        this.signInSelector = page.locator("button[data-qa='signup-button']");

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

}