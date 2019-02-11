var game_div;
var gameBox_div;
var restart_span;

const rows = 4;
const cols = 4;

const hue = [
    "#ff0000",
    "#ff8800",
    "#faff00",
    "#3bff00",
    "#0004ff",
    "#9d00ff",
    "#ff00dc",
    "#00f2ff"
];
const background = "#3e4e6d";

var row = new Array(rows);
var circle = [];
var currentCircle = new Array(2);
var newPair = true;
var circlesChanged = true;

class Circle {
    constructor(element, circleColor, circleState){
        this.elem = element;
        this.color = circleColor;
        this.state = circleState || false;
    }
}
onload = function() {
    game_div = document.getElementById("game");
    gameBox_div = document.getElementById("game-box");
    restart_span = document.getElementById("restart-text");
    setup();
}
function setup(){
    for(let i = rows-1; i > -1; i--){
        row[i] = document.createElement("div");
        row[i].classList.add("row");
        gameBox_div.appendChild(row[i]);
        circle[i] = [];
        for(let j = 0; j < cols; j++){
            circle[i][j] = new Circle(document.createElement("div"));
            circle[i][j].elem.classList.add("circle");
            circle[i][j].elem.setAttribute("id", "circle" + (cols*i + j));
            circle[i][j].elem.addEventListener("click", function(){
                if(!(circle[i][j].state) && circlesChanged){
                    if(newPair){
                        firstCircle(circle[i][j]);
                    }else{
                        secondCircle(circle[i][j]);
                    }
                }
            });
            row[i].appendChild(circle[i][j].elem);
        }
    }
    restart_span.addEventListener("click", function(){reset()});
    setColors();
}
function setColors(){
    let colorSet;
    let frequency = [0, 0, 0, 0, 0, 0, 0, 0];
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            colorSet = false;
            while(!(colorSet)){
                rnd = Math.floor(Math.random()*8);
                if(frequency[rnd] != 2){
                    circle[i][j].color = hue[rnd];
                    frequency[rnd]++;
                    colorSet = true;
                }
            }
        }
    }
}
function firstCircle(circle){
    currentCircle[0] = circle;
    circle.elem.style.backgroundColor = circle.color;
    circle.state = true;
    newPair = false;
}
function secondCircle(circle){
    currentCircle[1] = circle;
    circle.elem.style.backgroundColor = circle.color;
    circle.state = true;

    if(currentCircle[0].color != currentCircle[1].color){
        circlesChanged = false;
        setTimeout(function(){resetCircles()}, 500);
    }
    newPair = true;
}
function resetCircles(){
    for(let i = 0; i < 2; i++){
        currentCircle[i].elem.style.backgroundColor = background;
        currentCircle[i].state = false;
        circlesChanged = true;
    }
}
function reset(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            circle[i][j].elem.style.backgroundColor = background;
            circle[i][j].state = false;
        }
    }
    newPair = true;
    circlesChanged = true;
    setColors();
}