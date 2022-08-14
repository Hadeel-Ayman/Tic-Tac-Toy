var restartbtn = document.querySelector("#restartbtn");
var boxes = Array.from(document.getElementsByClassName("box"));
var playerText = document.querySelector('#playerText');
let winnerIndect = getComputedStyle(document.body).getPropertyValue('--winning_blocks');


const PLAYERX = 'X';
const PLAYERO = 'O';
let CurrentPlayer = 'X';
let spaces = Array(9).fill(null);
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    if (!spaces[id]) {
        spaces[id] = CurrentPlayer
        e.target.innerText = CurrentPlayer
        if (playerHasWon() !== false) {
            playerText = `${CurrentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndect)
            return
        }
        CurrentPlayer = CurrentPlayer == PLAYERX ? PLAYERO : PLAYERX;
    }
}
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]
function playerHasWon() {
    for (const condition of winning) {
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false;
}
restartbtn.addEventListener('click', restart);


function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
        
    })
    playerText = 'Tic Tac Toe'
    CurrentPlayer = PLAYERX
}
startGame()





















// function handleResultValidate(){
//     let roundwon = false;
//     for(let i = 0; i<=7; i++){
//         const winCondition = winning[i];
//         const a =
//     }
// }

// const aa = (type) => {
//     switch (type) {
//         case PLAYERO_WON:
//             announcer.innerHTML = `Player <span>O</span>`;
//             break;
//         case PLAYERX_WON:
//             announcer.innerHTML = `Player <span>X</span>`;
//             break;
//         default:
//             announcer.innerHTML = `not found`
//     }
//     announcer.classList.remove('hide');
// }
// const changePlayer = () => {
//     playerDisplay.classList.remove(`player${CurrentPlayer}`);
//     CurrentPlayer = CurrentPlayer == 'X' ? 'O' : 'X';
//     playerDisplay.innerText = CurrentPlayer;
//     playerDisplay.classList.add(`player${CurrentPlayer}`);
// }

// const userAction = (box, index) => {
//     if (isValidAction(box) && isGameActive) {
//         box.innerText = CurrentPlayer;
//         box.classList.add(`player ${CurrentPlayer}`);
//         updateBoard(index);
//         handleResultValidate();
//         changePlayer();
//     }
// }



// boxes.forEach((box, index) => {
//     box.addEventListener('click', () => userAction(box, index));

// });



















// let CurrentPlayer = 'X';
// function checkWinner(){
//     winning.forEach(function(combination){
//         let check = combination.every(idx => boxes[idx].innerText.trim() == CurrentPlayer)
//         if(check){
//             highlighBox(combination)
//         }
//     })
// }
// function highlighBox(combination){
//     combination.forEach(function(idx){
//         boxes[idx].classList.add('highlight')
//     })
// }
// boxes.forEach(function (box) {
//     box.addEventListener('click', function () {
//         if (box.innerText.trim() != "") return
//         box.innerText = CurrentPlayer;
//         checkWinner()
//         CurrentPlayer = CurrentPlayer == 'X' ? 'O' : 'X';
//     })
// })

