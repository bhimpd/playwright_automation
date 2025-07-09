import test from "@playwright/test";
import { Helper } from "../helpers/helper";
import { ProductPage } from "../pages/ProductPage";


test.beforeEach("Login Page", async({page}) =>{
    
    const helper = new Helper(page);
    await helper.visitpage("https://automationexercise.com/");

});

test("Test the produdct src, price and name", async({page})=>{
    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    await product.allProductsLabelAssertion("All Products");
    await product.assertProductInfo();


});


test.only("Search the product and assert ", async({page})=>{

    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    await product.searchProduct();
    await product.clickSearch();

    await page.waitForTimeout(5000);


});