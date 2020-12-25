// added @types/lodash to our dev dependencies. Typescript will now accept it.
import _ from 'lodash'
import 'reflect-metadata' // for class transformer
 // import { plainToClass } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsPositive, validate } from 'class-validator'

console.log('hey')
console.log(_.shuffle([1, 2, 3, 4, 5, 6, 7]))

// class transformer (works with js & ts) & class validators (via ts decorators)
// product model
class Product {
  @IsNotEmpty()
  title: string

  @IsNumber()
  @IsPositive()
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }

  getInformation() {
    return [this.title, `$${this.price}`]
  }
}

// const p1 = new Product('A Book', 12.99)
// console.log(p1.getInformation())

// data from a db (not a class instance, just an object)
const products = [
  { title: 'A Carpet', price: -29.99 },
  { title: 'A Computer', price: 199.99 },
]

// traditional way to instantiate the class on an object (a.g. that came via JSON)
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price)
// })

// validating ()
const loadedProducts = products.map((product) => {
  const newProd = new Product(product.title, product.price)
  validate(newProd).then((errors) => {
    if (errors.length > 0) {
      console.log('Validation Errors!')
      console.log(errors)
    } else {
      console.log(newProd.getInformation())
    }
  })
  console.log('newProd: ',newProd)
  return newProd
})

// instantiating with class transformer
// const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
  console.log(prod.getInformation())
}
