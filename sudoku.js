var puzzle = new Array();

function initializePuzzle() {
    for (a = 0; a < 9; a++) {
        puzzle[a] = new Array();
        for (b = 0; b < 9; b++) {
            puzzle[a][b] = 0;
        }
    }
}

function checkcolumn(column) {
    nums[10] = new Array();
    for (a = 0; a < 9; a++)
        nums[puzzle[a][column]]++;
    for (i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkrow(row) {
    nums[10] = new Array();
    for (a = 0; a < 9; a++)
        nums[puzzle[row][a]]++;
    for (i = 1; i < 10; i++)
        if (nums[i] > 1)
            return false;
    return true;
}

function checkinnersquare(squareno) {
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
