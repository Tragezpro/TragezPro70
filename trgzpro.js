const SelectionBox = document.querySelector('.selectBox');
SelectXBtn= SelectionBox.querySelector('.playerX');
SelectOBtn= SelectionBox.querySelector('.playerO');
const playBoard = document.querySelector('.playBoard');
const allBoxes = document.querySelectorAll('section span');
let allPlayers = document.querySelector('.players');
let resultDisplayed = document.querySelector('.resultBox');
 wonInformation = resultDisplayed.querySelector('.wonText');
let replayBtn = document.querySelector('.btn');

window.onload = ()=>{
    for(let i = 0; i < allBoxes.length; i++){
        allBoxes[i].setAttribute('onclick', 'clicked(this);')
    }

    SelectXBtn.onclick = ()=>{
        SelectionBox.classList.add('hide');
        playBoard.classList.add('show');
    }
    SelectOBtn.onclick = ()=>{
        SelectionBox.classList.add('hide');
        playBoard.classList.add('show');
        allPlayers.setAttribute('class', 'players active player');//add 3 class on player element.
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = 'X';
let runBot = true;

//User click functions
function clicked(element) {
    
    //console.log(element)
    //playerSign = 'O';
    if(allPlayers.classList.contains('player')){
        element.innerHTML = `<i class = "${playerOIcon}"></i>`; //Add O icon
        allPlayers.classList.add('active')
        playerSign = 'O';
        element.setAttribute('id', playerSign)
    }else{
        element.innerHTML = `<i class = "${playerXIcon}"></i>`; //Add X icom
        allPlayers.classList.add('active')
        element.setAttribute('id', playerSign)
}
    selectAwinner(); // call a winner function
    allPlayers.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //delay time for bot to select a box random
    setTimeout(()=>{
        botMan(runBot); // Calling bot function  
    }, randomDelayTime); 
}

//Bot click functions
//change the playerSign
function botMan(runBot){
    if(runBot){
        playerSign = 'O';
        var botArray = []; //An empty array for storing unselected box index.
        for (let i = 0; i < allBoxes.length; i++) {
            if(allBoxes[i].childElementCount == 0){
                botArray.push(i);
                //console.log(i + " " + "boxes which have no children(emtpy boxes)")
            }
    }
        let randomBox = botArray[Math.floor(Math.random() * botArray.length)];
        //console.log(randomBox)
        if(botArray.length > 0){
            if(allPlayers.classList.contains('player')){
                allBoxes[randomBox].innerHTML = `<i class = "${playerXIcon}"></i>`;//Add X icon
                allPlayers.classList.remove('active')
                playerSign = 'X';
                allBoxes[randomBox].setAttribute('id', playerSign)
            }else{
                allBoxes[randomBox].innerHTML = `<i class = "${playerOIcon}"></i>`;//Add O icom
                allPlayers.classList.remove('active')
                allBoxes[randomBox].setAttribute('id', playerSign)
        }
        selectAwinner(); // call a winner function
    }
        allBoxes[randomBox].style.pointerEvents = 'none';
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
        //allBoxes[randomBox].innerHTML
        //console.log(botArray)
    }
}

//selection of the winner
function getIdnames(idName){
    return document.querySelector('.box' + idName).id; // retrun id name
}

function checkThreeIdnames(val1, val2, val3, sign){
    if(getIdnames(val1) == sign && getIdnames(val2) == sign && getIdnames(val3) == sign){
        return true;
    }
}

function selectAwinner(){
    if(checkThreeIdnames(1,2,3, playerSign) || checkThreeIdnames(5,6,7, playerSign) || checkThreeIdnames(6,7,8, playerSign) ||  checkThreeIdnames(1,473, playerSign) || checkThreeIdnames(2,5,8, playerSign) || checkThreeIdnames(3,6,9, playerSign) || checkThreeIdnames(1,5,9, playerSign) || checkThreeIdnames(3,5,7, playerSign) ||  checkThreeIdnames(4,5,6, playerSign) ||  checkThreeIdnames(7,8,9, playerSign) ||  checkThreeIdnames(1,4,7, playerSign)){
        console.log(playerSign + " " + "is the winner")
        runBot = false;
        botMan();
        setTimeout(()=>{
            playBoard.classList.remove('show');
            resultDisplayed.classList.add('show')
        }, 700)

        wonInformation.innerHTML = `<p>Player ${playerSign}</p> won the game!`;}

        // let show winner
        if(getIdnames(1) != "" && getIdnames(2) != "" && getIdnames(3) != "" && getIdnames(4) != "" && getIdnames(5) != "" && getIdnames(6) != "" && getIdnames(7) != "" && getIdnames(8) != "" && getIdnames(9) != "" ){
            wonInformation.innerHTML = `Match gone drawn`;
        }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}