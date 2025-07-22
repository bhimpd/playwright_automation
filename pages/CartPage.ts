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
    readonly addressSelector: Locator;
    readonly fullAddressSelector: Locator;
    readonly countrySelector: Locator;
    readonly phoneSelector: Locator;


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
        this.addressSelector = page.locator('#address_delivery .address_address1.address_address2');
        this.fullAddressSelector = page.locator('#address_delivery .address_city.address_state_name.address_postcode"');
        this.countrySelector = page.locator('#address_delivery .address_country_name');
        this.phoneSelector = page.locator('#address_delivery .address_phone');

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


    async deliveryAddressInfo(expecteddata: UserDetails) {
        const addr = expecteddata.address;
      
        await expect(this.firstLastNameSelector).toContainText(`${addr.firstName} ${addr.lastName}`);
        await expect(this.addressSelector).toContainText(`${addr.address1} ${addr.address2}`);
        await expect(this.fullAddressSelector).toContainText(`${addr.city} ${addr.state} ${addr.zipcode}`);
        await expect(this.countrySelector).toContainText(addr.country);
        await expect(this.phoneSelector).toContainText(addr.mobile);
      }

}