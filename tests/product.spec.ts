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

    await page.waitForTimeout(5000);

});