import { expect, test, request } from "@playwright/test";
import { validateProduct,assertSuccessfulResponse } from "./utils/validator";
const baseUrl = process.env.API_BASEURL;

test("API: GET-Request:: Fetch the products", async ({ request }) => {

  const response = await request.get(`${baseUrl}/productsList`);
  console.log("RESPONSE:::::", response);

  // Basic response checks
  const data = await assertSuccessfulResponse(response); 
  console.log("Response Data ::", JSON.stringify(data, null, 4));
  
  expect(data).toHaveProperty("products");
  expect(Array.isArray(data.products)).toBeTruthy();
  expect(data.products.length).toBeGreaterThan(0);

  const productIds: number[] = [];

  data.products.forEach((product: any, index: number) => {
    validateProduct(product, index);
    productIds.push(product.id);
  });

  // Unique ID check
  const uniqueIds = new Set(productIds);
  expect(uniqueIds.size).toBe(productIds.length);
});


test("API : POST-Request:: Create the Products", async ({ request })=>{

  const response = await request.post(`${baseUrl}/productsList`);
  console.log("RESPONSE::::: ", response);
  expect (response.status()).toBe(200);

  const data = await response.json();
  console.log("Response Data ::", JSON.stringify(data, null, 4));

  expect (data).toHaveProperty("responseCode");
  expect (data.responseCode).toBe(405);
  
  expect (data).toHaveProperty("message");
  expect (data.message).toBe("This request method is not supported.");
  
});


test("API :: GET-Request:: Fetch the Brands", async({request})=>{

  const response = await request.get(`${baseUrl}/brandsList`);
  const data = await assertSuccessfulResponse(response); 

  expect (data).toHaveProperty("brands");
  expect (Array.isArray(data.brands)).toBeTruthy();

  const brandsLength = data.brands.length;

  expect (brandsLength).toBeGreaterThan(0);

  const brandIds: number[] = [];

  data.brands.forEach((brand:any, index:number) =>{

    try {
      expect (brand).toHaveProperty("id");
      expect(Number.isInteger(brand.id)).toBe(true);
  
      expect (brand.id).toBeGreaterThan(0);
      brandIds.push(brand.id);
  
      expect (brand).toHaveProperty("brand");
      expect (typeof brand.brand).toBe("string");
      expect(brand.brand.trim().length).toBeGreaterThan(0);
  
    } catch (error) {
      throw new Error(`Validation failed at index ${index}: ${JSON.stringify(brand, null, 2)}\nError: ${error}`);
    }
   
    // Unique ID check
  const uniqueIds = new Set(brandIds);
  expect(uniqueIds.size).toBe(brandIds.length);
  });


});


test("API :: PUT - All Brand Lists", async({request})=>{

  const response = await request.post(`${baseUrl}/brandsList`);

  expect (response.status()).toBe(200);
  const data = await response.json();

  expect (data).toHaveProperty("responseCode");
  expect (data.responseCode).toBe(405);

  expect (data).toHaveProperty("message");
  expect (data.message).toBe("This request method is not supported.");

});


test.describe("API: POST /searchProduct", () => {
  
  const searchKeywords = ["top", "tshirt", "skirt", "jean", "dress"];

  searchKeywords.forEach((keyword) => {
    test(`Positive: Search for "${keyword}" returns matching products`, async ({ request }) => {
      const response = await request.post(`${baseUrl}/searchProduct`, {
        form: {
          search_product: keyword,
        },
      });
  
    const data = await assertSuccessfulResponse(response); 
    console.log("Search Result Data:", JSON.stringify(data, null, 4));
 
    expect(data).toHaveProperty("products");
    expect(Array.isArray(data.products)).toBeTruthy();

    data.products.forEach((product: any, index: number) => {
      try {
        expect(product).toHaveProperty("id");
        expect(Number.isInteger(product.id)).toBe(true);
        expect(product.id).toBeGreaterThan(0);
    
        expect(product).toHaveProperty("name");
        expect(typeof product.name).toBe("string");
        expect(product.name.trim().length).toBeGreaterThan(0);
    
        expect(product).toHaveProperty("price");
        expect(typeof product.price).toBe("string");
        expect(product.price.trim().length).toBeGreaterThan(0);
    
        expect(product).toHaveProperty("brand");
        expect(typeof product.brand).toBe("string");
        expect(product.brand.trim().length).toBeGreaterThan(0);
    
        expect(product).toHaveProperty("category");
        expect(typeof product.category).toBe("object");
    
        expect(product.category).toHaveProperty("usertype");
        expect(typeof product.category.usertype).toBe("object");
    
        expect(product.category.usertype).toHaveProperty("usertype");
        expect(typeof product.category.usertype.usertype).toBe("string");
        expect(product.category.usertype.usertype.trim().length).toBeGreaterThan(0);
    
        expect(product.category).toHaveProperty("category");
        expect(typeof product.category.category).toBe("string");
        expect(product.category.category.trim().length).toBeGreaterThan(0);
        
      // ✅ Assert keyword is found in product name or category
        const nameIncludesKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
        const categoryIncludesKeyword = product.category.category.toLowerCase().includes(keyword.toLowerCase());

        expect(
          nameIncludesKeyword || categoryIncludesKeyword
        ).toBeTruthy();
        } catch (err) {
          throw new Error(
            `Validation failed at index ${index}:\n${JSON.stringify(product, null, 2)}\nError: ${err}`
          );
        }
      });
    });
  });

  test("Negative: Search with non-matching keyword returns empty list", async ({ request }) => {

    const response = await request.post(`${baseUrl}/searchProduct`, {
      form: { 
        search_product: "random" 
      }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect(data.responseCode).toBe(200);
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBe(0); 
  });

  test("Negative: Missing search_product field", async ({ request }) => {
    const response = await request.post(`${baseUrl}/searchProduct`, {
      form: {} 
    });

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect (data.responseCode).toBe(400);
    expect (data.message).toBe("Bad request, search_product parameter is missing in POST request.")
  });

});

test.describe("API:: POST : Verify Login", () => {

  test("Positive: Verify Login with the valid credentials.", async ({request}) =>{
    const response = await request.post(`${baseUrl}/verifyLogin`, {
      form : {
        "email":"dreamypd73@gmail.com",
        "password":"Password1!"
      }
    });

    const data = await assertSuccessfulResponse(response); 

    expect(data).toHaveProperty("message");
    expect(data.message).toBe("User exists!");

  });

  test("Negative: Verify Login without both email and password", async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`, {
      form: {}
    });
  
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data.responseCode).toBe(400);
    expect(data.message).toBe("Bad request, email or password parameter is missing in POST request.");
  });
  
  test("Negative: Verify Login without email", async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`, {
      form: { password: "validpass123" }
    });
  
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data.responseCode).toBe(400);
    expect(data.message).toBe("Bad request, email or password parameter is missing in POST request.");
  });
  
  test("Negative: Verify Login without password", async ({ request }) => {
    const response = await request.post(`${baseUrl}/verifyLogin`, {
      form: { email: "valid@example.com" }
    });
  
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data.responseCode).toBe(400);
    expect(data.message).toBe("Bad request, email or password parameter is missing in POST request.");
  });
  
});