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
