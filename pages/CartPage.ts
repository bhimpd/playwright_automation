import {Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";
import { UserDetails } from "../utilis/userDetails"; // ✅ Make sure to import the type


export class CartPage{
    readonly page:Page;
    readonly helper:Helper;

    readonly addressLabelSelector:Locator;
    readonly deliveryAddressLabelSelector:Locator;
    readonly billingAddressLabelSelector:Locator;
    readonly orderMessageLabelSelector: Locator;
    readonly orderTextAreaSelector: Locator;
    readonly placeOrderSelector: Locator;
    readonly firstLastNameSelector: Locator;
    readonly companySelector: Locator;
    readonly streetSelector: Locator;
    readonly districtSelector: Locator;
    readonly fullAddressSelector: Locator;
    readonly countrySelector: Locator;
    readonly phoneSelector: Locator;
    readonly nameOnCardLabelSelector: Locator;
    readonly cardNumberLabelSelector: Locator;
    readonly CVCLabelSelector: Locator;
    readonly expirationLabelSelector: Locator;
    readonly payAndConfirmOrderLabelSelector: Locator;

    readonly nameOnCardInputSelector:Locator;
    readonly cardNumberInputSelector:Locator;
    readonly cvcInputSelector:Locator;
    readonly cvcMonthnputSelector:Locator;
    readonly cvcYearInputSelector:Locator;


    readonly orderPlacedSelector: Locator;
    readonly congratulationLabelSelector: Locator;



    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);

        this.addressLabelSelector = page.locator(".step-one h2.heading");
        this.deliveryAddressLabelSelector = page.locator("#address_delivery .page-subheading");
        this.billingAddressLabelSelector = page.locator("#address_invoice .page-subheading");
        this.orderMessageLabelSelector = page.locator("#ordermsg label");
        this.orderTextAreaSelector = page.locator("#ordermsg textarea");
        this.placeOrderSelector = page.locator('a[href="/payment"]');
        this.firstLastNameSelector = page.locator('#address_delivery .address_firstname.address_lastname');
        this.companySelector = page.locator('#address_delivery .address_address1.address_address2').nth(0);
        this.streetSelector = page.locator('#address_delivery .address_address1.address_address2').nth(1);
        this.districtSelector = page.locator('#address_delivery .address_address1.address_address2').nth(2);
        this.fullAddressSelector = page.locator('#address_delivery .address_city.address_state_name.address_postcode');
        this.countrySelector = page.locator('#address_delivery .address_country_name');
        this.phoneSelector = page.locator('#address_delivery .address_phone');


        this.nameOnCardLabelSelector = page.locator('#payment-form .control-label').nth(0);
        this.cardNumberLabelSelector = page.locator('#payment-form .card .control-label');
        this.CVCLabelSelector = page.locator('#payment-form .cvc .control-label');
        this.expirationLabelSelector = page.locator('#payment-form .control-label').nth(3);
        this.payAndConfirmOrderLabelSelector = page.locator('#submit');


        this.nameOnCardInputSelector = page.locator('input[name="name_on_card"]');
        this.cardNumberInputSelector = page.locator('input[name="card_number"]');
        this.cvcInputSelector = page.locator('input[name="cvc"]');
        this.cvcMonthnputSelector = page.locator('input[name="expiry_month"]');
        this.cvcYearInputSelector = page.locator('input[name="expiry_year"]');

        this.orderPlacedSelector = page.locator('h2[data-qa="order-placed"]');
        this.congratulationLabelSelector = page.locator('p[style="font-size: 20px; font-family: garamond;"]');

    }

    async assertAddressDetailsLabel(expectedText:string){
        await expect(this.addressLabelSelector.filter({ hasText: expectedText })).toHaveText(expectedText);
    }

    async assertReviewOrderLabel(expectedText:string){
        await expect(this.addressLabelSelector.filter({ hasText: expectedText })).toHaveText(expectedText);
    }


    async assertDeliveryAddressLabel(expectedText:string){
        await expect(this.deliveryAddressLabelSelector).toHaveText(expectedText);
    }

    async assertBillinAddressLabel(expectedText:string){
        await expect(this.billingAddressLabelSelector).toHaveText(expectedText);
    }

    async assertOrderMessageText(expectedText:string){
        await expect(this.orderMessageLabelSelector).toHaveText(expectedText);
    }

    async typeOrderMessage(expectedText:string){
        await this.orderTextAreaSelector.fill(expectedText);
    }

    async placeOrderAssertion(expectedText: string, expectedHref: string) {
        await this.helper.assertLinkWithTextAndHrefAssertion(this.placeOrderSelector,expectedText,expectedHref);
    }

    async clickPlaceOrderButton() {
        await this.placeOrderSelector.click();
    }


    async deliveryAddressInfo(expecteddata: UserDetails) {
        const addr = expecteddata.address;
      
        await expect(this.firstLastNameSelector).toContainText(`${addr.firstName} ${addr.lastName}`);
        await expect(this.companySelector).toContainText(addr.company);
        await expect(this.streetSelector).toContainText(addr.address1);
        await expect(this.districtSelector).toContainText(addr.address2);
        await expect(this.fullAddressSelector).toContainText(`${addr.city} ${addr.state} ${addr.zipcode}`);
        await expect(this.countrySelector).toContainText(addr.country);
        await expect(this.phoneSelector).toContainText(addr.mobile);
      }

    async nameOnCardLabelAssertion(expectedText:string){
        await this.helper.textAssertion(this.nameOnCardLabelSelector, expectedText);
    }


    async cardNumberLabelAssertion(expectedText:string){
        await expect(this.cardNumberLabelSelector).toHaveText(expectedText); 
    }

    async cvcLabelAssertion(expectedText:string){
        await expect(this.CVCLabelSelector).toHaveText(expectedText); 
    }

    async expirationLabelAssertion(expectedText:string){
        await expect(this.expirationLabelSelector).toHaveText(expectedText); 
    }

    async payConfirmOrderLabelAssertion(expectedText:string){
        await expect(this.payAndConfirmOrderLabelSelector).toHaveText(expectedText); 
    }

    async fillPaymentDetails(){
        await this.nameOnCardInputSelector.fill("Bhim");
        await this.cardNumberInputSelector.fill("4242 4242 4242 4242");
        await this.cvcInputSelector.fill("123");
        await this.cvcMonthnputSelector.fill("July");
        await this.cvcYearInputSelector.fill("2025");
    }


    async clickPayAndConfirmButton() {
        await this.payAndConfirmOrderLabelSelector.click();
    }


    async assertOrderPlacedText(expectedText:string){
        await expect(this.orderPlacedSelector).toContainText(expectedText);
    }

    async assertCongratulationText(expectedText:string){
        await expect(this.congratulationLabelSelector).toContainText(expectedText);
    }
    
}