// gets the grid element by ID from the HTML file and creates a new grid constant
const grid = document.getElementById("grid");

// gets the slider element and the slideText element
let slider = document.getElementById("sliderValue");
let slideText = document.getElementById("slideText");
let sliderValue = slider.value;

// sets the slideText HTML to be the value of sliderValue variable
slideText.innerHTML = `${sliderValue}x${sliderValue}`;

// when the slider is used (oninput), the function to change the slider text runs
slider.oninput = function() {

    // updates the sliderValue to be the new value of slider
    sliderValue = slider.value;
    slideText.innerHTML = `${sliderValue}x${sliderValue}`;

    // creates an array out of the elements with class name grid-element
    const gridElement = Array.from(document.getElementsByClassName("grid-element"));

    // deletes the index i in the gridElement array until all are gone
    // basically resets the grid when the slider changes
    gridElement.forEach(i => {
        i.remove();
    });

    // gridSetup is run to make a new grid with the new sliderValue
    gridSetup(sliderValue);
}

function gridSetup(sliderValue) {

    // the number of columns is = the number of columns as indicated by sliderValue repeated
    //1fr is a unit where 1fr is 100% of the available space
    grid.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;

    // repeat the above commment but for rows
    grid.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`;

    for (let i = 0; i < sliderValue * sliderValue; i++) {
        // create a new gridElement element everytime the loop runs and create a div inside this
        const gridElement = document.createElement("div")

        // gives the gridElement a class
        gridElement.classList.add("grid-element");
        grid.appendChild(gridElement);
    }
}

// create a variable mousedown which is set to 1 when mousedown on the grid element 
let mouseDown = 0;

grid.onmousedown = function () {
    mouseDown = 1;
}
grid.onmouseup = function () {
    mouseDown = 0;
}

// if the mouse leaves the grid mousedown is set to 0
// this is so that the hover effect stops running when the mouse is not inside the grid
grid.addEventListener("mouseleave", function () { mouseDown = 0});

// runs the mousecheck function if mousedown or mouseover the grid element
grid.addEventListener("mouseover", gridColor);
grid.addEventListener("mousedown", gridColor);

// initialises variables for the coloring modes
let colorMode = 1;
let rainbowMode = 0;
let eraserMode = 0;

// variables are set to 1 or 0 depending on if the mode is already on (1) or off (0)
function mode(clicked_value) {
    if (clicked_value == "color") {
        colorMode = 1;
        rainbowMode = 0;
        eraserMode = 0;
    }

    else if (clicked_value == "rainbow") {
        colorMode = 0;
        rainbowMode = 1;
        eraserMode = 0;
    }

    else if (clicked_value == "eraser") {
        colorMode = 0;
        rainbowMode = 0;
        eraserMode = 1;
    }
}

// gets the color input from the html and when used with color.value changes the color of the pen
let color = document.getElementById("colorPicker");

// gets the round color input for adding a shadow
let shadowColor = document.getElementById("roundColor");

color.addEventListener("mouseleave", function () {shadowColor.style.boxShadow = `1px 1px 8px 1px ${color.value}`; });

function gridColor(event) {

    // prevent default will stop the default event from occurring if it is possible to do so
    // in this prevent default runs if mousedown != 1 and className doesnt start with grid
    event.preventDefault();

    if (mouseDown && event.target.className.startsWith("grid-element")) {
    // .target will target the object on which the event is run i.e. grid-element
    // classList.add will add the class grow-grid which in css is the transform animation
      event.target.classList.add("grow-grid");

        if (colorMode == 1) {
            // turns the background and border colors to color.value when the if statement is true
            event.target.style.backgroundColor = color.value;
            event.target.style.border = color.value;
            shadowColor.style.boxShadow = `1px 1px 8px 1px ${color.value}`;

            setTimeout(function() {event.target.classList.remove("grow-grid")}, 50);
        }

        else if (rainbowMode == 1) {
            // initialises a random color 
            const randomColor = Math.floor(Math.random()*16777215).toString(16);

            // turns the background and border colors to random color
            event.target.style.backgroundColor = "#" + randomColor;
            event.target.style.border = "#" + randomColor;
            color.value = "#" + randomColor;
            shadowColor.style.boxShadow = `1px 1px 8px 1px #${randomColor}`;

            // setTimeout will run a function after a certain amount of time has passed in this case 0.05s
            setTimeout(function() {event.target.classList.remove("grow-grid")}, 50);
        }

        else if (eraserMode == 1) {
            event.target.style.backgroundColor = "white";
            event.target.style.border = "1px solid #f0f0f0";

            shadowColor.style.boxShadow = `1px 1px 8px 1px ${color.value}`;

            setTimeout(function() {event.target.classList.remove("grow-grid")}, 50);
        }
    }
}

// takes the value of a clicked button and clears grid if the value is clear
function clearGrid(clicked_value) {
   if (clicked_value == "clear") {

        // same as the slider input. Creates an array out of the div elements
        // deletes them, and redraws the grid

        const gridElement = Array.from(document.getElementsByClassName("grid-element"));

        gridElement.forEach(i => {
            i.remove();
        });

       gridSetup(sliderValue);
   }
}

window.onload = () => {
    gridSetup(sliderValue);
    shadowColor.style.boxShadow = `1px 1px 8px 1px ${color.value}`;
}