function emailValidation(str) {
    let pattern = /^[a-zA-Z0-9]+@[a-z]+(\.[a-z]+)+$/g;
    let isValid = pattern.test(str);

    return isValid ? 'Valid' : 'Invalid';
}

console.log(emailValidation('valid@email.bg'));
console.log(emailValidation('invalid@emai1.bg'));