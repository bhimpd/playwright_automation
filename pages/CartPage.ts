import {Page, Locator, expect} from "@playwright/test";
import { Helper } from "../helpers/helper";

export class CartPage{
    readonly page:Page;
    readonly helper:Helper;

    readonly addressLabelSelector:Locator;
    readonly deliveryAddressLabelSelector:Locator;
    readonly billingAddressLabelSelector:Locator;



    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);

        this.addressLabelSelector = page.locator(".step-one h2.heading");
        this.deliveryAddressLabelSelector = page.locator("#address_delivery .page-subheading");
        this.billingAddressLabelSelector = page.locator("#address_invoice .page-subheading");


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


}