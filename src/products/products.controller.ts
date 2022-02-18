import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './product.model'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id)
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: Product) {
    return this.productsService.updateProduct(id, body)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id)
    return 'Data deleted successfully'
  }
}
