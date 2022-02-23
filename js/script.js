const NavBar = document.getElementById("navbar"); 

function MyFunction() {
    if (NavBar.style.display == "block") {
        NavBar.style.display = "none";
    }
    else {
        NavBar.style.display = "block";
    }
    ;
}

fetch("../json/courses.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(data[1].courseDescription);
    })