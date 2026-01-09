const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const clickSound = new Audio("assets/sounds/click.mp3");
const successSound = new Audio("assets/sounds/success.mp3");
const errorSound = new Audio("assets/sounds/error.mp3");

let stars = [];
let found = 0;

function randomStars(){
  stars=[];
  while(stars.length<3){
    let r=Math.floor(Math.random()*9);
    if(!stars.includes(r)) stars.push(r);
  }
}
randomStars();

function vibrate(pattern){
  if(navigator.vibrate){
    navigator.vibrate(pattern);
  }
}

cells.forEach(cell=>{
  cell.addEventListener("click", ()=>{
    let id = parseInt(cell.dataset.id);
    clickSound.play();

    if(stars.includes(id) && !cell.classList.contains("found")){
      cell.classList.add("found");
      cell.innerHTML="⭐";
      found++;
      vibrate([200,100,200]);
      successSound.play();
    }else{
      vibrate(100);
      errorSound.play();
    }

    statusText.innerText=`Bintang ditemukan: ${found} / 3`;

    if(found===3){
      setTimeout(()=>{
        alert("Hebat! Semua bintang ditemukan!");
        vibrate([300,150,300,150,300]);
      },500);
    }
  });
});

document.getElementById("restart").addEventListener("click",()=>{
  cells.forEach(c=>{
    c.classList.remove("found");
    c.innerHTML="";
  });
  found=0;
  randomStars();
  statusText.innerText="Bintang ditemukan: 0 / 3";
});
