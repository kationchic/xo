var winX = new Event("winX", {bubbles: true}); //игра выиграна X
var winY = new Event("winY", {bubbles: true}); //игра выиграна O
var end_game = new Event("end_game", {bubbles: true});//кликаем по клетке

var now_x = "Ход Х";
var now_o = "Ход O";
var win_x = "Победа Х!";
var win_o = "Победа O!";
var no_win = "Ничья!";