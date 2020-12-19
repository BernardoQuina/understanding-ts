type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

type ElevatedEmployee = Admin & Employee // combination of the object types

const e1: ElevatedEmployee = {
  name: 'Bernardo',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable1 = string | number

type Numeric = number | boolean

type Universal = Combinable & Numeric // Type number because that is the intersection

// Function overloads
function add(a: number, b: number): number
function add(a: string, b:number): string
function add(a: number, b:string): string
function add(a: string, b: string): string
function add(a: Combinable, b: Combinable) {
  // This is a type guard
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  
  return a + b
}

const result = add('bernardo', 5) // typescript is able to infer result as a string

const fetchedUserData = {
  id: 'u1',
  name: 'Bernardo',
  job: { title: 'CEO', description: 'My own company' }
}

console.log(fetchedUserData?.job?.title) // Typescript optional chaining

const userInput2 = ''

const storedData = userInput2 ?? 'DEFAULT' // Nullish coalescing operator


type UnknownEmployee = Employee | Admin

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name)
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges)
  }

  if ('startDate' in emp) {
    console.log('start date: ' + emp.startDate)
  }
}

printEmployeeInfo(e1)

class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo: ' + amount)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()

const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)


// discriminated unions
interface Bird {
  type: 'bird'

  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed
      break
    
    case 'horse':
      speed = animal.runningSpeed
      break
  }
  
  console.log('Moving at speed: ' + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10})

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!

const userInputElement = document.getElementById('user-input')

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!'
}

interface ErrorContainer { // { email: 'Not a valid email', username: 'Already taken' }
  [prop: string]: string
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Already taken'
}

