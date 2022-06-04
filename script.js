let gridSize = 256;
let gridBoxes = [];
let currentColor = "black";
let colorBoxes = document.querySelectorAll(".colors");

function createGrid(size){
    let containerHeight = document.querySelector("#container").offsetHeight;
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

    if(this.id === "yellow" || this.id === "white" || this.id === "orange"){
        this.style.border = "#906D2D 2px solid";
        colorBoxes.forEach(x => {
            if(x.id !== this.id){
                x.style.removeProperty("border");
            }
        });
    }else{
        this.style.border = "#FFB62D 2px solid";
        colorBoxes.forEach(x => {
            if (x.id !== this.id) {
                x.style.removeProperty("border");
            }
        });
    }
    
}

function addColor(){
    //this.classList.add("black-bg");
    this.style.background = currentColor;
}


colorBoxes.forEach(x => {
    x.addEventListener("click", changeColor);
});

//Activates 'drawing' action on click 
//and Deactivates 'drawing' action once click is released.
//This allows user to click and drag mouse to fill in boxes.

window.addEventListener("mousedown", function(){
    gridBoxes.forEach(x => {
        x.addEventListener('mousemove', addColor);
    });
});

window.addEventListener("mouseup", function () {
    gridBoxes.forEach(x => {
        x.removeEventListener('mousemove', addColor);
    });
});



function getUserInput(timesAsked){
    let prompt;

    if(timesAsked > 1){
        prompt = "Oops! That's not a valid number. The original Etch-A-Sketch grid size is 16x16. Please enter a number between 10 and 100 to determine a new grid size.";
    }else{
        prompt = "The original Etch-A-Sketch grid size is 16x16. Please enter a number between 10 and 100 to determine a new grid size.";
    }

    let input = window.prompt(prompt, "16");

    if (input === null) {
        return 16;
    }else if (parseInt(input) >= 10 && parseInt(input) <= 100){
        return parseInt(input);
    }else{
        return getUserInput(2);
    }
}

function reset(){
    let userInput = getUserInput(1);
    gridSize = userInput * userInput;
    gridBoxes.forEach(box => document.querySelector("#container").removeChild(box));
    gridBoxes = [];
    document.querySelector("#container").setAttribute('style', `grid-template:repeat(${userInput},1fr) / repeat(${userInput}, 1fr)`);
    createGrid(gridSize);
}


createGrid(gridSize);

document.querySelector("#reset").addEventListener("click", reset);


