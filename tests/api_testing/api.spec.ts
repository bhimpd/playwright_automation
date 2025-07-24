import {expect, test, request } from "@playwright/test";

test("API: GET-Request:: Fetch the products", async({request}) => {

    const baseUrl = process.env.API_BASEURL;

    const response = await request.get(`${baseUrl}/productsList`);
    console.log("RESPONSE:::::",response);

    const data = await response.json();
    console.log("Response Data ::", JSON.stringify(data, null, 4));

    expect (response.status()).toBe(200);
    expect(data).toHaveProperty('responseCode');
    expect(data.responseCode).toBe(200);
    expect(data).toHaveProperty('products');
    expect(Array.isArray(data.products)).toBeTruthy();
    const productLength = await data.products.length;
    console.log("Product Length = ",productLength);

    expect(data.products.length).toBeGreaterThan(0);

    data.products.forEach((product:any,index:number)=>{
        // Top-level fields
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('brand');
        expect(product).toHaveProperty('category');
        
    });

});