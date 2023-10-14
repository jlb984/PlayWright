import { Locator, Page } from "@playwright/test"

export class LoginPage{         //creacion de clase

    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){
        this.userNameInput = page.getByRole('textbox', {name: 'Username'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    async completarUserName(user: string){
       await this.userNameInput.fill(user);
    } 

    async completarPassword(password: string){
        await this.passwordInput.fill(password);
    } 

    async clickLogin(){
        await this.loginButton.click();
    } 

}