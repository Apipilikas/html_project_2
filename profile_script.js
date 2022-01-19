const urlPOST = "http://localhost:8080/signin"
const urlGET = "http://localhost:8080/user/"

window.onload = init;

var templates = {}

templates.users = Handlebars.compile(`
<section class="user-info">
    <h3>{{name}}</h3>
    <ul>
        <li>Διεύθυνση: {{this.address}}</li>
        <li>Τηλέφωνο: {{this.phone}}</li>
        <li>Μορφωτικό επίπεδο: {{this.education}}</li>
        <li>email: {{this.email}}</li>
    </ul>
</section>
`);

function init() {
    const form = document.getElementById('signin-form');
    const emailInput = document.querySelector('input[type="email"]');
    const alertBoxemailIn = document.querySelector('.input-email > .alert-box');
    const password = document.getElementById('profile-password-txt');
    const alertBoxpswrdIn = document.querySelector('#signin-password-input-pswrd > .alert-box');
    const div = document.querySelector('#user-results');
    const alertResultBox = document.querySelector('#alert-box-results');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailValue = emailInput.value.trim();
        const passwordValue = password.value.trim();
        console.log("Submission button clicked!")

        if (checkEmail(emailValue, alertBoxemailIn) && checkPassword(passwordValue, alertBoxpswrdIn)) {

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
                    console.log(responseMsg)
                    console.log(status)
                    showAlertBox(alertResultBox);
                    if (status == "202") {
                        disableForm(form);
                        makeGETRequest(urlGET, emailValue, div);
                        changeToSuccess(alertResultBox.children[0], responseMsg.msg);
                    }
                    else {
                        changeToFail(alertResultBox.children[0], responseMsg.msg);
                        console.log(">!< Looks like something went wrong :/ >!<");
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
    else {
        hideBox(alertBox);
    }
    return flag;
}

function sendPostRequest(data) {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');


    let init = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    return fetch(urlPOST, init)
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

function makeGETRequest(url, email, div) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url + email, init)
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data);
            let userItem = {
                "name": "🧍 " + data._firstName + " " + data._lastName,
                "address": data._address,
                "phone": data._telNumber,
                "education": data._educationLevel,
                "email": data._email
            }

            let userContent = templates.users(userItem);

            div.innerHTML = userContent;

        })
        .catch(error => {
            console.log(">!< Fetch error >!<", error);
        })
}

function disableForm(form) {
    let formInputs = form.getElementsByTagName('input');
    let buttonsArea = document.getElementById('signin-form-buttons');
    console.log(buttonsArea)

    for (input of formInputs) {
        input.readOnly = true;
    }
    buttonsArea.style.display = "none";
}

function showAlertBox(box) {
    box.style.display = "initial";
}

function changeToSuccess(box, message) {
    box.style.backgroundColor = "rgba(40, 212, 40, 0.63)";
    box.innerHTML = message;
}

function changeToFail(box, message) {
    box.style.backgroundColor = "rgba(247, 30, 30, 0.651)";
    box.innerHTML = message;
}