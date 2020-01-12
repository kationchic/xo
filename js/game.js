
var Game= function(size,elem, status){
		this.size=size;
		this.elem=elem;
		this.status=status;
		this.field;
		this.clickvent;
		this.win_x;
		this.win_o;
		this.no_win;
}
//////////////////////////////////////
//создаем ячейки
Game.prototype.drawCells = function(){
	var cells_view="";

	for(var i=0; i<this.size; i++)
	{
		cells_view+="<div class='cell_row'>";		
		for(var j=0; j<this.size; j++)
		{
			cells_view+="<div id='cell-"+i+"-"+j+"' class='cell'></div>";
		}
		cells_view+="</div>";
	}	
	return cells_view;
};
//новая игра
Game.prototype.newGame = function(){	
	this.elem.innerHTML=this.drawCells();
	this.field = new Field(this.size, this.elem, this.status);
}
//начало игры
Game.prototype.startGame = function(){	
	//прорисовка поля
	this.newGame();
	this.clickvent = this.doClick.bind(this);
	this.elem.addEventListener("cell_click",this.clickvent);	
	
	this.win_x=this.winX.bind(this);
	this.win_o=this.winY.bind(this);
	this.no_win=this.endGame.bind(this);
	this.elem.addEventListener("winX", this.win_x);
	this.elem.addEventListener("winY", this.win_o);
	this.elem.addEventListener("end_game", this.no_win);
}
//реагируем на клик
Game.prototype.doClick = function(e){	
	this.field.doClick(e.detail['i'], e.detail['j']);
}
//конец игры
Game.prototype.winY = function(){
	this.status.innerHTML=win_o;
	this.endListening();
}
Game.prototype.winX = function(){	
	this.status.innerHTML=win_x;
	this.endListening();	
}
Game.prototype.endGame = function(){
	this.status.innerHTML=no_win;
	this.endListening();
}
//прекращаем вслушиваться
Game.prototype.endListening = function(){
	this.elem.removeEventListener("cell_click", this.clickvent);
	this.elem.removeEventListener("winX", this.win_x);
	this.elem.removeEventListener("winY", this.win_o);
	this.elem.removeEventListener("end_game", this.no_win);
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
var size =5;
var field = document.getElementById("field");
var game = new Game(size,field,document.getElementById("status"));

field.style.width = (size*30+10)+"px";

function newGame(){			
	game.newGame();	
	game.startGame();
}

var restart=document.getElementById("restart_btn");
restart.addEventListener('click',newGame);
newGame();
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////