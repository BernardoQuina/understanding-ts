// Decorators


function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(selector: string, hookId: string) {
  console.log('Rendering template')
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId)
    const p = new constructor()
    if (hookEl) {
      hookEl.innerHTML =  `<${selector}></${selector}>`
      hookEl.querySelector(selector)!.textContent = p.name
    }
  }
}

@WithTemplate('h1', 'app')
@Logger('Logging') // you can use multiple decorators: executed bottom up
class PersonDecorators {
  name = 'Bernardo'

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new PersonDecorators

console.log(pers)

// -----

// property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator')
  console.log(target, propertyName)
}

// accessor decorator
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
  console.log('Accessor decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// method decorator (similar to accessor)
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string
  private _price: number

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price: should be positive.')
    }
  }

  constructor(title: string, price: number) {
    this.title = title
    this._price = price
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}