window.addEventListener("load",initEvents)
function initEvents(){
    loadButton();
}
winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function loadButton(){
table=document.querySelector("#tableForTicTac");
for(let i=0; i<3;i++){
    let tr=table.insertRow();
    for(let j=0;j<3;j++){
        let td=tr.insertCell();
        btn=document.createElement("button");
        btn.className="btn";
        btn.addEventListener("click",userMove);
        td.appendChild(btn);
       
    }
}
}
function userMove(){
    //user input
    this.innerHTML="X";
    //no updation of btn is allowed
    this.setAttribute("disabled",true);
    if(checkWinner()){
        return;
    }
    makeComputerMove();
}
// to get 50-50 prob..we can use random factor VARIABLE
// function makeComputerMove() {
//     var btns = document.querySelectorAll(".btn");

//     // Introduce randomness in the computer's decision-making
//     var randomFactor = Math.random();

//     // 1. If random factor is low, play optimally
//     if (randomFactor > 0.5) {
//         let move = findBestMove("O");
//         if (move !== null) {
//             btns[move].innerHTML = "O";
//             btns[move].setAttribute("disabled", true);
//             checkWinner();
//             return;
//         }

//         move = findBestMove("X");
//         if (move !== null) {
//             btns[move].innerHTML = "O";
//             btns[move].setAttribute("disabled", true);
//             checkWinner();
//             return;
//         }
//     }

//     // 2. If random factor is high, play suboptimally or randomly
//     if (!btns[4].innerHTML && randomFactor > 0.7) {
//         btns[4].innerHTML = "O";
//         btns[4].setAttribute("disabled", true);
//         checkWinner();
//         return;
//     }

//     const corners = [0, 2, 6, 8];
//     for (let corner of corners) {
//         if (!btns[corner].innerHTML && randomFactor > 0.3) {
//             btns[corner].innerHTML = "O";
//             btns[corner].setAttribute("disabled", true);
//             checkWinner();
//             return;
//         }
//     }

//     var emptyButtons = [];
//     for (var i = 0; i < btns.length; i++) {
//         if (!btns[i].disabled) {
//             emptyButtons.push(i);
//         }
//     }

//     if (emptyButtons.length > 0) {
//         var randomIndex = Math.floor(Math.random() * emptyButtons.length);
//         btns[emptyButtons[randomIndex]].innerHTML = "O";
//         btns[emptyButtons[randomIndex]].setAttribute("disabled", true);
//         checkWinner();
//     }
// }
//computer wins the most
function makeComputerMove() {
    var btns = document.querySelectorAll(".btn");

    // Function to check for a potential win or block
    function findBestMove(symbol) {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (btns[a].innerHTML === symbol && btns[a].innerHTML === btns[b].innerHTML && !btns[c].innerHTML) {
                return c;
            }
            if (btns[a].innerHTML === symbol && btns[a].innerHTML === btns[c].innerHTML && !btns[b].innerHTML) {
                return b;
            }
            if (btns[b].innerHTML === symbol && btns[b].innerHTML === btns[c].innerHTML && !btns[a].innerHTML) {
                return a;
            }
        }
        return null;
    }

    // 1. Check if the computer can win
    let move = findBestMove("O");
    if (move !== null) {
        btns[move].innerHTML = "O";
        btns[move].setAttribute("disabled", true);
        checkWinner();
        return;
    }

    // 2. Block the user's winning move
    move = findBestMove("X");
    if (move !== null) {
        btns[move].innerHTML = "O";
        btns[move].setAttribute("disabled", true);
        checkWinner();
        return;
    }

    // 3. Choose a strategic position (center first, then corners, then random)
    if (!btns[4].innerHTML) {
        btns[4].innerHTML = "O";
        btns[4].setAttribute("disabled", true);
        checkWinner();
        return;
    }

    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (!btns[corner].innerHTML) {
            btns[corner].innerHTML = "O";
            btns[corner].setAttribute("disabled", true);
            checkWinner();
            return;
        }
    }

    // 4. If no strategic move is found, choose a random empty button
    var emptyButtons = [];
    for (var i = 0; i < btns.length; i++) {
        if (!btns[i].disabled) {
            emptyButtons.push(i);
        }
    }

    if (emptyButtons.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyButtons.length);
        btns[emptyButtons[randomIndex]].innerHTML = "O";
        btns[emptyButtons[randomIndex]].setAttribute("disabled", true);
        checkWinner();
    }
}
// user wins mostly
// function makeComputerMove() {
//         var btns = document.querySelectorAll(".btn");
//         var emptyButtons = [];
    
//         // Collect all available (not disabled) buttons
//         for (var i = 0; i < btns.length; i++) {
//             if (!btns[i].disabled) {
//                 emptyButtons.push(i);
//             }
//         }
    
//         if (emptyButtons.length > 0) {
//             // Choose a random empty button for the computer's move
//             var randomIndex = Math.floor(Math.random() * emptyButtons.length);
//             btns[emptyButtons[randomIndex]].innerHTML = "O";
//             btns[emptyButtons[randomIndex]].setAttribute("disabled", true);
    
//             checkWinner();
//         }
//     }
function checkWinner(){
    var btns=document.querySelectorAll(".btn");
    for(let combo of winningCombinations){
        [a,b,c]=combo;
        //first check if a has some value
        if(btns[a].innerHTML && btns[a].innerHTML===btns[b].innerHTML && btns[a].innerHTML===btns[c].innerHTML){
                alert(btns[a].innerHTML+"has won");
                return true;
            }
            
    }
    return false;
    // if(winningCombinations.this.innerHtml="X"){
    //     alert("user wins");
    // }
}
//td.textContent='';
//td.addEventListener('click',()=>makeMove(i,j));





