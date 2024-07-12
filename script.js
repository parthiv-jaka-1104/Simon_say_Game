let gameseq = [];
let userseq = [];

let buttons = ["red", "yellow", "blue", "purple"];

let started = false;
let level=0;

let highestScore = localStorage.getItem("highestScore") || 0;
highestScore = parseInt(highestScore);

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

h3.innerText = `Highest Score: ${highestScore}`;


document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game start");
    started = true;

    levelUp();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  

  // randomNumber
  let randIdx = Math.floor(Math.random() * 3);
  console.log(randIdx);
  let randColor = buttons[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  console.log(gameseq);
  gameflash(randBtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp(), 1000);
    }
  } else {
    if(level>highestScore){
        highestScore = level;
        localStorage.setItem("highestScore", highestScore);
        h3.innerText = `Highest Score: ${highestScore}`;
    }
    h2.innerText = `Game Over your score is ${level} Press any Key to Start a game`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userflash(btn);

  let usercolor = btn.getAttribute("id");
  userseq.push(usercolor);

  checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

