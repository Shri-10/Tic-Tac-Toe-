const tictactoeGame=new TicTacToeGame();
// Starts the game
tictactoeGame.start();
function TicTacToeGame(){
  document.querySelector('.endgame').style.display = 'none';
  document.querySelector('.circle1').style.animation='react1';
  document.querySelector('.rectangle1').style.animation='react1';
  document.querySelector('.leg3').style.animation='react1';
  document.querySelector('.leg4').style.animation='react1';
  document.querySelector('.rect').style.animation='react1';
  const arr=Array.from(document.querySelectorAll('.col-xs-4'));
  for(var i = 0; i < arr.length; i++) {
    arr[i].innerText = '';
    arr[i].style.removeProperty('background-color');}
  // Declaring the OOP's to constructor's function
  const board=new Board();
  const humanPlayer=new HumanPlayer(board);
  const computerPlayer=new ComputerPlayer(board);
  // Declaring turn for human to play first
  let turn=0;
  this.start=function(){
    const config={childList:true};
    // Observes each movement made in the cell
    const observer=new MutationObserver(()=>takeTurn());
    board.positions.forEach((el)=>observer.observe(el,config));
    //Calling taketurn to call the human and computer to play back to back
    takeTurn();
    }
  function takeTurn(){
    //Checks for win
    if (board.checkForWinner()){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.circle1').style.animation='react 4s linear infinite';
      document.querySelector('.rectangle1').style.animation='react 4s linear infinite';
      document.querySelector('.leg3').style.animation='react 4s linear infinite';
      document.querySelector('.leg4').style.animation='react 4s linear infinite';
      document.querySelector('.rect').style.animation='react 4s linear infinite';
      document.querySelector('.endgame .text').innerText = 'You Lost!';
      turn=0;
      return true ;
    }
    // Checks for tie
    else if (board.checkForTie(board)){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'Tie';
      turn=0;
      return true;
    }
    // Calling human and computer to make their moves
    if (turn<9){
    if (turn%2===0){
      humanPlayer.takeTurn();
    }else if(turn%2!==0){
      computerPlayer.takeTurn();
    }
  }
  turn++;
}
}

function checkIfWon(arr,g){
  var posi=[];
  var posj=[];
  var p=0;
  var q=0;
  var h=0;
  var k=0;var l=0;var r=0;
  var newarray = [];
  for(var i=0;i < arr.length;i =i+3){
    newarray.push(arr.slice(i,i+3));}
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      if (newarray[i][j]==g){
        posi.push(i);
        posj.push(j);
        if (i==j){
          p=p+1;
        }if ((i==j && i==1)||i-j==2||j-i==2){
          q=q+1;
        }
      }
    }
  }
  if (p==3){
    h=1;
  }else if (q==3){
    h=1;
  }
  if (posi.length>=3){
    for(i=0;i<posi.length;i++){
      if (posi[i]==posi[i]){
        if (posi[i]==0){
          k=k+1;
        }
        else if(posi[i]==1){
          l=l+1;
        }else if (posi[i]==2){
          r=r+1;
        }
      }
    }
  }
  if (k==3||l==3||r==3){
    h=1;
  }
  k=0;l=0;r=0;
  if (posj.length>=3){
    for(i=0;i<posj.length;i++){
      if (posj[i]==posj[i]){
        if (posj[i]==0){
          k=k+1;
        }
        else if(posj[i]==1){
          l=l+1;
        }else if (posj[i]==2){
          r=r+1;
        }
      }
    }
  }
  if (k==3||l==3||r==3){
    h=1;
  }
  if (h==1){
    return 1;
  }else{
    return false;
  }
}

function Board(){
  // Getting all the positions from the cells.
  this.positions=Array.from(document.querySelectorAll('.col-xs-4'));
  this.checkForWinner=function(){
    let winner=false;
    const WinningCombinations=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
     ];
    const positions=this.positions;
    WinningCombinations.forEach((winningCombo)=>{
      const pos0InnerText=positions[winningCombo[0]].innerText;
      const pos1InnerText=positions[winningCombo[1]].innerText;
      const pos2InnerText=positions[winningCombo[2]].innerText;
      const iswinningCombo=pos0InnerText !==''&&
        pos0InnerText===pos1InnerText&& pos1InnerText===pos2InnerText;
      if (iswinningCombo){
        winner=true;
        for (i=0;i<winningCombo.length;i++){
          positions[winningCombo[i]].style.backgroundColor = 'red';}
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
          // Makes the move in respective place where the human clicked
          event.target.innerText='X';
          board.positions.forEach(el=>el.removeEventListener('click',handleTurnTaken));
        }
      }
    }
  }

function ComputerPlayer(board){
  this.takeTurn = function(){
    var array=[0,1,2,3,4,5,6,7,8];
    var array1=[0,1,2,3,4,5,6,7,8];
    // Getting all the positions of X, O and available positions
    const arr=Array.from(document.querySelectorAll('.col-xs-4'));
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    const occupiedPositionsX = board.positions.filter((p)=>p.innerText==='X');
    const occupiedPositionsO = board.positions.filter((p)=>p.innerText==='O');
    // Converting all the positions to array form
    for(i=0;i<arr.length;i++){
      for(j=0;j<occupiedPositionsX.length;j++){
        if (arr[i]==occupiedPositionsX[j]){
          var x="X";
          array.splice(i,1,x);
          array1.splice(i,1,x);
        }
      }
    }
    for(i=0;i<arr.length;i++){
      for(j=0;j<occupiedPositionsO.length;j++){
        if (arr[i]==occupiedPositionsO[j]){
          var y="O";
          array.splice(i,1,y);
          array1.splice(i,1,y);

        }
      }
    }
    for(i=0;i<arr.length;i++){
      for(j=0;j<availablePositions.length;j++){
        if (arr[i]==availablePositions[j]){
          var z=availablePositions[j];
          array1.splice(i,1,z);
        }
      }
    }
    // Calling minimax to make the move
    var move=minimax(array,"O")[0];
    array1[move].innerText='O';
  }
}
// Getting the available positions in the array
function pos(arr){
  var pos=[];
  for(v=0;v<arr.length;v++){
    if ((arr[v]!="X") && (arr[v]!="O")){
      pos.push(arr[v]);
    }
  }
  return pos;
}

function minimax(array,turn){
  var score;
  if (turn=="X"){
    var opponent="O";
  }else{
    opponent="X";
  }
  var best_pos;
  var max_score=-10;
  var p=pos(array);
  var i; var j;
  for(i=0;i<array.length;i++){
    for(j=0;j<p.length;j++){
      if (array[i]==p[j]){
        array.splice(i,1,turn);
        const ii=i;
        const jj=j;
        const k=p[j];
        // Checks for win
        if (checkIfWon(array,turn)==1){
          score=1;
        }
        // Checks for available position for further move
        else if (pos(array).length===0){
          score=0;
        }
        else{
          score=-minimax(array,opponent)[1];
        }
        i=ii;
        j=jj;
        array.splice(i,1,p[j]);
        if (score>max_score){
          best_pos=p[j];
          max_score=score;
        }
      }
    }
  }
  // Appends position and best score in the result to return
  const result=[];
  result.splice(0,1,best_pos);
  result.splice(1,1,max_score);
  return result;
 }
