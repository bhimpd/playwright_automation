import { Page, expect, Locator } from "@playwright/test"
import { Helper } from "../helpers/helper";


export class ProductPage{

    readonly page:Page;
    readonly helper:Helper;

    readonly productSelector:Locator;

    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.productSelector = page.locator('a[href="/products"]');
    }

    async assertProducts(expectedText: string, expectedHref: string){
        await this.helper.assertLinkWithTextAndHrefAssertion(this.productSelector,expectedText,expectedHref);
    }

    async clickProductButton(){
        await this.productSelector.click();
    }

}