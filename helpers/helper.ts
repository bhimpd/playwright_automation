import {Page, Locator, expect} from "@playwright/test";

export class Helper{
    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async visitpage(expectedUrl: string){
        await this.page.goto(expectedUrl);
    }

    async textAssertion(selector:Locator, text:string){
        await expect(selector).toHaveText(text);
    }

    async urlAssertion(url:string){
        await expect(this.page).toHaveURL(url);
    }
}