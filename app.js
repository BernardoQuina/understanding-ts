var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// userName = userInput throws error unlike if it was "any" type
// this works because we checked the unknown type before assigning it
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
    // while (true) {} also never returns since its an infinite loop
}
// since this function will always crash the script or at least this part of the script
// We can assign the never type because it will never return anything
generateError('An error occurred!', 500);
