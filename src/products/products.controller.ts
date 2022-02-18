import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const result = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    )
    return result
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
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ) {
    return this.productsService.updateProduct(id, title, desc, price)
  }
}
