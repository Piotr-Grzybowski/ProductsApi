import { CreateProductDto } from "./create.product.dto";

export interface UpdateProductDTO extends CreateProductDto {
  id: string;
}
