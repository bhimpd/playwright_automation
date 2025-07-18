import test from "@playwright/test";
import { Helper } from "../helpers/helper";
import { ProductPage } from "../pages/ProductPage";
import { RegiserPage } from "../pages/RegisterPage";
import { saveCredentials, getCredentials} from "../utilis/userData";


test.beforeEach( async({page}) =>{
    
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


test("Search the product and assert ", async({page})=>{

    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    const searchedProduct =  await product.searchProduct();
    await product.clickSearch();

    // console.log("Searched Product :: ", searchedProduct);

    await product.scrollToSection();
    await page.waitForTimeout(2000);

    await product.assertSearchedProduct(searchedProduct);

    await page.waitForTimeout(5000);


});


test("Assert the Category Names", async({page})=>{
    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");
    await product.scrollToCategory();

    await product.allProductsLabelAssertion("All Products");
    await product.categoryLabelAssertion("Category");
    await product.parentCategoryLabelAssertion();

    await page.waitForTimeout(5000);

});


test("Assert the Sub Category Names and Links", async({page})=>{
    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");
    await product.scrollToCategory();

    await product.allProductsLabelAssertion("All Products");
    await product.categoryLabelAssertion("Category");

    await product.subCategoryNameAndLinkAssertion();

    // await page.waitForTimeout(5000);

});


test("Assert the BrandNames and Links", async({page})=>{
    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");
    await product.scrollToCategory();

    await product.allProductsLabelAssertion("All Products");
    await product.categoryLabelAssertion("Category");
    await product.branNameQuantityHrefAssertion();


    // await page.waitForTimeout(5000);

});

test("Add the Product to the cart", async({page})=>{
    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    let product1 = await product.addProductToCart();
    let product2 =  await product.addProductToCart(true);;

    console.log("Product 1::",product1);
    console.log("Product 2::",product2);

    await helper.urlAssertion("https://automationexercise.com/view_cart");

    await product.assertTableHeaders();

    await product.assertCartItems([product1, product2]);



    await page.waitForTimeout(5000);

});

test("Assert the product quantity", async({page})=>{

    const helper = new Helper(page);
    const product = new ProductPage(page);

    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    const searchedProduct =  await product.searchProduct();
    await product.clickSearch();

    // console.log("Searched Product :: ", searchedProduct);

    await product.scrollToSection();
    await product.assertSearchedProduct(searchedProduct);

    await product.clickViewProductButton();

    await product.assertDetailPageProduct(searchedProduct);
    await product.assertDetailPageQuantityLabel("Quantity:");
    await product.assertDetailPageAddToCartLabel(" Add to cart ");
    await product.typeQuantityToAdd();
    await product.clickDetailPageAddToCartLabel();

    await product.assertModalAddedLabel("Added!");
    await product.assertModalBodyLabel("Your product has been added to cart.");
    await product.assertViewCartLabel("View Cart");
    await product.clickViewCart();

    await helper.urlAssertion("https://automationexercise.com/view_cart");
    await product.assertTableHeaders();


    console.log("Added Product to Cart ::", searchedProduct);
    await product.assertDetailPageCartItems(
        {
          name: searchedProduct.name,
          price: searchedProduct.price,
          quantity: 4,
        }
      );

    await page.waitForTimeout(5000);


});


test.only("Place Order -- Login while Order the Product", async({page})=>{

    const helper = new Helper(page);
    const product = new ProductPage(page);
    const register = new RegiserPage(page);

    const { email, password } = getCredentials(); // 👈 Read saved email & password


    await product.assertProducts(" Products", "/products");
    await product.clickProductButton();
    await helper.urlAssertion("https://automationexercise.com/products");

    const searchedProduct =  await product.searchProduct();
    await product.clickSearch();

    // console.log("Searched Product :: ", searchedProduct);

    await product.scrollToSection();
    await product.assertSearchedProduct(searchedProduct);

    await product.clickViewProductButton();

    await product.assertDetailPageProduct(searchedProduct);
    await product.assertDetailPageQuantityLabel("Quantity:");
    await product.assertDetailPageAddToCartLabel(" Add to cart ");
    await product.typeQuantityToAdd();
    await product.clickDetailPageAddToCartLabel();

    await product.assertModalAddedLabel("Added!");
    await product.assertModalBodyLabel("Your product has been added to cart.");
    await product.assertViewCartLabel("View Cart");
    await product.clickViewCart();

    await helper.urlAssertion("https://automationexercise.com/view_cart");
    await product.assertTableHeaders();


    console.log("Added Product to Cart ::", searchedProduct);
    await product.assertDetailPageCartItems(
        {
          name: searchedProduct.name,
          price: searchedProduct.price,
          quantity: 4,
        }
      );

    await page.waitForTimeout(1000);

    await product.assertProceedToCheckoutLabel("Proceed To Checkout");
    await product.clickProceedToCheckout();

    await product.assertCheckoutLabel("Checkout");
    await product.assertRegisterLoginText("Register / Login account to proceed on checkout.");
    await product.assertRegisterLoginLinkText("Register / Login");
    await product.assertContinueOnCartLabel("Continue On Cart");

    await product.clickRegisterLoginButton();
    await helper.urlAssertion("https://automationexercise.com/login");
    await register.login(email, password); 

    await product.clickViewCart();



    await page.waitForTimeout(5000);


});