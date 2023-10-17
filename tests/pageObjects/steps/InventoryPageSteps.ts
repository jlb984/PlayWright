import { Locator, Page, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";


export class InventoryPageSteps{         //creacion de clase

    private readonly inventoryPage: InventoryPage;

    constructor(page: Page){
        this.inventoryPage = new InventoryPage(page);
    }

    async validarTitulo(){
        expect((await this.inventoryPage.getTitulo()).isVisible()).toBeTruthy();
    }

    async obtenerBoxesProductos(): Promise<Locator[]>{
        return this.inventoryPage.getListadoProductos(); 
    }
}