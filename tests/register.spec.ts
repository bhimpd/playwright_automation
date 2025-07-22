import { test } from "@playwright/test";
import { Helper } from "../helpers/helper";
import { RegiserPage } from "../pages/RegisterPage";
import { faker } from '@faker-js/faker';
import { saveCredentials, getCredentials} from "../utilis/userData";
import { saveUserDetails } from "../utilis/userDetails";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { getUserDetails } from "../utilis/userDetails";



test.beforeEach(async({page}) =>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await helper.visitpage("https://automationexercise.com/");
    await register.clickSignUp();
    await helper.urlAssertion("https://automationexercise.com/login");

});


test("Should assert Text in Auth Page", async({page})=>{
    const helper = new Helper(page);
    const register = new RegiserPage(page);

    await register.assertLoginAccountLabel("Login to your account");
    await register.assertSignInUserLabel("New User Signup!");
    await register.assertLoginLabel("Login");
    await register.assertSignInLabel("Signup");

    await page.waitForTimeout(5000);
});


test.describe.serial("Register and Login Flow", () => {

    test("Should fill the input,click Sign and Assert the text in Register Page and Register the User", async({page})=>{
        const helper = new Helper(page);
        const register = new RegiserPage(page);

        const randomEmail = `dreamypd73+${faker.string.alphanumeric(6)}@gmail.com`;
        const password ="Password1!"
        saveCredentials(randomEmail,password);
        
        await register.fillname("Bhim");
        await register.fillemail(randomEmail);

        register.clickSignIn();
        await helper.urlAssertion("https://automationexercise.com/signup");
        
        await register.assertAccountAndAddressLabel(0,"Enter Account Information");
        await register.assertAccountAndAddressLabel(1,"Address Information");

        await register.fillAccountInformation(randomEmail,password);
        await register.fillAddressInformation();
        saveUserDetails({
            name: "Bhim",
            email: randomEmail,
            password: password,
            dob: {
              day: "1",
              month: "January",
              year: "2000"
            },
            address: {
              firstName: "Bhim",
              lastName: "Lamichhane",
              company: "Test Company",
              address1: "Kalika Margh 25, Sanepa",
              address2: "Lalitpur",
              country: "United States",
              state: "Provience 4",
              city: "Balen City",
              zipcode: "6969",
              mobile: "+977-9814412345"
            }
          });

        await helper.urlAssertion("https://automationexercise.com/account_created");
        await register.accountCreatedLabelAssertion("Account Created!");
        await register.continueButtonAssertionAndClick("Continue");
        
        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

        await register.clickLogOutButton();
        await helper.urlAssertion("https://automationexercise.com/login");
        await register.loginSignInAssertion("Signup / Login", "/login")
        await register.loggeOutAssertion();

        await page.waitForTimeout(5000);
    });

    test("Login with saved credentials", async ({ page }) => {
        const helper = new Helper(page);
        const register = new RegiserPage(page);

        const { email, password } = getCredentials(); // 👈 Read saved email & password

        await helper.visitpage("https://automationexercise.com/");
        await register.clickSignUp();
        await helper.urlAssertion("https://automationexercise.com/login");

        await register.login(email, password); 

        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

        await page.waitForTimeout(3000);
    });

});


test("Login with incorrect credentials", async({page})=>{
    const register = new RegiserPage(page)

    await register.login("dreamypd72@gmail.com", "Hello"); 
    await register.errorMessageAssertion("Your email or password is incorrect!")

})


test("Signup with already existing  credentials", async({page})=>{
    const register = new RegiserPage(page)

    await register.fillname("Bhim"); 
    await register.fillemail("dreamypd73@gmail.com"); 
    await register.clickSignIn();
    await register.errorMessageAssertion("Email Address already exist!")

})



test.describe.serial.only("Register and Login and Checkout Full FLow", () => {

    test("Should fill the input,click Sign and Assert the text in Register Page and Register the User", async({page})=>{
        const helper = new Helper(page);
        const register = new RegiserPage(page);

        const randomEmail = `dreamypd73+${faker.string.alphanumeric(6)}@gmail.com`;
        const password ="Password1!"
        saveCredentials(randomEmail,password);
        
        await register.fillname("Bhim");
        await register.fillemail(randomEmail);

        register.clickSignIn();
        await helper.urlAssertion("https://automationexercise.com/signup");
        
        await register.assertAccountAndAddressLabel(0,"Enter Account Information");
        await register.assertAccountAndAddressLabel(1,"Address Information");

        await register.fillAccountInformation(randomEmail,password);
        await register.fillAddressInformation();
        saveUserDetails({
            name: "Bhim",
            email: randomEmail,
            password: password,
            dob: {
              day: "1",
              month: "January",
              year: "2000"
            },
            address: {
              firstName: "Bhim",
              lastName: "Lamichhane",
              company: "Test Company",
              address1: "Kalika Margh 25, Sanepa",
              address2: "Lalitpur",
              country: "United States",
              state: "Provience 4",
              city: "Balen City",
              zipcode: "6969",
              mobile: "+977-9814412345"
            }
          });

        await helper.urlAssertion("https://automationexercise.com/account_created");
        await register.accountCreatedLabelAssertion("Account Created!");
        await register.continueButtonAssertionAndClick("Continue");
        
        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

        await register.clickLogOutButton();
        await helper.urlAssertion("https://automationexercise.com/login");
        await register.loginSignInAssertion("Signup / Login", "/login")
        await register.loggeOutAssertion();
    });
    
    
    test("Login with saved credentials and place order", async ({ page }) => {
        const helper = new Helper(page);
        const register = new RegiserPage(page);
        const cart = new CartPage(page);


        const { email, password } = getCredentials(); // 👈 Read saved email & password


        await register.login(email, password); 

        await helper.urlAssertion("https://automationexercise.com");
        await register.logoutAssertion("Logout","/logout");
        await register.deleteAccountAssertion("Delete Account","/delete_account");
        await register.loggedInAssertion();

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
    
        await product.assertProceedToCheckoutLabel("Proceed To Checkout");
        await product.clickProceedToCheckout();

        await helper.urlAssertion("https://automationexercise.com/checkout");

        await cart.assertAddressDetailsLabel("Address Details");
        await cart.assertDeliveryAddressLabel("Your delivery address");
        await cart.assertBillinAddressLabel("Your billing address");
        await cart.assertAddressDetailsLabel("Review Your Order");

        const userinfo = getUserDetails();
        await cart.deliveryAddressInfo(userinfo);
 
        await product.assertTableHeaders();
        await page.waitForTimeout(2000);


        await product.assertDetailPageCartItems(
            {
              name: searchedProduct.name,
              price: searchedProduct.price,
              quantity: 4,
            }
          );
    

        await cart.assertOrderMessageText("If you would like to add a comment about your order, please write it in the field below.");
        const text = faker.lorem.sentences(2);
        await cart.typeOrderMessage(text);
        await cart.placeOrderAssertion("Place Order", "/payment");


        await page.waitForTimeout(5000);   
    });
    

});


