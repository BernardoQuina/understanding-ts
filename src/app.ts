// Decorators

// Class decorators
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(selector: string, hookId: string) {
  console.log('Rendering template')
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // Returning (and changing) a class in a class decorator
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = `<${selector}></${selector}>`
          hookEl.querySelector(selector)!.textContent = this.name
        }
      }
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

const pers = new PersonDecorators()

console.log(pers)

// -----

// property decorator (cannot return)
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator')
  console.log(target, propertyName)
}

// accessor decorator (can return)
function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// method decorator (can return) (similar to accessor)
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log('Method decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
  return {
    
  }
}

// parameter decorator (cannot return)
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

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()

const button = document.querySelector('button')!

button.addEventListener('click', p.showMessage)