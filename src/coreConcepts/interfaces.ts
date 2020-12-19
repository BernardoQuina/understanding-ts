// interfaces for functions
interface AddFn {
  (a: number, b: number): number
}

let addFunction: AddFn = (a, b) => {
  console.log(a + b)
  return a + b
}

// interfaces for objects
interface Named {
  readonly name?: string
  outputName?: string // optional property (set by ?)
}

// extending interfaces
interface Greetable extends Named {
  greet(phrase: string): void
}

class Person implements Greetable {
  name?: string
  age: number

  constructor(age: number, name?: string) {
    if (name) {
      this.name = name
    }
    
    this.age = age
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + this.name)
    } else {
      console.log(phrase)
    }
  }
}

let user1: Greetable

user1 = new Person(24, 'Bernardo')

// user1.name = 'Bern' not possible since its readonly property set by the interface




user1.greet('Hi there I am ')