import { Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";


export class ContactUsPage{

    readonly page:Page;
    readonly helper:Helper;
    readonly contactusSelector: Locator;
    readonly contactUsTitleSelector: Locator;
    readonly getInTouchSelector: Locator;
    readonly nameSelector: Locator;
    readonly emailSelector: Locator;
    readonly subjectSelector: Locator;
    readonly messageSelector: Locator;

    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page); 
        this.contactusSelector = page.locator('a[href="/contact_us"]');
        this.contactUsTitleSelector = page.locator('.col-sm-12 h2.title');
        this.getInTouchSelector = page.locator('.contact-form h2.title');
        this.nameSelector = page.locator('input[data-qa="name"]');
        this.emailSelector = page.locator('input[data-qa="email"]');
        this.subjectSelector = page.locator('input[data-qa="subject"]');
        this.messageSelector = page.locator('textarea[data-qa="message"]');




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


    async fillName(exptectedname:string){
        await this.nameSelector.fill(exptectedname)
    }


    async fillEmail(exptectedemail:string){
        await this.emailSelector.fill(exptectedemail)
    }

    async fillSubject(exptectedsubject:string){
        await this.subjectSelector.fill(exptectedsubject)
    }

    async fillMessage(exptectedmessage:string){
        await this.messageSelector.fill(exptectedmessage)
    }

    async fillContact(data: { name: string; email: string; subject: string; message: string }) {
        await this.fillName(data.name);
        await this.fillEmail(data.email);
        await this.fillSubject(data.subject);
        await this.fillMessage(data.message);

    }
}