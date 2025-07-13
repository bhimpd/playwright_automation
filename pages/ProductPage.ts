import { Page, expect, Locator } from "@playwright/test"
import { Helper } from "../helpers/helper";
import productInfo from "../fixtures/productDetails.json";
import categoryAndBrand from "../fixtures/categoriesBand.json"


export class ProductPage{

    readonly page:Page;
    readonly helper:Helper;

    readonly productSelector:Locator;
    readonly allProductSelector:Locator;
    readonly imageSelector:Locator;
    readonly priceSelector:Locator;
    readonly nameSelector:Locator;
    readonly viewProductButtonSelector: Locator;
    readonly searchInputSelector: Locator;
    readonly submitSearchSelector: Locator;
    readonly sectionContainerSelector: Locator;
    readonly categoryLabelSelector: Locator;
    readonly footerSectionSelector: Locator;
    readonly parentCategoryLabelSelector: Locator;





    constructor(page:Page){
        this.page = page;
        this.helper = new Helper(page);
        this.productSelector = page.locator('a[href="/products"]');
        this.allProductSelector = page.locator('.features_items h2.title');
        this.imageSelector = page.locator('.single-products .productinfo img');
        this.priceSelector = page.locator('.single-products .productinfo h2');
        this.nameSelector = page.locator('.single-products .productinfo p');
        this.viewProductButtonSelector = page.locator('.choose ul.nav.nav-pills');
        this.searchInputSelector = page.locator('#search_product');
        this.submitSearchSelector = page.locator("#submit_search");
        this.sectionContainerSelector = page.locator(".features_items");
        this.categoryLabelSelector = page.locator(".left-sidebar h2").first();
        this.footerSectionSelector = page.locator("#footer");
        this.parentCategoryLabelSelector = page.locator(".panel-heading a");


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


    async clickViewProductButton(){
        await this.viewProductButtonSelector.click();
    }


    async assertProductInfo(){

        const expectedProducts = productInfo.products;
        const renderedProductCount = await this.viewProductButtonSelector.count();

        console.log("Number of Expected Products::: ",renderedProductCount);

        for (let index = 0; index < renderedProductCount; index++) {
            const product = expectedProducts[index];
    
            const image = this.imageSelector.nth(index);
            const price = this.priceSelector.nth(index);
            const name = this.nameSelector.nth(index);
            const viewProductLink = this.viewProductButtonSelector.nth(index);

    
            await expect(image).toHaveAttribute("src", product.src);
            await expect(price).toHaveText(`Rs. ${product.price}`);
            await expect(name).toHaveText(product.name);

            await viewProductLink.click();

            await expect(this.page).toHaveURL(`https://automationexercise.com${product.href}`);
            await this.page.goBack({ waitUntil: 'domcontentloaded' });

        }
    }


    async searchProduct(){
        const expectedProducts = productInfo.products;
        const length = expectedProducts.length;

        // Pick a random product
        const randomIndex = Math.floor(Math.random() * length);
        const product = expectedProducts[randomIndex];

        // Fill the search input and click search
        await this.searchInputSelector.fill(product.name);

        return product;

    }

    async clickSearch(){
        await this.submitSearchSelector.click();
    }

    async scrollToSection(){
        await this.sectionContainerSelector.scrollIntoViewIfNeeded();

    }

    async assertSearchedProduct(searchedProduct:any){

        console.log("Here Searched Product::: ",searchedProduct);
        await expect(this.nameSelector).toHaveText(searchedProduct.name);
        await expect(this.priceSelector).toHaveText(`Rs. ${searchedProduct.price}`);
        await expect(this.imageSelector).toHaveAttribute("src", searchedProduct.src);

    }

    async categoryLabelAssertion(expectedText:string){
        await expect(this.categoryLabelSelector).toHaveText(expectedText);
    }

    async scrollToCategory(){
        await this.categoryLabelSelector.scrollIntoViewIfNeeded();

    }

    async parentCategoryLabelAssertion(){
        const parentCategories = categoryAndBrand.categories;
        console.log("Parent Category Lists :: ",parentCategories);

        const parentCategoryLength = parentCategories.length;
        console.log("Total category : ",parentCategoryLength);

        for(let  i = 0; i < parentCategoryLength; i++){
            const parentCategory = parentCategories[i];

            const parentCategoryName = this.parentCategoryLabelSelector.nth(i);

            await expect(parentCategoryName).toHaveText(parentCategory.name);
            console.log("Parent Category Index N Name::: ",parentCategoryName ," ::",parentCategory.name)

        }
    }


}