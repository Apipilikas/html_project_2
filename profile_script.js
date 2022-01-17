window.onload = init;

function init() {
    const form = document.getElementById('signin-form');
    const emailInput = document.querySelector('input[type="email"]');
    const alertBoxemailIn = document.querySelector('.input-email > .alert-box');
    const password = document.getElementById('profile-password-txt');
    const alertBoxpswrdIn = document.querySelector('#signin-password-input-pswrd > .alert-box');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailValue = emailInput.value.trim();
        const passwordValue = password.value.trim();
        console.log("Submission button clicked!")

        if(checkEmail(emailValue, alertBoxemailIn) && checkPassword(passwordValue, alertBoxpswrdIn)){

            let status = "201";

            let userdata = {
            signin_email: emailValue,
            signin_password: passwordValue,
            }

            console.log(userdata);

            sendPostRequest(userdata)
            .then(response => {
                status = response.status;
                return response.json();
            })

            .then(responseMsg => {
                if (status == "202") {
                    
                }
                else {
                    
                }
                console.log(responseMsg.msg)
            })
            .catch(error => {
                console.log(">!< Fetch error >!<", error);
            });

        }
    });
}

function checkEmail(value, alertBox) {
    let flag = true;
    let constraints = /^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})(\.[a-zA-Z]{2,4})?$/;
    if (isEmpty(value)) {
        showBox(alertBox, "Συμπληρώστε το πεδίο.")
        flag = false;
    }
    else if (constraints.test(value)) {
        hideBox(alertBox);
    }
    else {
        showBox(alertBox, "To email που συμπληρώσατε δεν είναι έγκυρο.");
        flag = false;
    }
    return flag;
}

function checkPassword(password, alertBox) {
    let flag = true;
    if (isEmpty(password)) {
        showBox(alertBox, "Συμπληρώστε το πεδίο.")
        flag = false;
    }
    return flag;
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

    return fetch(url, init)
}

function showBox(box, message) {
    box.style.display = "initial";
    box.innerHTML = message;
}

function hideBox(box) {
    box.style.display = "none";
}

function isEmpty(value) {
    if (value === '') {
        return true;
    }
    return false;
}

function disableForm(form) {
    let formInputs = form.getElementsByTagName('input');
    let buttonsArea = document.getElementById('reg-form-buttons');
    console.log(buttonsArea)

    for (input of formInputs) {
        input.readOnly = true;
    }
    buttonsArea.style.display = "none";
}