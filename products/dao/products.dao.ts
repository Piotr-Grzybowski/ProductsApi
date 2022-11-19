import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateProductDto } from "../dto/create.product.dto";
import { UpdateProductDTO } from "../dto/update.product.dto";
import debug from "debug";

const log: debug.IDebugger = debug("app:products-dao");

class ProductsDao {
  Schema = mongooseService.getMongoose().Schema;

  productSchema = new this.Schema(
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      UpdateDate: { type: Date, required: true },
    },
    { id: false }
  );

  Product = mongooseService.getMongoose().model("Products", this.productSchema);

  async addProduct(productData: CreateProductDto) {
    const productId = shortid.generate();
    const product = new this.Product({
      _id: productId,
      ...productData,
      UpdateDate: Date.now(),
    });
    await product.save();
    return product;
  }

  async getProductById(productId: string) {
    return await this.Product.findById(productId);
  }

  async getAllProducts() {
    return await this.Product.find();
  }

  async updateProductById(productId: string, productData: UpdateProductDTO) {
    const existingProduct = await this.Product.findOneAndUpdate(
      { _id: productId },
      { $set: { ...productData, UpdateDate: Date.now() } },
      { new: true }
    ).exec();

    return existingProduct || false;
  }

  async deleteProductById(productId: string) {
    return await this.Product.deleteOne({ id: productId }).exec();
  }
}

export default new ProductsDao();
