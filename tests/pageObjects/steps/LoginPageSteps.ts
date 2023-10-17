import { Locator, Page, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";

export class LoginPageSteps{         //creacion de clase

    private readonly loginPage: LoginPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
    }

    async validarTitulo(){
        expect((await this.loginPage.getTitulo()).isVisible()).toBeTruthy();
    }

    async completarUserName(user: string){
       await (await this.loginPage.getUserNameInput()).fill(user);
    } 

    async completarPassword(password: string){
       await (await this.loginPage.getPasswordInput()).fill(password);
    } 

    async clickLogin(){
       await (await this.loginPage.getLoginButton()).click();
    } 

    async realizarLogin(user: string, password: string){
       await this.completarUserName(user);
       await this.completarPassword(password);
       await this.clickLogin();
    }
}