import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price })
    const result = await newProduct.save()
    console.log(result)
    return {
      message: 'Data added successfully',
      product: result,
    }
  }

  async getProducts() {
    const products = await this.productModel.find()
    return products
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id)
    return { ...product }
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const product = this.findProduct(id)
    const updatedProduct: Product = { ...product }
    if (title) updatedProduct.title = title
    if (description) updatedProduct.description = description
    if (price) updatedProduct.price = price
    return { message: 'Update success!', product: updatedProduct }
  }

  private findProduct(id: string) {
    const product = this.products.find((prod) => prod.id === id)
    if (!product) {
      throw new NotFoundException("Couldn't found the product")
    }
    return { ...product }
  }
}
