'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '*';
var SUPER_MODE_GHOST_ING = 'imgs/harmless.png';
var CHERRY = 'imgs/cherry.png';
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
  isSuperMode: false
};
var gFoodCollected;
var gFoodsNum;
var gCherryInterval;

function init() {
  //reset previuos session
  hideModals()
  gFoodCollected = 1;
  gFoodsNum = 0;
  gGame.isSuperMode = false;
  gGame.score = 0;

  //creat new board
  gBoard = buildBoard();
  createPacman(gBoard);
  createSuperFood();
  createGhosts(gBoard);
  addCherry()
  //show the board
  renderBoard(gBoard, '.board-container');
  renderCell(gPacman.location, gPacmanHTML)
  renderGhosts()
  //now we can start
  gGame.isOn = true;
}


function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      } else gFoodsNum++
    }
  }
  return board;
}


function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}


function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function checkCurrCellContent(i, j) {
  return gBoard[i][j];
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function addCherry() {
  gCherryInterval = setInterval(function () {
    var emptyLocations = findEmptyCells()
      if (emptyLocations.length > 0) {
        var randCell = emptyLocations[getRandomIntInclusive(0,  emptyLocations.length - 2)]
        gBoard[randCell.i][randCell.j] = CHERRY
        renderCell({ i: randCell.i, j: randCell.j }, `<img class="cherry" src=${CHERRY}>`)
        setTimeout(function () {
          gBoard[randCell.i][randCell.j] = EMPTY
          renderCell({ i: randCell.i, j: randCell.j }, EMPTY)
        }, 4000)
      }
    }, 10000)
}

function findEmptyCells() {
  var emptyLocations = []
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) emptyLocations.push({ i: i, j: j })
    }
  }
  return emptyLocations
}

function createSuperFood() {
  gBoard[1][1] = SUPER_FOOD
  gBoard[gBoard.length - 2][gBoard.length - 2] = SUPER_FOOD
  gBoard[1][gBoard.length - 2] = SUPER_FOOD
  gBoard[gBoard.length - 2][1] = SUPER_FOOD
}

function enterSuperFoodMode() {
  gGame.isSuperMode = true;
  for (let i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i]
    var ghostHTML = `<img src="${SUPER_MODE_GHOST_ING}">`
    renderCell(ghost.location, ghostHTML)
  }
  setTimeout(function () {
    gGame.isSuperMode = false
    renderGhosts()
    while (gGhosts.length < 1) {
      createGhost()
    }
  }, 5000)
}


function showLoseModal() {
  gameOver()
  var elLoseModal = document.querySelector('.modal.lose');
  elLoseModal.style.display = 'block';

}

function showWinModal() {
  gameOver()
  var elWinModal = document.querySelector('.modal.win')
  elWinModal.style.display = 'block';
}

function gameOver() {
  clearInterval(gGhostsInterval);
  clearInterval(gCherryInterval);
  gGame.isOn = false;
}


function hideModals() {
  var elWinModal = document.querySelector('.modal.win')
  elWinModal.style.display = 'none';
  var elLoseModal = document.querySelector('.modal.lose')
  elLoseModal.style.display = 'none';
}






