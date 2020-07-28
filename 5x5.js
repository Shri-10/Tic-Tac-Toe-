alert("In this challenge round, the word JOKER appears and disappears randomly after each move. When it disappears other players are free to use JOKER positions to play the regular game.");
const tictactoeGame=new TicTacToeGame();
// Starts the game
tictactoeGame.start();
function TicTacToeGame(){
  document.querySelector('.endgame').style.display = 'none';
  const arr=Array.from(document.querySelectorAll('.col-xs-4'));
  for(var i = 0; i < arr.length; i++) {
    arr[i].innerText = '';
    arr[i].style.removeProperty('background-color');}
  // Declaring the OOP's to function container
  const board=new Board();
  const humanPlayer=new HumanPlayer(board);
  const computerPlayer=new ComputerPlayer(board);
  // Assigning turn to zero for huan to start
  let turn=0;
  this.start=function(){
    const config={childList:true};
    // Observes when each move is made in the cell
    const observer=new MutationObserver(()=>takeTurn());
    board.positions.forEach((el)=>observer.observe(el,config));
    // Calls this function for human and computer to make their turns
    takeTurn();
    }
  function takeTurn(){
    // Checks for win
    if (board.checkForWinner()==5){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'You Lost!';
      turn=0;
      return true ;
    }
    if (board.checkForWinner()==10){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'You Won!';
      turn=0;
      return true ;
    }// Checks for tie
    else if (board.checkForTie(board)){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'Tie';
      turn=0;
      return true;
    }// Calling human and computer functions to make their moves back to back.
    if (turn<25){
    if (turn%2===0){
      humanPlayer.takeTurn();
    }else if(turn%2!==0){
      computerPlayer.takeTurn();
    }
  }
  turn++;
}
}


function Board(){
  // Getting all the positions from the cells
  this.positions=Array.from(document.querySelectorAll('.col-xs-4'));
  this.checkForWinner=function(){
    let winner=false;
    const WinningCombinations=[
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
     ];
    const positions=this.positions
    WinningCombinations.forEach((winningCombo)=>{
      const pos0InnerText=positions[winningCombo[0]].innerText;
      const pos1InnerText=positions[winningCombo[1]].innerText;
      const pos2InnerText=positions[winningCombo[2]].innerText;
      const pos3InnerText=positions[winningCombo[3]].innerText;
      const pos4InnerText=positions[winningCombo[4]].innerText;
      const iswinningCombo=pos0InnerText !==''&&
        pos0InnerText===pos1InnerText&& pos1InnerText===pos2InnerText &&
        pos2InnerText===pos3InnerText && pos3InnerText===pos4InnerText;
      if (iswinningCombo){
        winner=true;
        for (i=0;i<winningCombo.length;i++){
          if (pos0InnerText==='O'){
          winner=5
          positions[winningCombo[i]].style.backgroundColor = 'red';}
          else if (pos0InnerText==='X'){
            winner=10;
            positions[winningCombo[i]].style.backgroundColor = 'green';
          }
        }
      }
    });
    return winner;
  }
  this.checkForTie=function(board){
    const arr=Array.from(document.querySelectorAll('.col-xs-4'));
    // Getting the available positions in the cells
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    if (availablePositions.length==0){
      for (i=0;i<arr.length;i++){
        arr[i].style.backgroundColor = 'DarkSlateBlue';
      }
      return true;
    }else{
      return false;
    }
  }
}

function HumanPlayer(board){
  this.takeTurn = function(){
    board.positions
    .forEach(el=>el.addEventListener('click', handleTurnTaken));
    }
    function handleTurnTaken(event){
      const availablePositions = board.positions.filter((p)=>p.innerText==='');
      for (i=0;i<availablePositions.length;i++){
        if (availablePositions[i]===event.target){
          // Gets the move which human made and records it.
          event.target.innerText='X';
          board.positions.forEach(el=>el.removeEventListener('click',handleTurnTaken));
          const availablePositions = board.positions.filter((p)=>p.innerText==='');
          var k=0;
          // To make the joker appear in random spots
          if (availablePositions.length>10){
            const occupiedposj=board.positions.filter((p)=>p.innerText==='J');
            if (occupiedposj.length>0){
            for (i=0;i<occupiedposj.length;i++){
              occupiedposj[i].style.fontSize='70px';
              occupiedposj[i].innerText='';}}
          while (k<=(availablePositions.length)/2){
          const move=Math.floor(Math.random()*availablePositions.length);
          availablePositions[move].style.fontSize='24px'
          availablePositions[move].innerText='Joker';
          k=k+1;}}
          else if(availablePositions.length<2){
            const occupiedposj=board.positions.filter((p)=>p.innerText==='Joker');
            if (occupiedposj.length>0){
            for (i=0;i<occupiedposj.length;i++){
              occupiedposj[i].style.fontSize='70px';
              occupiedposj[i].innerText='';
            }
            }
            }
          }
        }
      }
    }


function ComputerPlayer(board){
  this.takeTurn = function(){
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    const move=Math.floor(Math.random()*availablePositions.length);
    availablePositions[move].innerText='O';
  }
}

