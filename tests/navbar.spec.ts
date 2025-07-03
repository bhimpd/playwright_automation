import {test, expect} from '@playwright/test';
import { Helper } from '../helpers/helper';
import { NavbarPage } from '../pages/NavbarPage';


test("Assert the navbars", async({page}) => {
    const helper = new Helper(page);
    const navbarpage = new NavbarPage(page);

    await helper.visitpage("https://automationexercise.com/");
    await navbarpage.assertNavBarText();

    await page.waitForTimeout(6000);

});