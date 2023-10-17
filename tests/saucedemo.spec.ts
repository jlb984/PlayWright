import { test, expect } from '@playwright/test';
import { LoginPageSteps } from './pageObjects/steps/LoginPageSteps';
import { InventoryPageSteps } from './pageObjects/steps/InventoryPageSteps';

//clase que utiliza la pagina de prueba saucedemo.com que simula una app de compras online

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

//Como 'usuario estandar' Quiero realizar el login Para visualizar el 'Home'
test('realizar login usuario estandar @login @happyPath @sauceDemo', async ({ page }) => {

  //login
  await new LoginPageSteps(page).realizarLogin("standard_user", "secret_sauce");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});


//Como 'usuario estandar' logueado Quiero buscar un producto aleatoriamente Para obtener los datos del mismo
test('obtener un producto aleatorio @inventory @sauceDemo', async ({ page }) => {
  const inventoryPageSteps: InventoryPageSteps = new InventoryPageSteps(page);
  //login
  await new LoginPageSteps(page).realizarLogin("standard_user", "secret_sauce");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  //obtener todos los boxes de productos en una lista
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  //obtener un elemento de forma aleatoria
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  for(let item of itemsContainer){
    console.log(await item.innerText()) 
  }

  const expectedName = await randomItem.locator('.inventory_item_name').innerText();
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Precio: ${expectedPrice} Nombre: ${expectedName} Descripcion: ${expectedDescription}`);

});

//Como 'usuario estandar' logueado Quiero buscar un producto aleatoriamente y hacerle click Para comprobar que los datos del 'Home' sean iguales dentro del box
test('comprobar box Producto @productBox @sauceDemo', async ({ page }) => {

  //login
  await new LoginPageSteps(page).realizarLogin("standard_user", "secret_sauce");


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  //obtener todos los boxes de productos en una lista
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  //obtener un elemento de forma aleatoria
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  const nombreEsperado = await randomItem.locator('.inventory_item_name').innerText();
  const descripcionEsperada = await randomItem.locator('.inventory_item_desc').innerText();
  const precioEsperado = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Datos del Home: Precio: ${precioEsperado} Nombre: ${nombreEsperado} Descripcion: ${descripcionEsperada}`);

  await randomItem.locator('.inventory_item_name').click();   //aqui no se utiliza 'page' porque se interactua con el elemento guardado previamente

  expect(page.getByRole('button', { name: "Go back Back to products" }).isVisible).toBeTruthy();

  const nombreObtenido = await page.locator('.inventory_details_name').innerText();
  const descripcionObtenida = await page.locator('.inventory_details_desc').innerText();
  const precioObtenido = await page.locator('.inventory_details_price').innerText();

  expect(nombreEsperado).toEqual(nombreObtenido);
  expect(descripcionEsperada).toEqual(descripcionObtenida);
  expect(precioEsperado).toEqual(precioObtenido);

});

//Como 'usuario estandar' logueado Quiero agregar un producto al carrito Para comprobar que se sume al carrito
test('comprobar agregar producto a Carrito @productBox @sauceDemo', async ({ page }) => {

  //login
  await new LoginPageSteps(page).realizarLogin("standard_user", "secret_sauce");


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  //obtener todos los boxes de productos en una lista
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  //obtener un elemento de forma aleatoria
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  const nombreEsperado = await randomItem.locator('.inventory_item_name').innerText();
  const descripcionEsperada = await randomItem.locator('.inventory_item_desc').innerText();
  const precioEsperado = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Datos del Home: Precio: ${precioEsperado} Nombre: ${nombreEsperado} Descripcion: ${descripcionEsperada}`);

  //click en 'agregar al carrito'
  await randomItem.getByRole('button', {name: "Add to cart"}).click();   //aqui no se utiliza 'page' porque se interactua con el elemento guardado previamente

  //comprobar que boton cambie a 'Remove'
  expect(randomItem.getByRole('button', { name: "Remove" }).isEnabled).toBeTruthy();

  //click en icono de Carrito
  await page.locator('#shopping_cart_container a').click();

  //comprobar titulo de carrito
  expect(page.getByText('Your Cart')).toBeTruthy();

  //buscar producto elegido
  const cart_item = page.locator(`//div[@class='cart_item' and ./div/a/div[@class='inventory_item_name' and text()='${nombreEsperado}']]`);


  const nombreObtenido = await cart_item.locator(".inventory_item_name").innerText();
  const descripcionObtenida = await cart_item.locator('.inventory_item_desc').innerText();
  const precioObtenido = await cart_item.locator('.inventory_item_price').innerText();

  expect(nombreEsperado).toEqual(nombreObtenido);
  expect(descripcionEsperada).toEqual(descripcionObtenida);
  expect(precioEsperado).toEqual(precioObtenido);

});

//Como 'usuario estandar' logueado Quiero realizar un proceso de compra completo Para confirmar que se completa la compra
test('realizar compra completa @happyPath @sauceDemo', async ({ page }) => {

  //login
  await new LoginPageSteps(page).realizarLogin("standard_user", "secret_sauce");


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);

  //obtener todos los boxes de productos en una lista
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  //obtener un elemento de forma aleatoria
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  const randomItem = itemsContainer[randomIndex];

  const nombreEsperado = await randomItem.locator('.inventory_item_name').innerText();
  const descripcionEsperada = await randomItem.locator('.inventory_item_desc').innerText();
  const precioEsperado = await randomItem.locator('.inventory_item_price').innerText();

  console.log(`Datos del Home: Precio: ${precioEsperado} Nombre: ${nombreEsperado} Descripcion: ${descripcionEsperada}`);

  //click en 'agregar al carrito'
  await randomItem.getByRole('button', {name: "Add to cart"}).click();   //aqui no se utiliza 'page' porque se interactua con el elemento guardado previamente

  //comprobar que boton cambie a 'Remove'
  expect(randomItem.getByRole('button', { name: "Remove" }).isEnabled).toBeTruthy();

  //click en icono de Carrito
  await page.locator('#shopping_cart_container a').click();

  //comprobar titulo de carrito
  expect(page.getByText('Your Cart')).toBeTruthy();

  //buscar producto elegido
  const cart_item = page.locator(`//div[@class='cart_item' and ./div/a/div[@class='inventory_item_name' and text()='${nombreEsperado}']]`);


  const nombreObtenido = await cart_item.locator(".inventory_item_name").innerText();
  const descripcionObtenida = await cart_item.locator('.inventory_item_desc').innerText();
  const precioObtenido = await cart_item.locator('.inventory_item_price').innerText();

  //comprobar que producto elegido se encuentra en el carrito de compras
  expect(nombreEsperado).toEqual(nombreObtenido);
  expect(descripcionEsperada).toEqual(descripcionObtenida);
  expect(precioEsperado).toEqual(precioObtenido);

  //click en Checkout
  await page.locator('button#checkout').click();

  //validar pagina 'Checkout: Your Information'
  expect(page.getByText('Checkout: Your Information')).toBeTruthy();

  //completar datos de comprador y hacer click
  await page.getByRole('textbox', {name: "First Name"}).fill("Hola");
  await page.getByRole('textbox', {name: "Last Name"}).fill("Mundo!");
  await page.getByRole('textbox', {name: "Zip/Postal Code"}).fill("12345");
  await page.getByRole('button', {name: "Continue"}).click();

//validar pagina 'Checkout: Overview'
expect(page.getByText('Checkout: Overview')).toBeTruthy();

//validar total a cobrar
const valorProducto = await parseFloat(precioObtenido.replace('$', ''));
// Calcula el 8% del valor
const porcentaje = await valorProducto * 0.08;
// Calcula el valor más el 8%
const valorConPorcentaje = await valorProducto + porcentaje;
// Redondea el resultado a dos decimales
const resultadoRedondeado = await parseFloat(valorConPorcentaje.toFixed(2));
const total = await page.getByText(/Total: /,{exact:false}).innerText();
console.log(`Total: ${total}   Calculo producto + impuesto: ${resultadoRedondeado}`);

await expect(await page.getByText(/Total: /,{exact:false}).innerText()).toContain(resultadoRedondeado.toString());
//await expect(total).toContain(resultadoRedondeado.toString());

//finalizar compra
await page.getByRole('button', {name: "Finish"}).click();

//validar pagina Compra exitosa
expect(page.getByText('Thank you for your order!')).toBeTruthy();

//logout
await page.getByRole('button', {name: "Open Menu"}).click();
await page.getByRole('link', {name: "Logout"}).click();

expect(page.getByRole('button', {name: "Login"})).toBeEnabled;

});

test.afterEach(async ({ page }) => {
  await page.close()
});

/* test.afterAll(async ({ page }) => {
  await page.close()
}); */