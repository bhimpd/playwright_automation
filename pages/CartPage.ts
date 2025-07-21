import {Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";
import { faker } from '@faker-js/faker';


export class CartPage{
    readonly page:Page;
    readonly helper:Helper;

    readonly addressLabelSelector:Locator;
    readonly deliveryAddressLabelSelector:Locator;
    readonly billingAddressLabelSelector:Locator;
    readonly orderMessageLabelSelector: Locator;
    readonly orderTextAreaSelector: Locator;



    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);

        this.addressLabelSelector = page.locator(".step-one h2.heading");
        this.deliveryAddressLabelSelector = page.locator("#address_delivery .page-subheading");
        this.billingAddressLabelSelector = page.locator("#address_invoice .page-subheading");
        this.orderMessageLabelSelector = page.locator("#ordermsg label");
        this.orderTextAreaSelector = page.locator("#ordermsg textarea");


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

}