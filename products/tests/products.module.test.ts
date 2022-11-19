import app from "../../app";
import request from "supertest";
import mongooseService from "../../common/services/mongoose.service";

afterAll(async () => {
  await mongooseService.getMongoose().connection.dropDatabase();
  await mongooseService.getMongoose().disconnect();
});

const product = {
  name: "Some product",
  price: 1200,
};

describe("Testing products module", () => {
  describe("Testing for case when requested resource and product is valid", () => {
    test("user should be able to add product", async () => {
      const response = await request(app).post("/products").send(product);

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(product.name);
      expect(response.body.price).toBe(product.price);
    });

    test("user should be able to list all products", async () => {
      const response = await request(app).get("/products");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test("user should be able to update product", async () => {
      const products = await request(app).get("/products");
      const firstProductOnTheList = products.body[0];

      const updateProductResponse = await request(app)
        .put(`/products/${firstProductOnTheList._id}`)
        .send({ ...product, price: 100 });

      const updatedUser = await request(app).get(
        `/products/${firstProductOnTheList._id}`
      );

      expect(updateProductResponse.statusCode).toBe(204);
      expect(updatedUser.statusCode).toBe(200);
      expect(updatedUser.body.price).toBe(100);
    });

    test("user should be able to delete product", async () => {
      const products = await request(app).get("/products");
      const productsAmount = products.body.length;
      const firstProductOnTheList = products.body[0];

      const response = await request(app).delete(
        `/products/${firstProductOnTheList._id}`
      );

      const productsAfterDeletion = await request(app).get(`/products`);

      expect(response.statusCode).toBe(204);
      expect(productsAfterDeletion.body.length).toBe(productsAmount - 1);
    });
  });

  describe("Testing for case when resource or product not found", () => {
    test("user should get 404 status code and proper message when requesting product that doesn't exist", async () => {
      const invalidId = "someIdThatDoesNotExist";
      const response = await request(app).get(`/products/${invalidId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe(
        `Product with id ${invalidId} not found`
      );
    });

    test("user should get 404 status code and proper message when requesting url that does not exist", async () => {
      const response = await request(app).get(`/doesnotexist`);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe(`Resource not found`);
    });
  });

  describe("Testing validators", () => {
    test("should return 400 and proper errors when name empty", async () => {
      const response = await request(app)
        .post(`/products`)
        .send({ name: "", price: 199 });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe("Name can not be empty");
      expect(response.body.errors[1].msg).toBe(
        "Name length should be between 1 and 100"
      );
    });

    test("should return 400 and proper errors when price is zero or below", async () => {
      const response = await request(app)
        .post(`/products`)
        .send({ name: "product", price: 0 });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBe(
        "Price has to be bigger than zero"
      );
    });
  });
});
