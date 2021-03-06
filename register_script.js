window.onload = init;

function init() {
    const form = document.getElementById('form');
    const txtInputs = document.querySelectorAll('input[type="text"]');
    const alertBoxtxtIn = document.querySelectorAll('.input-text > .alert-box');
    const telInput = document.querySelector('input[type="tel"]');
    const alertBoxtelIn = document.querySelector('.input-tel > .alert-box');
    const emailInput = document.querySelector('input[type="email"]');
    const alertBoxemailIn = document.querySelector('.input-email > .alert-box');
    const password = document.getElementById('password-txt');
    const alertBoxpswrdIn = document.querySelector('#password-input-pswrd > .alert-box');
    const validatePassword = document.getElementById('validate-password-txt');
    const alertBoxvalpswrdIn = document.querySelector('#validate-password-input-pswrd > .alert-box');
    const resultBox = document.getElementById('submission-result-box');
    const resultBoxWindow = document.getElementById('submission-result-box-window');
    const resultBoxSpans = resultBox.getElementsByTagName('span');
    const resultBoxLink = resultBox.querySelector('a');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const telValue = telInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = password.value.trim();
        const validatePasswordValue = validatePassword.value.trim();
        console.log("Submission button clicked!")

        let valid = new Array(5).fill(false);

        // Text inputs
        valid[0] = checktxtInputs(txtInputs, alertBoxtxtIn);

        // Tel input
        valid[1] = checkTelNumber(telValue, alertBoxtelIn);

        // Email input
        valid[2] = checkEmail(emailValue, alertBoxemailIn);

        // Password inputs
        valid[3] = confirmPassword(passwordValue, alertBoxpswrdIn);
        if (valid[3]) {
            valid[4] = validatePasswords(passwordValue, validatePasswordValue, alertBoxvalpswrdIn);
        }

        if (isFormValid(valid)) {
            let status = "201";

            let userdata = {
                firstName: txtInputs[0].value,
                lastName: txtInputs[1].value,
                address: txtInputs[2].value,
                telNumber: telValue,
                educationLevel: txtInputs[3].value,
                email: emailValue,
                password: passwordValue
            }

            sendPostRequest(userdata)
                .then(response => {
                    status = response.status;
                    return response.json();
                })
                .then(responseMsg => {
                    blurMain();
                    disableForm(form);
                    showResultBox(resultBoxWindow);
                    if (status == "201") {
                        changeToSuccess(resultBox, resultBoxSpans, resultBoxLink, responseMsg.msg);
                    }
                    else {
                        changeToFail(resultBox, resultBoxSpans, resultBoxLink, responseMsg.msg);
                    }
                    console.log(responseMsg.msg)
                })
                .catch(error => {
                    console.log(">!< Fetch error >!<", error);
                });
        }
    });
}

function isFormValid(validArray) {
    for (valid of validArray) {
        if (!valid) {
            return false;
        }
    }
    return true;
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
            showBox(alertBoxtxtIn[i], "?????????????????????? ???? ??????????.");
        }
        else {
            hideBox(alertBoxtxtIn[i]);
        }
    }
    return flag;
}

function checkTelNumber(value, alertBox) {
    let flag = false;
    let constraints = /[0-9]{10}/;
    if (isEmpty(value)) {
        showBox(alertBox, "?????????????????????? ???? ??????????.")
    }
    else if (!constraints.test(value)) {
        showBox(alertBox, "O ?????????????? ?????? ?????????????????????? ?????? ?????????? ??????????????.");
    }
    else {
        hideBox(alertBox);
        flag = true;
    }
    return flag;
}

function checkEmail(value, alertBox) {
    let flag = false;
    let constraints = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    if (constraints.test(value)) {
        hideBox(alertBox);
        flag = true;
    }
    else if (isEmpty(value)) {
        showBox(alertBox, "?????????????????????? ???? ??????????.");
    }
    else {
        showBox(alertBox, "To email ?????? ???????????????????????? ?????? ?????????? ????????????.");
    }
    return flag;
}

function confirmPassword(password, alertBox) {
    let flag = false;
    let numberRule = /[1-9]{1}/;
    let letterRule = /[a-zA-Z]{1}/;
    let specialCharactersRule = /[ !@#$%^&*]/;

    if (password.length < 8) {
        showBox(alertBox, "O ?????????????? ???????????? ???? ???????????????? ?????????????????????? 8 ????????????????????.");
    }
    else if (! letterRule.test(password)) {
        showBox(alertBox, "O ?????????????? ???????????? ???? ???????????????? ?????????????????????? ?????? ???????????????? ????????????.")
    }
    else if (! numberRule.test(password)) {
        showBox(alertBox, "O ?????????????? ???????????? ???? ???????????????? ?????????????????????? ???????? ????????????.")
    }
    else if (! specialCharactersRule.test(password)) {
        showBox(alertBox, "O ?????????????? ???????????? ???? ???????????????? ?????????????????????? ?????? ?????? ???? ???????????? ?????????????? !@#$%^&*.");
    }
    else {
        hideBox(alertBox);
        flag = true;
    }
    return flag;
}

function validatePasswords(password, validatePassword, alertBox) {
    let flag = true;
    if (password === validatePassword) {
        hideBox(alertBox);
    }
    else {
        showBox(alertBox, "O?? ?????????????? ?????? ???????????????????????? ?????? ?????????? ???? ??????????.");
        flag = false;
    }

    return flag;
}

function showResultBox(box) {
    box.style.display = "initial";
}

function showBox(box, message) {
    box.style.display = "initial";
    box.innerHTML = message;
}

function hideBox(box) {
    box.style.display = "none";
}

function blurMain() {
    let fieldset = document.getElementById('registration-form')
    fieldset.style.opacity = "0.4"
}

function changeToSuccess(box, spans, link, message) {
    box.style.background = "linear-gradient(to right, rgba(40, 212, 40, 0.856), #dadbde 30%)";
    spans[0].innerHTML = "???";
    spans[1].innerHTML = message;
    link.href = "index.html";
    spans[2].innerHTML = "????????????";
}

function changeToFail(box, spans, link, message) {
    box.style.background = "linear-gradient(to right, rgba(247, 30, 30, 0.856), #dadbde 30%)";
    spans[0].innerHTML = "???";
    spans[1].innerHTML = message;
    link.href = "register.html";
    spans[2].innerHTML = "??????????";
}

function disableForm(form) {
    let formInputs = form.getElementsByTagName('input');
    let buttonsArea = document.getElementById('reg-form-buttons');

    for (input of formInputs) {
        input.readOnly = true;
    }
    buttonsArea.style.display = "none";
}

function sendPostRequest(data) {
    let url = "http://localhost:8080/registerUser"


    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');


    let init = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    return fetch(url, init);
}