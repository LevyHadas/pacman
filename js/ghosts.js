var GHOST = '&#9781;';

var gGhostsInterval;
var gGhosts;

function createGhosts() {
    // Empty the gGhosts array, create some ghosts
    gGhosts = [];
    createGhost();
    // createGhost();
    // createGhost();
    // Run the interval to move them
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost() {
    randI = getRandomIntInclusive(1, gBoard.length - 2);
    randJ = getRandomIntInclusive(1, gBoard.length - 2);
    var ghost = {
        location: {
            i: randI,
            j: randJ
        },
        currCellContent: checkCurrCellContent(randI, randJ),
        imgSrc: getRandomImgSrc()
    };
    if (gBoard[ghost.location.i][ghost.location.j] === PACMAN || gBoard[ghost.location.i][ghost.location.j] === GHOST) return
    gGhosts.push(ghost);
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        
        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }
        
        // define next cell
        var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // If WALL return
        if (nextCell === GHOST) continue;
        if (nextCell === WALL) continue;
        // If Pacman --> DETECT gameOver
        if (nextCell === PACMAN) showLoseModal();

        // Set back what we stepped on
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // Move the ghost MODEL
        ghost.currCellContent = nextCell;
        ghost.location = nextLocation
        gBoard[ghost.location.i][ghost.location.j] = GHOST;

        // Updade the DOM 
        if (gGame.isSuperMode) {
            renderCell(ghost.location, `<img class="eat-ghost" src="${SUPER_MODE_GHOST_ING}">`)
        } else renderCell(ghost.location, getGhostHTML(ghost))
    }
}

// There are 4 options where to go
function getMoveDiff() {
    // return { i: getRandomIntInclusive(-1, 1), j: getRandomIntInclusive(-1, 1) }
    var opts = [{ i: 0, j: 1 }, { i: 1, j: 0 }, { i: -1, j: 0 }, { i: 0, j: -1 }];
    return opts[getRandomIntInclusive(0, opts.length - 1)];
}


function getGhostHTML(ghost) {
    return `<img src="${ghost.imgSrc}">`
}


function eatGhost(pos) {
    for (let i = 0; i < gGhosts.length; i++) {
        currGhost = gGhosts[i]
        var ghostPosI = currGhost.location.i
        var ghostPosJ = currGhost.location.j
        if (ghostPosI === pos.i && ghostPosJ === pos.j) {
            //if we eat monster with food under it, we eat the food as well
            if (currGhost.currCellContent === FOOD || currGhost.currCellContent === SUPER_FOOD) {
                currGhost.currCellContent = EMPTY
                updateScore(1)
                gFoodCollected++
            }
            gGhosts.splice(i, 1)
        }
    }
    //remove from board
    //remove form gGhosts
}

function renderGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        ghost = gGhosts[i]
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}





