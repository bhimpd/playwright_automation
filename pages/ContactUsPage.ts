import { Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";


export class ContactUsPage{

    readonly page:Page;
    readonly helper:Helper;
    readonly contactusSelector: Locator;

    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page); 
        this.contactusSelector = page.locator('a[href="/contact_us"]');
    }



    async loginSignInAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.contactusSelector,expectedText,expectedHref);
    }

    async clickContactUs(){
        await this.contactusSelector.click();
    }

}