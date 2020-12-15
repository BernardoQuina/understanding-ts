function add2(n1: number, n2: number) {
  return n1 + n2
}

// Type void because it doesn't have a return. Type undefined must have a return
function printResult2(num: number) {
  console.log('Result: ' + num)
}

// callback function
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2
  cb(result)
}

printResult2(add2(5, 12))

// let combinedValues: Function

// combinedValues = add

// combinedValues = 5             throws error because its not a function
// combinedValues = printResult   its admissable

// set both parameters and result type of a function
let combinedValues: (a: number, b: number) => number

combinedValues = add2 // admissable
// combinedValues = printResult | error: printResult params and result types don't match


console.log(combinedValues(8, 8))

addAndHandle(10, 20, (result) => {
  console.log(result)
})