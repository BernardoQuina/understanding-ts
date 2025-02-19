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
  return {}
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

function Autobind2(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind2
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()

const button = document.querySelector('button')!

button.addEventListener('click', p.showMessage)
// ----
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'required',
    ],
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'positive',
    ],
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]

  if (!objValidatorConfig) {
    return true
  }

  let isValid = true

  for (const prop in objValidatorConfig) {
    // console.log(prop)
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break
        case 'positive':
          isValid && obj[prop] > 0
          break
      }
    }
  }

  return isValid
}
class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!

courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return
  }

  console.log(createdCourse)
})
