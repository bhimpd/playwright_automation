import { Locator, Page } from "@playwright/test";

export class RegiserPage{
    readonly page:Page
    readonly signInLocator:Locator;

    constructor(page:Page){
        this.page=page;
        this.signInLocator= page.locator(".fa.fa-lock");
    }

    async clickSignUp(){
        await this.signInLocator.click();
    }

}