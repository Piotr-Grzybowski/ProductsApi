# ProductsApi

> API for managing some products.

## 1. Setup the project from the repo locally:

- First clone this repository

```shell
git clone https://github.com/Piotr-Grzybowski/ProductsApi.git
```

- Get in the folder with the project

```shell
cd ProductsApi
```

- Install all dependencies with command npm run install

```shell
npm run install
```

- App requires mongoDb to work. You can either install it locally or use Atlas servers. In main directory open file .env.example. Then assign to the env variables MONGODB_URL_DEV which is an url of db for development purpose and MONGODB_TEST which is url of db for testing purpose. After that rename file to '.env'.

```shell
.env.example => .env
```

- Run project with npm start

```shell
npm start
```

## 2. How it works

In api we have five endpoints

### Products

```
 GET http://localhost:3000/products
```

```
 POST http://localhost:3000/products
```

```
 PUT http://localhost:3000/products/:productId
```

```
 GET http://localhost:3000/products/:productId
```

```
 DELETE http://localhost:3000/products/:productId
```

## 3. Testing

- To run test just use npm test

```shell
npm test
```

- To check coverage report use npm run test:coverage

```shell
npm run test:coverage
```

## 4. Additional info

- To debug app use npm debug

```shell
npm run debug
```
