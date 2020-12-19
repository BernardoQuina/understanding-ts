const names: Array<string> = [] // same as string[]
// names[0].split(' ') ts allows string methods like split

const promise: Promise<number> = new Promise((resolve, _) => {
  setTimeout(() => {
    resolve(10)
  }, 2000)
})

promise.then((data) => {
  // data.split(' ') --> Property 'split' does not exist on type 'number'
  data.toExponential(2) // this gets suggestions and autocompletion
})

// this 2 params types will return an intersection thus ts will be able to infer it
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

console.log(merge({ name: 'bernardo' }, { age: 20 }))

const mergedObject = merge(
  { name: 'bernardo', hobbies: ['Sports'] },
  { age: 20 }
)

// mergedObject.*something* will have autocompletion by ts because it is able to infer

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.'
  if (element.length > 0) {
    descriptionText = 'Got ' + element.length + ' elements.'
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'))

// Keyof constrain
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key]
}

console.log(extractAndConvert({ name: 'Bernardo' }, 'name'))

// Generic Classes
class DataStorage<T extends string | number | boolean> {
  // data: (string | number | boolean)[] would not work the same because this allows
  // mixed types when creating an instance as well as when using methods
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Bernardo')
textStorage.addItem('Rita')
textStorage.removeItem('Bernardo')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
numberStorage.addItem(1)
numberStorage.addItem(5)
numberStorage.addItem(100)
numberStorage.removeItem(5)
console.log(numberStorage.getItems())

// const objectStorage = new DataStorage<object>() not allowed since removeItem fails
// objectStorage.addItem({name: 'Bernardo'})
// objectStorage.addItem({name: 'Rita'})
// objectStorage.removeItem({name: 'Bernardo'}) doesn't work
// console.log(objectStorage.getItems())

// Generic utility types
// Partial
interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date

  return courseGoal as CourseGoal
}

// Readonly
const namesToRead: Readonly<string[]> = ['Bernardo', 'Rita']

// namesToRead.push('Francisco') Property 'push' does not exist on type 'readonly...

