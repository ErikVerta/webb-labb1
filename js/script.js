const flexContainer = document.createElement('div');

flexContainer.classList.add('flex-container');

const gridContainer = document.getElementById('grid-container');

gridContainer.appendChild(flexContainer);

fetch("../json/courses.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        data.forEach(function (course) {
            const cardDiv = document.createElement('div');
            const cardImg = document.createElement('img');
            const cardDivOverlay = document.createElement('div');
            const h4 = document.createElement('h4');
            const par = document.createElement('p');
            const a = document.createElement('a');

            cardDiv.classList.add('card');
            cardDiv.classList.add('flex-item');
            cardImg.alt = 'Card image';
            cardImg.classList.add('card-img-top');
            cardDivOverlay.classList.add('card-img-overlay');
            h4.classList.add('card-title');
            par.classList.add('card-text');
            a.classList.add('btn');
            a.classList.add('btn-primary');

            h4.appendChild(document.createTextNode(course.courseTitle));
            par.appendChild(document.createTextNode(course.courseDescription));
            a.appendChild(document.createTextNode('Buy Course'));
            cardDivOverlay.appendChild(h4);
            cardDivOverlay.appendChild(par);
            cardDivOverlay.appendChild(a);
            cardDiv.appendChild(cardImg);
            cardDiv.appendChild(cardDivOverlay);
            flexContainer.appendChild(cardDiv);
        })
    })

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