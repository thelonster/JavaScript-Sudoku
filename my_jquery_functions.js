$(document).ready(function(){
    $(".solve").click(function(){
        solve();
    });
    $(".clear").click(function(){
        clearTablePuzzle();
    });
    $(".genpuz").click(function(){
        genRandPuzzle(2);
    });
});

function getArrayFromTable() {
    var tablePuzzle = new Array();
    for (var r = 0; r < 9; r++) {
        tablePuzzle[r] = new Array();
        for (var c = 0; c < 9; c++) {
            var value = $("#c" + r + c).val();
            if ( value == "")
                tablePuzzle[r][c] = 0;
            else
                tablePuzzle[r][c] = parseInt(value);
        }
    }
    return tablePuzzle;
}

function setTableFromArray(puzzle) {
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++)
            $("#c" + r + c).val(puzzle[r][c]);
}

function clearTablePuzzle() {
  for (var r = 0; r < 9; r++)
      for (var c = 0; c < 9; c++)
          $("#c" + r + c).val("");
  clearPuzzle();
  clearImmutable();
}

function solve() {
    var tablePuzzle = getArrayFromTable();
    initializePuzzle();
    setPuzzle(tablePuzzle);
    if (!isValidPuzzle())
        alert("Please enter a valid puzzle");
    else {
        sudokuSolve(0,findStartCol());
        var puzzle = getPuzzle();
        setTableFromArray(puzzle);
    }
}

function isValidPuzzle() {
    for (var a = 0; a < 9; a++) {
        if (!checkRow(a))
            return false;
        else if (!checkColumn(a))
            return false;
        else if (!checkInnerSquare(a))
            return false;
    }
    return true;
}

function genRandPuzzle(difficulty) {
    initializePuzzle();
    generatePuzzle(difficulty);
    var puzzle = getPuzzle();
    setTableFromArray(puzzle);
}

function clearZeros() {
    var puzzle = getArrayFromTable();
    for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++)
            if (puzzle[r][c] == 0)
                $("#c" + r + c).val("");
}
