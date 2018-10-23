function validate() {
    let userName = $('#username');
    let email = $('#email');
    let password = $('#password');
    let confirmPassword = $('#confirm-password');
    let companyCheckBox = $('#company');
    let companyNumber = $('#companyNumber');
    let companyInfo = $('#companyInfo');
    let submitBtn = $('#submit');
    let validationDiv = $('#valid');
    let allIsValid = true;

    companyCheckBox.on('change', function () {
        if (companyCheckBox.is(':checked')) {
            companyInfo.css('display', 'block');
        } else {
            companyInfo.css('display', 'none');
        }
    });

    submitBtn.on('click', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        validateWithRegex(userName, /^[A-Za-z\d]{3,20}$/);
        validateWithRegex(email, /^.*?@.*?\..*$/);

        if (password.val() === confirmPassword.val()) {
            validateWithRegex(password, /^\w{5,15}$/);
            validateWithRegex(confirmPassword, /^\w{5,15}$/);
        } else {
            password.css('border', 'solid red');
            confirmPassword.css('border', 'solid red');
            allIsValid = false;
        }

        if (companyCheckBox.is(':checked')) {
            validateWithRegex(companyNumber, /^[1-9][0-9]{3}$/);
        }

        validationDiv.css('display', allIsValid ? 'block' : 'none');
        allIsValid = true;
    }

    function validateWithRegex(input, pattern) {
        if (pattern.test(input.val())) {
            input.css('border', 'none');
        } else {
            input.css('border', 'solid red');
            allIsValid = false;
        }
    }
}