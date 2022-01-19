const url = "https://elearning-aueb.herokuapp.com/courses/search?title=";
const url2 = "https://elearning-aueb.herokuapp.com/categories";

window.onload = init;

var templates = {}

templates.subjects = Handlebars.compile(`
<h3>Αποτελέσματα με λέξη-κλειδί <span>{{keyword}}</span></h3>
{{#if noResults}}
<span class="alert-box">Δεν βρέθηκε μάθημα με αυτήν την λέξη-κλειδί.</span>
{{/if}}
{{#unless noResults}}
{{#each subjects}}
<article class="subject">
    <div id="img-title-content">
        <h4>{{this.title}}</h4>
        <img src="https://elearning-aueb.herokuapp.com/static/images/{{this.img}}" width="150px" height="100px">
    </div>
    <p>{{this.description}}</p>
</article>
{{/each}}
{{/unless}}
`);

templates.subject_categories = Handlebars.compile(`
{{#each categories}}
<a href="courses.html?category={{id}}">{{category}}</a>
{{/each}}
`);

function init() {

    const search_input = document.getElementById('search-input');
    const search_btn = document.getElementById('search-btn');
    const div = document.querySelector('#results-area-content');
    const alertBox = document.querySelector('#search-area-content > .alert-box');
    const letters = /[a-zA-ZΑ-Ωα-ω]/;
    const comma = /[, ]/;
    const constraints = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    var categ_div = document.querySelector('#results-content');
    makeCategoriesRequest(url2, categ_div);

    search_btn.onclick = function (e) {
        var inptValue = search_input.value.trim();
        console.log("Button clicked")
        if (inptValue === '') {
            showAlertBox("Εισάγετε μία λέξη-κλειδί στο πεδίο!");
        }
        else if (letters.test(inptValue) && comma.test(inptValue)) {
            showAlertBox("Εισάγετε μόνο μία λέξη-κλειδί στο πεδίο!");
        }
        else if (constraints.test(inptValue)) {
            showAlertBox("Εισάγετε μόνο γράμματα και αριθμούς!");
        }
        else {
            alertBox.style.display = "none";
            makeRequest(url, inptValue, div);
        }
    }

    function showAlertBox(message) {
        div.innerHTML = '';
        alertBox.style.display = "initial";
        alertBox.innerHTML = message;
    }
}

function makeRequest(url, keyword, div) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url + keyword, init)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                console.log(">!< Looks like something went wrong :/ >!<");
            }
        })
        .then(data => {

            let subjectData = {
                "keyword": keyword,
                "noResults": true,
                "subjects": []
            }

            for (subject of data) {
                let sbjItem = {
                    "title": subject.title,
                    "description": subject.description,
                    "img": subject.img
                }
                subjectData.subjects.push(sbjItem)
                subjectData.noResults = false;
            }

            let subjectContent = templates.subjects(subjectData);

            div.innerHTML = subjectContent;

        })
        .catch(error => {
            console.log(">!< Fetch error >!<", error);
        })
}

function makeCategoriesRequest(url, div) {
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                console.log(">!< Looks like something went wrong :/ >!<");
            }
        })
        .then(data => {

            let categoryData = {
                "categories": []
            }

            for (category of data) {
                let categoryItem = {
                    "id": category.id,
                    "category": category.title,
                }
                categoryData.categories.push(categoryItem)
            }
            let ctgrContent = templates.subject_categories(categoryData);

            div.innerHTML = ctgrContent;

        })
        .catch(error => {
            console.log(">!< Fetch error >!<", error);
        })
}