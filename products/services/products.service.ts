import productsDao from "../dao/products.dao";
import { ProductsDao } from "../dao/products.dao";
import { CreateProductDto } from "../dto/create.product.dto";
import { UpdateProductDTO } from "../dto/update.product.dto";
import debug from "debug";
import { Service, Container } from "typedi";

const log: debug.IDebugger = debug("app:products-service");

@Service()
export class ProductsService {
  constructor(private productsDao: ProductsDao) {}
  async list() {
    return await productsDao.getAllProducts();
  }

  async create(productData: CreateProductDto) {
    return await productsDao.addProduct(productData);
  }

  async readById(productId: string) {
    return await productsDao.getProductById(productId);
  }

  async updateById(productId: string, productData: UpdateProductDTO) {
    return await productsDao.updateProductById(productId, productData);
  }

  async deleteById(productId: string) {
    return await productsDao.deleteProductById(productId);
  }
}

export default Container.get(ProductsService);
