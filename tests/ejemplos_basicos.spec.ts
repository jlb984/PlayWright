import { test, expect } from '@playwright/test';


//funcion test vacia

test('test vacio', async ({ page }) => {

  });

//dirigirse a una pagina

test('navegar a una pagina @prueba @fast', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
});

test('validar titulo @slow', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
  
    // Espera un titulo que "contenga" un strig dado por parametro
    await expect(page).toHaveTitle(/Google/);
  });

  test('completar input @prueba @slow', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
  
    // Busca input y le escribe texto
    await page.locator("textarea[name='q']").fill("hola mundo");
    await page.keyboard.press("Enter");
  });

  test('comprobar un elemento @otro @fast @slow', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
  
    // Busca input y le escribe texto
    await page.locator("textarea[name='q']").fill("hola mundo");
    await page.keyboard.press("Enter");
    //await page.pause();
    await expect(page.locator("//span[text()='Todos']")).toBeVisible;
  });