window.onload = init;




function init() {
    const form = document.getElementById('form');
    const txtInputs = document.querySelectorAll('input[type="text"]');
    const alertBoxtxtIn = document.querySelectorAll('.input-text > .alert-box');
    const telInput = document.querySelector('input[type="tel"]');
    const alertBoxtelIn = document.querySelector('.input-tel > .alert-box');
    const emailInput = document.querySelector('input[type="email"]')
    const alertBoxemailIn = document.querySelector('.input-email > .alert-box');
    const password = document.getElementById('password-txt');
    const alertBoxpswrdIn = document.querySelector('#password-input-pswrd > .alert-box');
    const validatePassword = document.getElementById('validate-password-txt');
    const alertBoxvalpswrdIn = document.querySelector('#validate-password-input-pswrd > .alert-box');
    

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const telValue = telInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = password.value.trim();
        const validatePasswordValue = validatePassword.value.trim();
        console.log("submit")
        
        //sendPostRequest(userdata);
        let valid = true;
        // Text inputs
        valid = checktxtInputs(txtInputs, alertBoxtxtIn);
        
        // Tel input
        valid = checkTelNumber(telValue, alertBoxtelIn);
        
        // Email input
        valid = checkEmail(emailValue, alertBoxemailIn);
        
        // Password input
        valid = confirmPassword(passwordValue, alertBoxpswrdIn);
        if (confirmPassword(passwordValue, alertBoxpswrdIn)) {
            valid = validatePasswords(passwordValue, validatePasswordValue, alertBoxvalpswrdIn);
        }
        else {
            valid = false;
        }

        if (valid) {
            let userdata = {
            firstname: txtInputs[0].value,
            lastname: txtInputs[1].value,
            address: txtInputs[2].value,
            telephoneNumber: telValue,
            educationLevel: txtInputs[3].value,
            email: emailValue,
            password: passwordValue
            }

            console.log(userdata);
            //sendPostRequest(userdata);
        }
    });
}

function isEmpty(value) {
    if (value === '') {
        return true;
    }
    return false;
}

function checktxtInputs(txtInputs, alertBoxtxtIn) {
    let flag = true;
    for (var i = 0; i < txtInputs.length; i++) {
        let txtInputValue = txtInputs[i].value.trim();
        if (isEmpty(txtInputValue)) {
            flag = false;
            showAlertBox(alertBoxtxtIn[i], "Συμπληρώστε το πεδίο.");
        }
        else {
            hideAlertBox(alertBoxtxtIn[i]);
        }
    }
    return flag;
}

function checkTelNumber(value, alertBox) {
    let flag = false;
    let constraints = /[0-9]{10}/;
    if (isEmpty(value)) {
        console.log("aaa")
        showAlertBox(alertBox, "Συμπληρώστε το πεδίο.")
    }
    else if (! constraints.test(value)) {
        showAlertBox(alertBox, "O αριθμός που συπληρώσατε δεν είναι έκγυρος.");
    }
    else {
        hideAlertBox(alertBox);
        flag = true;
    }
    return flag;
}

function checkEmail(value, alertBox) {
    let flag = true;
    let constraints = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    if (constraints.test(value)) {
        hideAlertBox(alertBox);
    }
    else {
        showAlertBox(alertBox, "To email που συμπληρώσατε δεν είναι έγκυρο.");
        flag = false;
    }
    return flag;
}

function confirmPassword(password, alertBox) {
    let flag = false;
    let specialCharactersRule = /[ !@#$%^&*]/;
    
    if (password.length < 8) {
        showAlertBox(alertBox, "O κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες.");
    }
    else if (! specialCharactersRule.test(password)) {
        showAlertBox(alertBox, "O κωδικός πρέπει να περιέχει τουλάχιστον ένα από τα ειδικά σύμβολα !@#$%^&*.");
    }
    else {
        hideAlertBox(alertBox);
        flag = true;
    }
    return flag;
}

function validatePasswords(password, validatePassword, alertBox) {
    let flag = true;
    if (password === validatePassword) {
        hideAlertBox(alertBox);
    }
    else {
        showAlertBox(alertBox, "Oι κωδικοί που συμπληρώσατε δεν είναι οι ίδιοι.");
        flag = false;
    }

    return flag;
}

function showAlertBox(alertBox, message) {
    alertBox.style.display = "initial";
    alertBox.innerHTML = message;
}

function hideAlertBox(alertBox) {
    alertBox.style.display = "none";
}

function sendPostRequest(data) {
    let url = "http://localhost:8080/"


    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');


    let init = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    fetch(url, init)
    .then(response => response.json())
    .then(responseMsg => {
        console.log(responseMsg.msg)
    })
    .catch(error => {
        console.log(">!< Fetch error >!<", error);
    })
}