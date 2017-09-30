var puzzle = new Array();
var immutable = new Array();

function initializePuzzle() {
    for (a = 0; a < 9; a++) {
        puzzle[a] = new Array();
        for (b = 0; b < 9; b++) {
            puzzle[a][b] = 0;
        }
    }
}

function checkColumn(column) {
    nums[10] = new Array();
    for (a = 0; a < 9; a++)
        nums[puzzle[a][column]]++;
    for (i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkRow(row) {
    nums[10] = new Array();
    for (a = 0; a < 9; a++)
        nums[puzzle[row][a]]++;
    for (i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkInnerSquare(squareno) {
    startrow = 0;
    if (squareno < 3) {
        startrow = 0;
    }
    else if (squareno < 6) {
        startrow = 3;
    } else {
        startrow = 6;
    }
    startcol = (squareno % 3) * 3;

    nums[10] = new Array();
    for (outer = 0; outer < 3; outer++)
        for (inner = 0; inner < 3; inner++)
            nums[puzzle[startrow + outer][startcol + inner]]++;
    for (a = 1; a < 10; a++)
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
    for (int a = 0; a < 9; a++) {
        for (int b = 0; b < 9; b++)
            if (puzzle[a][b] == 0)
                return false;
        if (!checkcolumn(a))
            return false;
        else if (!checkrow(a))
            return false;
        else if (!checkinnersquare(a))
            return false;
    }
    return true;
}

function findStartCol() {
    for (int a = 0; a < 9; a++)
        if (puzzle[a][0] == 0)
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
    for (int r = 0; r < 9; r++) {
        immutable[r] = new Array();
        for (int c = 0; c < 9; c++)
            immutable[r][c] = puzzle[r][c] > 0 ? 1 : 0;
    }
}

function clearImmutable() {
    for (int r = 0; r < 9; r++)
        for (int c = 0; c < 9; c++)
            immutable[r][c] = 0;
}

function clearPuzzle() {
  for (int r = 0; r < 9; r++)
      for (int c = 0; c < 9; c++)
          puzzle[r][c] = 0;
}

function setpuzzle(newPuzzle) {
    for (int r = 0; r < 9; r++)
        for (int c = 0; c < 9; c++)
            puzzle[r][c] = newPuzzle[r][c];
    initializeImmutable();
}
