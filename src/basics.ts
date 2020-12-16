export function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if(showResult && phrase) {
    console.log(phrase, n1 + n2)
    return
  } else {
    return n1 + n2
  }
}

// Type number
const number1 = 5
const number2 = 2.8

// Type boolean
const printResult = true

// Type string
const resultPhrase = 'Result is:'

const result = add(number1, number2, printResult, resultPhrase)
console.log(result)