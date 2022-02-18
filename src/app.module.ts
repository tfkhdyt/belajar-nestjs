import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsModule } from './products/products.module'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.pbe5r.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(uri)],
})
export class AppModule {}
