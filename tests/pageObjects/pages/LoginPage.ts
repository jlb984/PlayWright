import { ElementHandle, Locator, Page } from "@playwright/test";

export class LoginPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async getTitulo(): Promise<Locator>{
        return this.page.locator("//div[@class='login_logo' and text()='Swag Labs']");
    }

    async getUserNameInput(): Promise<Locator>{
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    async getPasswordInput(): Promise<Locator>{
        return this.page.getByRole('textbox', {name: 'Password'});
    }

    async getLoginButton(): Promise<Locator>{
        return this.page.getByRole('button', {name: 'Login'});
    }
}