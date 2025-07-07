import { Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";


export class ContactUsPage{

    readonly page:Page;
    readonly helper:Helper;
    readonly contactusSelector: Locator;
    readonly contactUsTitleSelector: Locator;
    readonly getInTouchSelector: Locator;

    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page); 
        this.contactusSelector = page.locator('a[href="/contact_us"]');
        this.contactUsTitleSelector = page.locator('.col-sm-12 h2.title');
        this.getInTouchSelector = page.locator('.contact-form h2.title');


    }



    async loginSignInAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.contactusSelector,expectedText,expectedHref);
    }

    async clickContactUs(){
        await this.contactusSelector.click();
    }

    async assertContactUsTitle(expectedText: string){
        await this.helper.textAssertion(this.contactUsTitleSelector, expectedText);
    }

    async getInTouchAssertion(expectedText:string){
        await this.helper.textAssertion(this.getInTouchSelector, expectedText);
    }

}