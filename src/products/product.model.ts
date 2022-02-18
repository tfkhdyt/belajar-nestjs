import mongoose from 'mongoose'

export const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export interface Product {
  _id: string
  title: string
  description: string
  price: number
}
