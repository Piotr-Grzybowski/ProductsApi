import mongooseService from "../../common/services/mongoose.service";
import { CreateProductDto } from "../dto/create.product.dto";
import { UpdateProductDTO } from "../dto/update.product.dto";

class ProductsDao {
  Schema = mongooseService.getMongoose().Schema;

  productSchema = new this.Schema(
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      UpdateDate: { type: Date, required: true },
    },
    { id: false }
  );

  Product = mongooseService.getMongoose().model("Products", this.productSchema);

  async addProduct() {}

  async getProductById() {}

  async getAllProducts() {}

  async updateProductById() {}

  async deleteProductById() {}
}

export default new ProductsDao();
