/*Responsive Navbar for mobile functionality*/
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

/*Creates a flexcontainer and appends it to gridcontainer*/
const flexContainer = document.createElement('div');

flexContainer.classList.add('flex-container');

const gridContainer = document.getElementById('grid-container');

gridContainer.appendChild(flexContainer);

fetchData();


/*Function to fetch data from courses.json and populate flex-container with cards.*/
function fetchData() {
    fetch("json/courses.json")
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
            cardImg.src = 'images/paperclip.jpg';
            cardImg.classList.add('card-img-top');
            cardDivOverlay.classList.add('card-img-overlay');
            h4.classList.add('card-title');
            par.classList.add('card-text');
            a.classList.add('btn');
            a.classList.add('btn-primary');

            a.addEventListener('click', function (event) {
                const buttonClicked = event.target;
                const courseTitle = buttonClicked.parentElement.firstChild.innerHTML;

                for (let i = 0; i < cartArray.length; i++) {
                    const course = cartArray[i];
                    if (course.courseTitle == courseTitle) {
                        return;
                    }
                }
                fetch("json/courses.json")
                    .then(function (resp) {
                        return resp.json();
                    })
                    .then(function (data) {
                        data.forEach(function (course) {
                            if (courseTitle == course.courseTitle) {
                                cartArray.push(course);
                                updateCartItems();
                            }                   
                    })
                })
            })

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

}

/*function for calculating total price*/
function CalculateTotal() {
    const totalSpan = document.getElementById("total-span");
    const priceSpans = document.getElementsByClassName("price-span");
    const quantityInputs = document.getElementsByClassName("quantity-input");
    var totalPrice = 0;

    for (let i = 0; i < priceSpans.length; i++) {
        const price = priceSpans[i].innerHTML;
        const quantity = quantityInputs[i].value;

        price.replace("s", "");
        price.replace("e", "");
        price.replace("k", "");

        totalPrice = totalPrice + (parseInt(price) * quantity);
    }
    totalSpan.innerHTML = "";
    totalSpan.appendChild(document.createTextNode(`${totalPrice}sek`))
}

/*Cart modal functionality*/
const cartArray = [];
const addedCartItemsArray = [];

/*Function for updating cart items*/
function updateCartItems() {
    const cartModalBody = document.getElementById("cart-modal-body");
    cartArray.forEach(function (course) {

        for (let i = 0; i < addedCartItemsArray.length; i++) {
            const item = addedCartItemsArray[i];
            if (item.courseTitle == course.courseTitle) {
                return;
            }
        }
        const cartItemContainer = document.createElement("div");
        const titleSpan = document.createElement("span");
        const priceSpan = document.createElement("span");
        const quantityInput = document.createElement("input");
        const removeButton = document.createElement("button");

        cartItemContainer.classList.add("cart-item-container");
        titleSpan.classList.add("title-span");
        priceSpan.classList.add("price-span");
        quantityInput.classList.add("quantity-input");
        removeButton.classList.add("btn");
        removeButton.classList.add("btn-danger");

        removeButton.addEventListener('click', function (event) {
            const buttonClicked = event.target
            const courseName = buttonClicked.parentElement.firstChild.innerHTML;
            const courseToRemove = cartArray.find(c => c.courseTitle == courseName);
            cartArray.splice(courseToRemove, 1);
            addedCartItemsArray.splice(courseToRemove, 1);
            buttonClicked.parentElement.remove()
            CalculateTotal();
        })

        quantityInput.addEventListener('input', function (event) {
            CalculateTotal();
        })

        titleSpan.appendChild(document.createTextNode(course.courseTitle));
        priceSpan.appendChild(document.createTextNode("100sek"));
        quantityInput.value = "1";
        quantityInput.type = "number";
        removeButton.appendChild(document.createTextNode("REMOVE"));
        cartItemContainer.appendChild(titleSpan);
        cartItemContainer.appendChild(priceSpan);
        cartItemContainer.appendChild(quantityInput);
        cartItemContainer.appendChild(removeButton);
        cartModalBody.appendChild(cartItemContainer);

        CalculateTotal();
        addedCartItemsArray.push(course);       
    })
}

/*Function for making a purchase*/
function PurchaseSuccessfull() {
    const purchaseSuccessfullModal = document.getElementById("purchase-successfull-modal");
    const cartModalBody = document.getElementById("cart-modal-body");
    cartModalBody.innerHTML = "";
    cartArray.length = 0;
    addedCartItemsArray.length = 0;
    CloseCartModal();
    CalculateTotal();
    purchaseSuccessfullModal.style.display = "block";
}

/*Functin for closing purchaseModal*/
function ClosePurchaseSuccessfullModal() {
    const purchaseSuccessfullModal = document.getElementById("purchase-successfull-modal");
    purchaseSuccessfullModal.style.display = "none";
}

/*Modal dialogue functionality for opening and closing cart modal*/
function OpenCartModal() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "block";
}

function CloseCartModal() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = "none";
}

/*Modal dialogue functionality for opening and closing create course modal*/
const modal = document.getElementById('course-modal');

const modalBtn = document.getElementById('create-course-btn');

modalBtn.onclick = function () {
    modal.style.display = "block";
}

function CloseCreateCourseModal() {
    modal.style.display = "none";
}

/*Function for saving course and creating course card*/
function saveCourse() {
    const courseTitle = document.getElementById("course-title-input");
    const courseDescription = document.getElementById("course-description-textarea");
    const courseNumber = document.getElementById("course-number-input");
    const courseLength = document.getElementById("course-length-input");

    if (courseTitle.value == "" || courseDescription.value == "" || courseNumber.value == "" || courseLength.value == "") {
        console.log("error, please fill in all of the fields.");
        return;
    }

    const courseTitles = document.getElementsByClassName("card-title");

    for (let i = 0; i < courseTitles.length; i++) {
        const title = courseTitles[i].innerHTML;
        if (title == courseTitle.value) {
            console.log("error, title taken. please choose another title.");
            return;
        }
    }
    
    const cardDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardDivOverlay = document.createElement('div');
    const h4 = document.createElement('h4');
    const par = document.createElement('p');
    const a = document.createElement('a');

    cardDiv.classList.add('card');
    cardDiv.classList.add('flex-item');
    cardImg.alt = 'Card image';
    cardImg.src = 'images/paperclip.jpg';
    cardImg.classList.add('card-img-top');
    cardDivOverlay.classList.add('card-img-overlay');
    h4.classList.add('card-title');
    par.classList.add('card-text');
    a.classList.add('btn');
    a.classList.add('btn-primary');

    a.addEventListener('click', function (event) {
        const buttonClicked = event.target;
        const courseTitle1 = buttonClicked.parentElement.firstChild.innerHTML;

            for (let i = 0; i < cartArray.length; i++) {
                const course = cartArray[i];
                if (course.courseTitle == courseTitle1) {
                    return;
                }
            }
                
        const course = {
            "courseTitle": courseTitle.value,
            "courseNumber": courseNumber.value,
            "courseDescription": courseDescription.value,
            "courseLength": courseLength.value + " weeks"
        }
        cartArray.push(course);
        updateCartItems();
    })

    h4.appendChild(document.createTextNode(courseTitle.value));
    par.appendChild(document.createTextNode(courseDescription.value));
    a.appendChild(document.createTextNode('Buy Course'));
    cardDivOverlay.appendChild(h4);
    cardDivOverlay.appendChild(par);
    cardDivOverlay.appendChild(a);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardDivOverlay);
    flexContainer.appendChild(cardDiv);

    const createdCourseModal = document.getElementById("created-course-modal");
    createdCourseModal.style.display = "block";
    CloseCreateCourseModal();
}

/*Function for closing created course modal*/
function CloseCreatedCourseSuccessfullyModal() {
    const createdCourseModal = document.getElementById("created-course-modal");
    createdCourseModal.style.display = "none";
}
