var puzzle = [];//new Array();
var immutable = [];//new Array();

function initializePuzzle() {
    for (var a = 0; a < 9; a++) {
        puzzle[a] = [];//new Array();
        for (var b = 0; b < 9; b++) {
            puzzle[a][b] = 0;
        }
    }
}

function checkColumn(column) {
    var nums = new Array(10);
    for (var a = 0; a < 9; a++)
        nums[parseInt(puzzle[a][column])]++;
    for (var i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkRow(row) {
    var nums = new Array(10);
    for (a = 0; a < 9; a++)
        nums[parseInt(puzzle[row][a])]++;
    for (i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkInnerSquare(squareNo) {
    var startRow = 0;
    if (squareNo < 3) {
        startRow = 0;
    }
    else if (squareNo < 6) {
        startRow = 3;
    } else {
        startRow = 6;
    }
    startCol = (squareNo % 3) * 3;

    var nums = new Array(10);
    for (var outer = 0; outer < 3; outer++)
        for (var inner = 0; inner < 3; inner++)
            nums[parseInt(puzzle[startRow + outer][startCol + inner])]++;
    for (var a = 1; a < 10; a++)
        if (nums[a] > 1)
            return false;
    return true;
}

function getGridNo(row, col) {
    // I divide by 3 then multiply by 3 to lose precision, getting an answer that is
    // 0, 3, or 6. This is the row offset
    // Then I add the col / 3 to get the number of the grid
    return ((row / 3) * 3) + (col / 3);
}

function isSolved() {
    for (var a = 0; a < 9; a++) {
        for (var b = 0; b < 9; b++) {
            if (puzzle[a][b] == 0)
                return false;
        }
        if (!checkColumn(a))
            return false;
        else if (!checkRow(a))
            return false;
        else if (!checkInnerSquare(a))
            return false;
    }
    return true;
}

function findStartCol() {
    for (var a = 0; a < 9; a++)
        if (puzzle[0][a] == 0)
            return a;
    return -1;
}

function getPrevNonImmutablePos(row, col) {
    do {
        if (col == 0 && row > 0) {
            col = 8;
            row--;
        } else
            col--;
    } while (immutable[row][col] != 0)
    return 9 * row + col;
}

function initializeImmutable() {
    for (var r = 0; r < 9; r++) {
        immutable[r] = new Array();
        for (var c = 0; c < 9; c++)
            immutable[r][c] = puzzle[r][c] > 0 ? 1 : 0;
    }
}

function clearImmutable() {
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++)
            immutable[r][c] = 0;
}

function clearPuzzle() {
  for (var r = 0; r < 9; r++)
      for (var c = 0; c < 9; c++)
          puzzle[r][c] = 0;
}

function setPuzzle(newPuzzle) {
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++)
            puzzle[r][c] = newPuzzle[r][c];
    initializeImmutable();
}

function getPuzzle() {
    return puzzle;
}

function sudokuSolve(row, col) {
    // loop runs while the puzzle isn't solved
    while (!isSolved()) {
        //Immutable is an array of 0's and 1's where 1's indicate a part of the puzzle that can't be changed
        //If we are at a pos of an immutable number, go to the next one
        if (immutable[row][col] == 1) {
            if (col < 8)
                col++;
            else {
              row++;
              col = 0;
            }
            //Using the continue statement to jump back to start of while loop
            continue;
        } else {
            var testNo;
            //If the position is empty, start from beginning testing values
            if (puzzle[row][col] == 0 || isNaN(puzzle[row][col]))
                testNo = 1;
            //If not, set testno to the next value
            else
                testNo = puzzle[row][col] + 1;
            //This bool is to exit the for loop once a value is successfully placed in the puzzle
            var success = false;
            for (testNo; testNo < 10 && !success; testNo++) {
                puzzle[row][col] = testNo;
                if (checkRow(row) && checkColumn(col) && checkInnerSquare(getGridNo(row, col))) { //something wrong here
                    if (col < 8)
                        col++;
                    else {
                        row++;
                        col = 0;
                    }
                    success = true;
                }
            }
            //To prevent undoing work, start again if value was successfully added
            if (success)
                continue;
            //getprevnonimmutable pos returns an int that is the numerical position in the puzzle
            //I can take this pos and get the new row and column
            var tempIndex = getPrevNonImmutablePos(row, col);
            var newRow = parseInt(tempIndex / 9);
            var newCol = tempIndex % 9;
            puzzle[row][col] = 0;
            row = newRow > 0 ? newRow : 0;
            col = newCol;
        }
    }
}
