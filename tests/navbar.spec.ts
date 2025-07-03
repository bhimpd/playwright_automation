import {test, expect} from '@playwright/test';
import { Helper } from '../helpers/helper';


test("Assert the navbars", async({page}) => {
    const helper = new Helper(page);

    await helper.visitpage("https://automationexercise.com/");

    await page.waitForTimeout(6000);

});