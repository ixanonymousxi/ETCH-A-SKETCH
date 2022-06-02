let gridSize = 256;
let gridBoxes = [];

function createGrid(size){
    for(let i = 0; i < size; i++){
        let box = document.createElement('div');
        box.classList.add("box-style");
        document.querySelector("#container").appendChild(box);
        gridBoxes.push(box)
        /*
        box.addEventListener('mousemove', function () {
            this.classList.add("black-bg");
        });
        */
    }
}


function addColor(){
    this.classList.add("black-bg");
}

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

createGrid(gridSize);

