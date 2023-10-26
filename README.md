# PlayWright

# Allure-Reporter

documentacion
https://www.npmjs.com/package/allure-playwright

instalar allure
```
npm install -D @playwright/test allure-playwright
```
instalar allure line command
```
npm install -D allure-commandline
```
comprobar instalacion en package.json

agregar el tipo de reporte en playwright.config.ts
```
reporter: [['allure-playwright'],['list']],
```

luego de correr los test requeridos, se guardan los datos en la carpeta allure-results en archivos .json
```
npx allure generate allure-results --clean && npx allure open
```
en el primer comando "npx allure generate [folder] --clean" clean es para que limpie el historial para la proxima ejecucion
en el segundo comando se abre el reporte generado en un server propio

ir a playwright.config.ts y modificar la linea 'trace'
```
trace: 'on',
```
[on] guarda atachment en todos los test, [off] ninguno, [retain-on-failure] solo en los fallos

se puede visualizar el trace en https://trace.playwright.dev/