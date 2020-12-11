function add(n1, n2, showResult, phrase) {
    if (showResult && phrase) {
        console.log(phrase, n1 + n2);
    }
    else {
        return n1 + n2;
    }
}
// Type number
var number1 = 5;
var number2 = 2.8;
// Type boolean
var printResult = true;
// Type string
var resultPhrase = 'Result is:';
var result = add(number1, number2, printResult, resultPhrase);
console.log(result);
