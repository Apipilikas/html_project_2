window.onload = init;




function init() {
    let form = document.getElementById('form');
    // let defaultmsg = "Συμπληρώστε το πεδίο.";
    // let txtInputs = document.getElementsByClassName('input-text');
    // let password = document.getElementById('password-txt');
    // let passwordValue = password.value.trim();
    // let validatePassword = document.getElementById('validate-password-txt');
    // let validatePasswordValue = validatePassword.value.trim();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("submit")
        let url = "http://localhost:8080/"


        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let userdata = {
            userID: 1,
            name: 'John'
        }

        let init = {
            method: "POST",
            headers: myHeaders,
            mode: 'no-cors',
            body: JSON.stringify(userdata)
        }

        fetch(url, init)
        .then(response => {
            if (response.status == 201) {
                console.log("succ");
            }
        })
        .catch(error => {
            console.log(">!< Fetch error >!<", error);
        })
    });
}

// function isEmpty(value) {
//     if (value === '') {
//         return true;
//     }
//     return false;
// }

// function confirmPassword(password, alertBox) {
//     let specialCharactersRule = /[ !@#$%^&*]/;
    
//     if (password.length < 8) {

//     }
//     else if (specialCharactersRule.test(password)) {

//     }
//     else {

//     }
// }

// function validatePassword(password, validatePassword, alertBox) {
//     if (password === validatePassword) {
//         return true;
//     }

//     return false;
// }

// function showAlertBox(alertBox, message) {
//     alertBox.style.display = "initial";
//     alertBox.innerHTML = message;
// }

// function hideAlertBox(alertBox) {
//     alertBox.style.display = "none";
// }