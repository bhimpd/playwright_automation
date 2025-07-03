import {expect, Locator, Page} from "@playwright/test";
import navbarData from "../fixtures/navbar.json";

export class NavbarPage{
    readonly page:Page;
    readonly navbarLocator:Locator;

    constructor(page:Page){
        this.page = page,
        this.navbarLocator = page.locator("ul.nav.navbar-nav li a")
    }

    async assertNavBarText(){
        const expectedNavbars = navbarData.navbars;
        
        for (const nav of expectedNavbars){
            const navtext= this.navbarLocator.filter({hasText:nav});
            await expect(navtext).toBeVisible();
        }
    }
}