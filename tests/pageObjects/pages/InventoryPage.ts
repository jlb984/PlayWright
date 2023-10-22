import { Page, Locator } from "@playwright/test";

export class InventoryPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async getTitulo(): Promise<Locator>{
        return this.page.locator("//span[@class='title' and text()='Products']");
    }

    async getBoxProducto(nombreProducto: string): Promise<Locator>{
        return this.page.locator(`//div[@class='inventory_item' and .//div[text()='${nombreProducto}']]`);
    }

    async getListadoProductos(): Promise<Locator[]>{
        return this.page.locator(`#inventory_container .inventory_item`).all();
    }

    async getCarritoButton(){
        return this.page.$("#shopping_cart_container");
    }
}