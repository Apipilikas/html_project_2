const url = "https://elearning-aueb.herokuapp.com/courses/search?category=";

window.onload = init;

var templates = {}

templates.subjects = Handlebars.compile(`
<h2>Μαθήματα κατηγορίας</h2>
{{#each subjects}}
<article class="subject">
    <div id="image-title-inCourses">
        <h3>{{this.title}}</h3>
        <img src="https://elearning-aueb.herokuapp.com/static/images/{{this.img}}" width="150px" height="100px">
    </div>
    <p>{{this.description}}</p>
    <h4>Μαθησιακοί Στόχοι Μαθήματος ✔️</h4>
    <p>{{this.objectives}}</p>
</article>
{{/each}}
`);

function init(){

    const div = document.querySelector('#subject-results');
    const inptValue = getParameterByName('category');
    makeRequest(url, inptValue, div);

}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function makeRequest(url, id, div){
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url + id, init)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            console.log(">!< Looks like something went wrong :/ >!<");
        }
    })
    .then (data => {

        let subjectData = {
            "subjects":[]
        }

        for (subject of data){
            let sbjItem = {
                "title":subject.title,
                "description":subject.description,
                "img":subject.img,
                "objectives":subject.objectives
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
