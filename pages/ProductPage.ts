import { Page, expect, Locator } from "@playwright/test"
import { Helper } from "../helpers/helper";
import productInfo from "../fixtures/productDetails.json";
import categoryAndBrand from "../fixtures/categoriesBand.json";
import table from "../fixtures/tableHeadColum.json";



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
    readonly subCategoryLabelSelector: Locator;
    readonly brandLabelSelector: Locator;
    readonly brandQuantitySelector: Locator;
    readonly productWrapperSelector: Locator;
    readonly classModalSelector: Locator;
    readonly viewCartSelector: Locator;
    readonly modalAddedLabelSelector: Locator;
    readonly modalBodyLabelSelector: Locator;
    readonly tableHeadersColumnsSelectors: Locator;
    readonly cartPageNameSelectors: Locator;
    readonly cartPagePriceSelectors: Locator;
    readonly cartPageQuantitySelectors: Locator;
    readonly cartPageTotalSelectors: Locator;
    readonly detailPageImageSelector: Locator;
    readonly detailPageNameSelector: Locator;
    readonly detailPagePriceSelector: Locator;
    readonly detailPageQuantityLabelSelector: Locator;
    readonly detailPageAddToCartLabelSelector: Locator;
    readonly detailPageQuantitySelector: Locator;


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
        this.subCategoryLabelSelector = page.locator(".panel-body ul li a");
        this.brandLabelSelector = page.locator(".brands-name ul li a");
        this.brandQuantitySelector = page.locator(".brands-name ul li a .pull-right");
        this.productWrapperSelector = page.locator('.product-image-wrapper');
        this.classModalSelector = page.locator('.close-modal[data-dismiss="modal"]');
        this.viewCartSelector = page.locator('a[href="/view_cart"] u');
        this.modalAddedLabelSelector = page.locator('.modal-header h4.modal-title.w-100');
        this.modalBodyLabelSelector = page.locator('.modal-body p.text-center');
        this.tableHeadersColumnsSelectors = page.locator('thead tr.cart_menu td');

        this.cartPageNameSelectors = page.locator('.cart_description h4 a');
        this.cartPagePriceSelectors = page.locator('.cart_price p');
        this.cartPageQuantitySelectors = page.locator('.cart_quantity button');
        this.cartPageTotalSelectors = page.locator('.cart_total_price');

        this.detailPageImageSelector = page.locator('.product-details .view-product img');
        this.detailPageNameSelector = page.locator('.product-details .product-information h2');
        this.detailPagePriceSelector = page.locator('.product-details .product-information span span');

        this.detailPageQuantityLabelSelector = page.locator('.product-details .product-information span label');
        this.detailPageAddToCartLabelSelector = page.locator('.product-details .product-information span .btn.btn-default.cart');
        this.detailPageQuantitySelector = page.locator('#quantity');


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
        const categories = categoryAndBrand.categories;
        console.log("Categories Lists :: ",categories);

        const parentCategoryLength = categories.length;
        console.log("Total category : ",parentCategoryLength);

        for(let  i = 0; i < parentCategoryLength; i++){
            const parentCategory = categories[i];

            const parentCategoryName = this.parentCategoryLabelSelector.nth(i);

            await expect(parentCategoryName).toHaveText(parentCategory.name);
            console.log("Parent Category Index N Name::: ",parentCategoryName ," ::",parentCategory.name)

        }
    }


    async subCategoryNameAndLinkAssertion() {
        const categories = categoryAndBrand.categories;
    
        const parentCategories = this.parentCategoryLabelSelector;
    
        const parentCount = await parentCategories.count();
    
        for (let i = 0; i < parentCount; i++) {
            const parentCategory = categories[i];
    
            // Click to expand the current parent category
            const parentCategoryLink = parentCategories.nth(i);
            await parentCategoryLink.click();
    
            // Wait for the subcategory section to expand (based on its ID from href="#Women" etc.)
            const href = await parentCategoryLink.getAttribute("href"); // e.g., "#Women"
            if (!href) continue;
    
            const panelId = href.replace("#", ""); // e.g., "Women"
            const subcategorySection = this.page.locator(`#${panelId}.panel-collapse`);
    
            await expect(subcategorySection).toHaveClass(/in|show/); // Wait until expanded
    
            // Locate only subcategories inside this expanded section
            const subCategoriesLocator = subcategorySection.locator("ul li a");
            const subcategoriesFromJson = parentCategory.subcategories;
    
            for (let j = 0; j < subcategoriesFromJson.length; j++) {
                const expectedSubCategory = subcategoriesFromJson[j];
                const subCategoryElement = subCategoriesLocator.nth(j);
    
                await expect(subCategoryElement).toHaveText(expectedSubCategory.name);
                const actualHref = await subCategoryElement.getAttribute('href');
                expect(actualHref).toBe(expectedSubCategory.href);
            }
        }
    }
    

    async branNameQuantityHrefAssertion(){
        const brands = categoryAndBrand.brands;

        const length =  brands.length;

        for(let i=0; i<length; i++){
            const brand =brands[i];
            const brandName =  this.brandLabelSelector.nth(i);
            await expect(brandName).toContainText(brand.name);
           
            const brandQuantity = this.brandQuantitySelector.nth(i);
            await expect(brandQuantity).toContainText(brand.quantity);

            const brandHref = await this.brandLabelSelector.nth(i).getAttribute("href");
            expect(brandHref).toBe(brand.href);
            // await this.page.waitForTimeout(2000);
        }
    }


    async addProductToCart(clickViewCartInsteadOfContinue: boolean = false):Promise<any> {
        const count = await this.productWrapperSelector.count();
        const randomIndex = Math.floor(Math.random() * count);
    
        const selectedProduct = this.productWrapperSelector.nth(randomIndex);
    
        // Hover to make the overlay appear if needed
        await selectedProduct.hover();
    
        const name = await selectedProduct.locator('.productinfo p').textContent();
        const price = await selectedProduct.locator('.productinfo h2').textContent();
    
        const addToCartBtn = selectedProduct.locator('.add-to-cart').first();
        await addToCartBtn.click();
    
        await this.assertContinueShoppingLabel("Continue Shopping");
        await this.assertModalAddedLabel("Added!");
        await this.assertModalBodyLabel("Your product has been added to cart.");
        // await th Products", "/productsis.page.waitForTimeout(4000);
    
        if (clickViewCartInsteadOfContinue) {
            await this.assertViewCartLabel("View Cart");
            await this.clickViewCart();
            // await this.page.waitForTimeout(4000);

        } else {
            await this.clickContinueShopping();
        }

    
        console.log(`✅ Added random product at index ${randomIndex} to cart`);
        console.log("NAME :::", name);
        console.log("PRICE :::", price);
        return { name, price };
    }
    

    async assertModalAddedLabel(expectedText:string){
        await expect(this.modalAddedLabelSelector).toContainText(expectedText);
    }


    async assertModalBodyLabel(expectedText: string) {
        await expect(this.modalBodyLabelSelector.filter({ hasText: expectedText })).toHaveText(expectedText);
    }
    

    async assertContinueShoppingLabel(expectedText:string){
        await expect(this.classModalSelector).toHaveText(expectedText);
    }

    async clickContinueShopping(){
        await this.classModalSelector.click();
    }


    async assertViewCartLabel(expectedText:string){
        await expect(this.viewCartSelector).toHaveText(expectedText);
    }

    async clickViewCart(){
        await this.viewCartSelector.click();
    }


    async assertTableHeaders() {
        const expectedHeaders = table.tableColumns;
    
        const headerLocators = this.tableHeadersColumnsSelectors;
    
        for (let i = 0; i < expectedHeaders.length; i++) {
            const headerText = (await headerLocators.nth(i).textContent())?.trim().toLowerCase();
            const expectedText = expectedHeaders[i].trim().toLowerCase();
    
            expect(headerText).toBe(expectedText);
            console.log(`✅ Header matched: ${expectedText}`);
        }
    }
    
    async assertCartItems(expectedItems: { name: string; price: string }[]) {
        const count = await this.cartPageNameSelectors.count();
        expect(count).toBe(expectedItems.length);
    
        for (let i = 0; i < count; i++) {
            const name = await this.cartPageNameSelectors.nth(i).textContent();
            const price = await this.cartPagePriceSelectors.nth(i).textContent();
            const quantity = await this.cartPageQuantitySelectors.nth(i).textContent();
            const total = await this.cartPageTotalSelectors.nth(i).textContent();
    
            const expected = expectedItems[i];
    
            expect(name?.trim()).toBe(expected.name?.trim());
            expect(price?.trim()).toBe(expected.price?.trim());
    
            const priceNum = parseInt(price!.replace(/[^\d]/g, ""));
            const quantityNum = parseInt(quantity!);
            const totalNum = parseInt(total!.replace(/[^\d]/g, ""));
    
            expect(totalNum).toBe(priceNum * quantityNum);
    
            console.log(`✅ Cart item ${i + 1} validated: ${name}, ${price}, Qty: ${quantity}, Total: ${total}`);
        }
    }


    async assertDetailPageProduct(searchedProduct:any){

        await expect(this.detailPageNameSelector).toHaveText(searchedProduct.name);
        await expect(this.detailPagePriceSelector).toHaveText(`Rs. ${searchedProduct.price}`);
        await expect(this.detailPageImageSelector).toHaveAttribute("src", searchedProduct.src);

    }


    async assertDetailPageQuantityLabel(expectedText: string){
        await expect(this.detailPageQuantityLabelSelector).toHaveText(expectedText);
    }


    async assertDetailPageAddToCartLabel(expectedText: string){
        await expect(this.detailPageAddToCartLabelSelector).toContainText(expectedText);
    }
    
    async typeQuantityToAdd(){
        await this.detailPageQuantitySelector.fill("4");
    }

    async clickDetailPageAddToCartLabel(){
        await this.detailPageAddToCartLabelSelector.click();
    }
    

    async assertDetailPageCartItems(expectedItem: {
        name: string;
        price: number;
        quantity: number;
      }) {
        // Assert only one row exists
        const rows = this.page.locator('tbody tr');
        const count = await rows.count();
        expect(count).toBe(1); // since we expect only one product
      
        // Directly use your selectors (since they're already defined)
        const name = await this.cartPageNameSelectors.textContent();
        const price = await this.cartPagePriceSelectors.textContent();
        const quantity = await this.cartPageQuantitySelectors.textContent();
        const total = await this.cartPageTotalSelectors.textContent();
      
        // Assertions
        expect(name?.trim()).toBe(expectedItem.name);
        expect(price?.replace(/\s|Rs\./g, '')).toBe(expectedItem.price.toString());
        expect(quantity?.trim()).toBe(expectedItem.quantity.toString());
      
        const totalValue = parseInt(total!.replace(/[^\d]/g, ''));
        expect(totalValue).toBe(expectedItem.price * expectedItem.quantity);
      
        console.log(`✅ Cart item validated: ${name}, ${price}, Qty: ${quantity}, Total: ${total}`);
      }
      


}