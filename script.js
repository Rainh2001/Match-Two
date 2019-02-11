// HTML element variables
var game_div;
var gameBox_div;
var restart_span;

// 4x4 matrix of circles
const rows = 4;
const cols = 4;

// Array for each color
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

// Game variables
var row = new Array(rows);
var circle = new Array(rows*cols);  
var currentCircle = new Array(2);
var newPair = true;
var circlesChanged = true;

// Each circle is an object of this class
class Circle {
    constructor(element, circleColor, circleState){
        this.elem = element;
        this.color = circleColor;
        this.state = circleState || false;
    }
}
// Cache HTML elements
onload = function() {
    game_div = document.getElementById("game");
    gameBox_div = document.getElementById("game-box");
    restart_span = document.getElementById("restart-text");
    setup();
}
// Create 4 row divs, and create 4 circle divs in each row
// Also implement event listener for circle clicks
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
// Assign the circles with their colors
// There can only be two of the same color
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
// First circle click simply changes the color and passes the circle to an array
function firstCircle(circle){
    currentCircle[0] = circle;
    circle.elem.style.backgroundColor = circle.color;
    circle.state = true;
    newPair = false;
}
// Second circle click checks whether or not the colors of the two circles are the same
// If they are, they stay colored. If they don't match, the colors disappear
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
// Reset the board and all game variables
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
