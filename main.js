// Array that stores the numbers
let numbers = [];

// INSERT NUMBER
function insertNumber() {

    let input = document.getElementById("numberInput");
    let value = Number(input.value);

    // Check if input is empty
    if (input.value === "") {
        alert("Please enter a number.");
        return;
    }

    // Check if number is positive
    if (value <= 0) {
        alert("Please enter a positive number.");
        return;
    }

    // Check if number is a whole number
    if (!Number.isInteger(value)) {
        alert("Please enter a whole number only.");
        return;
    }

    // Add number to array
    numbers.push(value);

    // Display numbers
    displayNumbers();

    // Clear input
    input.value = "";

    // Put cursor back in input
    input.focus();
}


// DISPLAY NUMBERS
function displayNumbers() {

    let list = document.getElementById("numberList");

    // Clear previous display
    list.innerHTML = "";

    numbers.forEach(function(number, index) {

        let row = document.createElement("div");
        row.className = "number-row";

        // Number
        let numberText = document.createElement("span");
        numberText.className = "number";
        numberText.textContent = number;

        // EVEN or ODD
        let typeText = document.createElement("span");
        typeText.className = "type";

        if (number % 2 === 0) {
            typeText.textContent = "EVEN";
            typeText.classList.add("even");
        } else {
            typeText.textContent = "ODD";
            typeText.classList.add("odd");
        }

        // Remove button
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.onclick = function() {
            removeNumber(index);
        };

        // Edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            editNumber(index);
        };

        // Add everything to row
        row.appendChild(numberText);
        row.appendChild(typeText);
        row.appendChild(removeButton);
        row.appendChild(editButton);

        list.appendChild(row);
    });
}


// REMOVE NUMBER
function removeNumber(index) {

    numbers.splice(index, 1);

    displayNumbers();

    // Clear results after changing list
    document.getElementById("results").innerHTML = "";
}


// EDIT NUMBER
function editNumber(index) {

    let newNumber = prompt(
        "Enter the new positive number:",
        numbers[index]
    );

    // Cancel button
    if (newNumber === null) {
        return;
    }

    newNumber = Number(newNumber);

    // Validate new number
    if (newNumber <= 0 || !Number.isInteger(newNumber)) {
        alert("Please enter a positive whole number.");
        return;
    }

    // Replace old number
    numbers[index] = newNumber;

    // Display updated list
    displayNumbers();

    // Clear results
    document.getElementById("results").innerHTML = "";
}


// CLEAR ENTRY
function clearEntry() {

    document.getElementById("numberInput").value = "";

    document.getElementById("numberInput").focus();
}


// CLEAR ITEMS
function clearItems() {

    numbers = [];

    displayNumbers();

    document.getElementById("results").innerHTML = "";

    document.getElementById("sortSelect").value = "";
}


// GET TOTAL
function getTotal() {

    if (numbers.length === 0) {
        alert("There are no numbers to calculate.");
        return;
    }

    let total = 0;

    numbers.forEach(function(number) {
        total += number;
    });

    document.getElementById("results").innerHTML =
        "TOTAL&nbsp;&nbsp;&nbsp;" + total;
}


// IDENTIFY HIGHEST AND LOWEST
function getHighestLowest() {

    if (numbers.length === 0) {
        alert("There are no numbers to identify.");
        return;
    }

    let highest = Math.max(...numbers);
    let lowest = Math.min(...numbers);

    document.getElementById("results").innerHTML =
        "HIGHEST&nbsp;&nbsp;" + highest + "<br>" +
        "LOWEST&nbsp;&nbsp;&nbsp;" + lowest;
}


// SORT NUMBERS
function sortNumbers() {

    let sortType = document.getElementById("sortSelect").value;

    if (sortType === "") {
        return;
    }

    if (numbers.length === 0) {
        alert("There are no numbers to sort.");
        document.getElementById("sortSelect").value = "";
        return;
    }

    if (sortType === "ascending") {

        numbers.sort(function(a, b) {
            return a - b;
        });

    } else if (sortType === "descending") {

        numbers.sort(function(a, b) {
            return b - a;
        });
    }

    displayNumbers();
}