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
