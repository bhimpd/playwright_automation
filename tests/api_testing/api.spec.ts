import { expect, test, request } from "@playwright/test";

test("API: GET-Request:: Fetch the products", async ({ request }) => {
  const baseUrl = process.env.API_BASEURL;

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
    try {
      // Top-level fields
      expect(product).toHaveProperty("id");
      expect(Number.isInteger(product.id)).toBe(true);
      expect(product.id).toBeGreaterThan(0);

      productIds.push(product.id);

      expect(product).toHaveProperty("name");
      expect(typeof product.name).toBe("string");
      expect(product.name.trim().length).toBeGreaterThan(0);

      expect(product).toHaveProperty("price");
      expect(typeof product.price).toBe("string");
      expect(product.price.trim().length).toBeGreaterThan(0);

      expect(product).toHaveProperty("brand");
      expect(typeof product.brand).toBe("string");
      expect(product.brand.trim().length).toBeGreaterThan(0);

      // Category object
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
      
    } catch (error) {
      throw new Error(
        `Assertion failed for product at index ${index}: \n${JSON.stringify(product, null, 2)}\n\nError: ${error}`
      );
    }
  });

  // Unique ID check
  const uniqueIds = new Set(productIds);
  expect(uniqueIds.size).toBe(productIds.length);
});


test("API : POST-Request:: Create the Products", async ({ request })=>{
  

});
