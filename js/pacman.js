var gPacman;
const PACMAN = 'pacman';
var gPacmanHTML = `<img src="imgs/pacman.png">`


function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(eventKeyboard) {
  
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);
  
  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  //TODO: try this later instead of if
  switch (nextCell) {
    case WALL:
      return;
    case FOOD:
      updateScore(1);
      gFoodCollected++
      break;
    case GHOST:
      if (!gGame.isSuperMode) {
        showLoseModal()
        renderCell(gPacman.location, EMPTY);
        return
      } else {
        eatGhost(nextLocation)
        break;
      }
    case SUPER_FOOD:
      if (gGame.isSuperMode) return
      updateScore(1)
      gFoodCollected++
      enterSuperFoodMode()
      break;
    case CHERRY:
      updateScore(10)
      break;
  }
  // Update the model to reflect leaving the current cell
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Updated the DOM
  renderCell(gPacman.location, gPacmanHTML);

  // if this was the move to win, move it and than win
  console.log(gFoodCollected, gFoodsNum)
  if (gFoodCollected === gFoodsNum) {
    showWinModal()
  }
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };
  switch (keyboardEvent.code) {
    case 'ArrowUp':
        nextLocation.i--;
        gPacmanHTML = `<div class="pacman" style="transform:rotate(270deg);"><img src="imgs/pacman.png"></div>`
        break;
      case 'ArrowDown':
        nextLocation.i++;
        gPacmanHTML = `<div class="pacman" style="transform:rotate(90deg);""><img src="imgs/pacman.png"></div>`
        break;
      case 'ArrowLeft':
        nextLocation.j--;
        gPacmanHTML = `<div class="pacman" style="transform:rotate(180deg);""><img src="imgs/pacman.png"></div>`
        break;
      case 'ArrowRight':
        nextLocation.j++;
        gPacmanHTML = `<div class="pacman" style="transform:rotate(0deg);""><img src="imgs/pacman.png"></div>`
      break;
    default: return null;
  }
  return nextLocation
}







// function movePacman2(eventKeyboard) {

//   if (!gGame.isOn) return;
//   // console.log('eventKeyboard:', eventKeyboard);

//   var nextLocation = getNextLocation(eventKeyboard);
//   // User pressed none-relevant key in the keyboard
//   if (!nextLocation) return;

//   var nextCell = gBoard[nextLocation.i][nextLocation.j];

//   // Hitting a WALL, not moving anywhere
//   if (nextCell === WALL) return;

//   // Hitting FOOD? update score and count
//   if (nextCell === FOOD) {
//     updateScore(1);
//     gFoodCollected++;

//     // Hitting super food
//   } else if (nextCell === SUPER_FOOD) {
//       if (gGame.isSuperMode && gFoodOnBoard - gFoodCollected > 1) return
//       else { //only if we are not already in super mode:
//         updateScore(1)
//         gFoodCollected++
//         enterSuperFoodMode()
//       }
//     // Hitting ghost
//   } else if (nextCell === GHOST) {
//       if (!gGame.isSuperMode) {
//         showLoseModal()
//         renderCell(gPacman.location, EMPTY);
//         return;
//       } else eatGhost(nextLocation)
//     // Hitting cherry 
//   } else if (nextCell === CHERRY) updateScore(10)

//   // Update the model to reflect leaving the current cell
//   gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
//   // Update the DOM
//   renderCell(gPacman.location, EMPTY);

//   // Update the pacman MODEL to new location  
//   gPacman.location = nextLocation;
//   gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
//   // Updated the DOM
//   renderCell(gPacman.location, PACMAN);

//   // if this was the move to win, move it and than win
//   if (gFoodCollected === gFoodOnBoard) {
//     showWinModal()
//   }
// }