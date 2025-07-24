import {expect, test, request } from "@playwright/test";

test("API: GET-Request:: Fetch the products", async({request}) => {

    const baseUrl = process.env.API_BASEURL;

    const response = await request.get(`${baseUrl}/productsList`);
    const data = await response.json();
    console.log("Response Data ::", JSON.stringify(data, null, 4));

    expect (response.status()).toBe(200);



});