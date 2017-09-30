$(document).ready(function(){

});

function getArrayFromTable() {
    var tablePuzzle = new Array();
    for (var r = 0; r < 9; r++) {
        tablePuzzle[r] = new Array();
        for (var c = 0; c < 9; c++)
            tablePuzzle[r][c] = $("#c"+ r + c).val();
    }
    return tablePuzzle;
}
