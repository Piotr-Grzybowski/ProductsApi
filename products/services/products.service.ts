import ProductsDao from "../dao/products.dao";
import { CreateProductDto } from "../dto/create.product.dto";
import { UpdateProductDTO } from "../dto/update.product.dto";
import debug from "debug";

const log: debug.IDebugger = debug("app:products-service");

class ProductsService {
  async list() {
    return await ProductsDao.getAllProducts();
  }

  async create(productData: CreateProductDto) {
    return await ProductsDao.addProduct(productData);
  }

  async readById(productId: string) {
    return await ProductsDao.getProductById(productId);
  }

  async updateById(productId: string, productData: UpdateProductDTO) {
    return await ProductsDao.updateProductById(productId, productData);
  }

  async deleteById(productId: string) {
    return await ProductsDao.deleteProductById(productId);
  }
}

export default new ProductsService();
