import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common'
import { Product } from './product.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    try {
      const newProduct = new this.productModel({ title, description, price })
      const result = await newProduct.save()
      return {
        message: 'Data added successfully',
        product: result,
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async getProducts() {
    try {
      return this.productModel.find()
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async getSingleProduct(id: string) {
    try {
      const product = await this.findProduct(id)
      if (!product) throw new NotFoundException('Product not found!')
      return product
    } catch (err) {
      throw new NotFoundException(err.message)
    }
  }

  async updateProduct(id: string, body: Product) {
    try {
      await this.productModel.findByIdAndUpdate(id, body)
      return {
        message: 'Data updated successfully',
      }
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id)
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  private async findProduct(id: string) {
    try {
      return this.productModel.findById(id)
    } catch (err) {
      throw new NotAcceptableException(err.message)
    }
  }
}
