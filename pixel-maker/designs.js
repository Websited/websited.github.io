// define canvas size form
const sizePicker = document.getElementById("sizePicker");

// define canvas
const pixelCanvas = document.getElementById("pixelCanvas");

// function to make grid
let makeGrid = function(event) {

    // remove existing grid loop
    while (pixelCanvas.firstChild) {
        pixelCanvas.removeChild(pixelCanvas.firstChild);
    };

    // pick height from picker
    let gridHeight = sizePicker.elements[0].value;

    // pick width from picker
    let gridWidth = sizePicker.elements[1].value;

    // create grid loop    
    for (i = 1; i <= gridHeight; i++) {

        let row = document.createElement("tr");
        pixelCanvas.appendChild(row);

        for (j = 1; j <= gridWidth; j++) {
            let cell = document.createElement("td");
            row.appendChild(cell);
            cell.addEventListener("click", paintCell);

        }
    }
    // prevent page reloading on submit
    event.preventDefault();
}
//function to paint cell
let paintCell = function() {

    // Define paint color
    let paintColor = document.getElementById("colorPicker").value;

    if (this.style.background) {
        this.style.background = "";
    } else {
        this.style.background = paintColor;
    }
};

// submit event listener
sizePicker.addEventListener("submit", makeGrid);