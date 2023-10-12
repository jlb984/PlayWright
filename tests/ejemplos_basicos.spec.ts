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
    expect(page.locator("//span[text()='Todos']")).toBeVisible;
  });

  test('obtener listado de busqueda (scraping) @otro @fast @slow', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
  
    // Busca input y le escribe texto
    await page.locator("textarea[name='q']").fill("hola mundo");
    await page.keyboard.press("Enter");
    //await page.pause();
    // Espera a que la pestana 'Todos' este visible
    expect(page.locator("//span[text()='Todos']")).toBeVisible;

    await page.waitForSelector("h3");

    // obtiene todos los titulos de la lista de busqueda
    const titulos = await page.locator("//div/span/a/h3").allInnerTexts();

    console.log("Se han obtenido los siguientesm",titulos.length, "titulos");
    for(let titulo of titulos){
      console.log("titulo obtenido : ", titulo);
    }
  });

  test('obtener elementos con diferentes metodos getBy @fast @slow', async ({ page }) => {
    await page.goto('https://www.google.com.ar/');
  
    await page.getByAltText("texto alternativo");
    await page.getByLabel("texto de etiqueta");
    await page.getByPlaceholder("texto de ejemplo");
    await page.$('selector-css'); // Reemplaza 'selector-css' por  selector CSS
    await page.$('a',); // Buscar un elemento por tag
    await page.$('[data-test="mi-elemento"]'); // Buscar un elemento con un atributo personalizado
    //byRole
    //ir a 'inspeccionar' --> 'elementos' --> 'accesibilidad'
    //los elementos destacables o mas usados poseen un rol (role) y un nombre, ademas de otros atributos
    //await page.getByRole('role', {name: 'nombre', exact: true}) //exact: true es una configuracion para que 
    //    busque el parametro exacto o no
    await page.getByRole('combobox', {name: 'Buscar'}).fill("hola mundo");
    await page.keyboard.press("Enter");
    //await page.pause();
    // Espera a que la pestana 'Todos' este visible
    expect(page.locator("//span[text()='Todos']")).toBeVisible;
    //await page.pause();
  });