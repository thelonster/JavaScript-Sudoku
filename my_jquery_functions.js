$(document).ready(function(){
    $(".solve").click(function(){
        solve();
    });
    $(".clear").click(function(){
        clearTablePuzzle();
    });
});

function getArrayFromTable() {
    var tablePuzzle = new Array();
    for (var r = 0; r < 9; r++) {
        tablePuzzle[r] = new Array();
        for (var c = 0; c < 9; c++)
            tablePuzzle[r][c] = parseInt($("#c"+ r + c).val());//change this to get empty values as 0's
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
    sudokuSolve(0,findStartCol());
    var puzzle = getPuzzle();
    setTableFromArray(puzzle);
}
