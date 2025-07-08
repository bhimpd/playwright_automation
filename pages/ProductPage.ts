import { Page, expect, Locator } from "@playwright/test"
import { Helper } from "../helpers/helper";
import productInfo from "../fixtures/productDetails.json";


export class ProductPage{

    readonly page:Page;
    readonly helper:Helper;

    readonly productSelector:Locator;
    readonly allProductSelector:Locator;
    readonly imageSelector:Locator;
    readonly priceSelector:Locator;
    readonly nameSelector:Locator;



    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.productSelector = page.locator('a[href="/products"]');
        this.allProductSelector = page.locator('.features_items h2.title');
        this.imageSelector = page.locator('.single-products .productinfo img');
        this.priceSelector = page.locator('.single-products .productinfo h2');
        this.nameSelector = page.locator('.single-products .productinfo p');


    }

    async assertProducts(expectedText: string, expectedHref: string){
        await this.helper.assertLinkWithTextAndHrefAssertion(this.productSelector,expectedText,expectedHref);
    }

    async clickProductButton(){
        await this.productSelector.click();
    }

    async allProductsLabelAssertion(expectedText:string){
        await expect(this.allProductSelector).toHaveText(expectedText);
    }


    async assertProductInfo(){
        const expectedProducts = productInfo.products;
    
        for (let index = 0; index < expectedProducts.length; index++) {
            const product = expectedProducts[index];
    
            const image = this.imageSelector.nth(index);
            const price = this.priceSelector.nth(index);
            const name = this.nameSelector.nth(index);
    
            await expect(image).toHaveAttribute("src", product.src);
            await expect(price).toHaveText(`Rs. ${product.price}`);
            await expect(name).toHaveText(product.name);
        }
    }
    


}