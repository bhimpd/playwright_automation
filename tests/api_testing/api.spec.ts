import { expect, test, request } from "@playwright/test";
import { validateProduct } from "./utils/validator";
const baseUrl = process.env.API_BASEURL;

test("API: GET-Request:: Fetch the products", async ({ request }) => {

  const response = await request.get(`${baseUrl}/productsList`);
  console.log("RESPONSE:::::", response);

  const data = await response.json();
  console.log("Response Data ::", JSON.stringify(data, null, 4));

  // Basic response checks
  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("responseCode");
  expect(data.responseCode).toBe(200);
  
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
  expect (response.status()).toBe(200);

  const data = await response.json();

  expect (data).toHaveProperty("responseCode");
  expect (data.responseCode).toBe(200);

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
  
  test("Positive: Search with valid keyword returns products", async ({ request }) => {
    const response = await request.post(`${baseUrl}/searchProduct`, {
      form: { 
        search_product: "top" 
      }
    });

    expect (response.status()).toBe(200);

    const data = await response.json();
    console.log("Search Result Data:", JSON.stringify(data, null, 4));


    expect(data).toHaveProperty("responseCode");
    expect(data.responseCode).toBe(200);
    expect(data).toHaveProperty("products");
    expect(Array.isArray(data.products)).toBeTruthy();

    data.products.forEach((product: any, index: number) => {
      validateProduct(product, index);
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