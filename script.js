let gridSize = 256;
let gridBoxes = [];
let currentColor = "black";
const colorBoxes = document.querySelectorAll(".colors");

function createGrid(size){
    const containerHeight = document.querySelector("#container").offsetHeight;
    document.querySelector("#container").style.width = containerHeight + 'px';

    for(let i = 0; i < size; i++){
        let box = document.createElement('div');
        box.classList.add("box-style");
        gridBoxes.push(box);

        document.querySelector("#container").appendChild(box);
    }
}

function changeColor(){
    currentColor = this.id;

    //Creates a border around the current color option for user experience
    if (currentColor === "yellow" || currentColor === "white" || currentColor === "orange"){
        this.style.border = "#906D2D 2px solid";
    }else{
        this.style.border = "#FFB62D 2px solid";
    }

    //Clears any active borders on any other previously chosen color for user experience
    colorBoxes.forEach(colorBox => {
        if (colorBox.id !== this.id) {
            colorBox.style.removeProperty("border");
        }
    });
    
}

function addColor(){
    this.style.background = currentColor;
}

//Activates 'drawing' action on click 
//and Deactivates 'drawing' action once click is released.
//This allows user to click and drag mouse to fill in boxes.

window.addEventListener("mousedown", function(){
    gridBoxes.forEach(box => {
        box.addEventListener('mousemove', addColor);
    });
});

window.addEventListener("mouseup", function () {
    gridBoxes.forEach(box => {
        box.removeEventListener('mousemove', addColor);
    });
});


function getUserInput(timesAsked){
    let prompt;

    if(timesAsked > 1){
        prompt = "Oops! That's not a valid number. The original Etch-A-Sketch grid size is 16x16. Please enter a number between 10 and 100 to determine a new grid size.";
    }else{
        prompt = "The original Etch-A-Sketch grid size is 16x16. Please enter a number between 10 and 100 to determine a new grid size.";
    }

    const input = window.prompt(prompt, "16");

    if (input === null) {
        return 16;
    }else if (parseInt(input) >= 10 && parseInt(input) <= 100){
        return parseInt(input);
    }else{
        return getUserInput(2);
    }
}

function reset(){
    //Gets a new grid size from user
    const userInput = getUserInput(1);
    gridSize = userInput * userInput;

    //Clears old grid
    gridBoxes.forEach(box => document.querySelector("#container").removeChild(box));
    gridBoxes = [];

    //Sets new grid to new size from user input and creates new grid
    document.querySelector("#container").setAttribute('style', `grid-template:repeat(${userInput},1fr) / repeat(${userInput}, 1fr)`);
    createGrid(gridSize);
}


createGrid(gridSize);

document.querySelector("#reset").addEventListener("click", reset);

colorBoxes.forEach(colorBox => {
    colorBox.addEventListener("click", changeColor);
});



