import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Date.now() + String(Math.floor(Math.random() * 100))
    const newProduct = new Product(prodId, title, desc, price)
    this.products.push(newProduct)
    return prodId
  }

  getProducts() {
    return [...this.products]
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id)
    return { ...product }
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number
  ) {
    const product = this.findProduct(id)
    const updatedProduct: Product = {...product}
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
    return {...product}
  }
}
