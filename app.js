function add(n1, n2) {
    return n1 + n2;
}
// Type void because it doesn't have a return. Type undefined must have a return
function printResult(num) {
    console.log('Result: ' + num);
}
// callback function
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
// let combinedValues: Function
// combinedValues = add
// combinedValues = 5             throws error because its not a function
// combinedValues = printResult   its admissable
// set both parameters and result type of a function
var combinedValues;
combinedValues = add; // admissable
// combinedValues = printResult | error: printResult params and result types don't match
console.log(combinedValues(8, 8));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
