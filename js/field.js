
var Field= function(size, elem, status){
	//размеры поля
	this.field_width=size;
	this.field_height=size;
	this.elem=elem;
	this.status=status;
	//ячейки в этом поле
	this.field_cells=new Array();	
	//создаем корпоратив ячеек	
	for(var i=0; i<this.field_width; i++)
	{
		this.field_cells[i] = new Array();
		for(var j=0; j<this.field_height; j++)
		{			
			this.field_cells[i][j]=new Cell(i,j);
			this.field_cells[i][j].cellWaitClick();
		}
	}
	//текущий игрок
	this.gamer=0; //0-x; 1-o 
	this.status.innerHTML=now_x;	
}
////////////////////////////////
//реагируем на клик
Field.prototype.doClick = function(i,j){
	if(this.field_cells[i][j].content=="")
	{
		//заполняем ячейки
		if(this.gamer)
			this.field_cells[i][j].setO();
		else
			this.field_cells[i][j].setX();
		//выводим на экран
		this.field_cells[i][j].elem.innerHTML=this.field_cells[i][j].content;		
		//проверяем состоянии игры	
		this.checkGame(i,j);
	}
}
//проверяем как идет игра
Field.prototype.checkGame = function (ci,cj){	
	var cnt=this.field_cells[ci][cj].content;

	//меняем игрока
	this.gamer=!this.gamer;
	if(this.gamer) this.status.innerHTML=now_o; else this.status.innerHTML=now_x;

	//если мы на диагонали
	if(ci==cj){
		this.checkD(cnt);
	}
	this.checkV(ci,cnt);
	this.checkH(cj,cnt);
	this.checkC();	
}
///////////////////////////////////////////
///////////////////////////////////////////
//совпала ли диагональ
Field.prototype.checkD = function(cnt){
	var line=0;

	for(var i=0; i<this.field_width; i++)			
		for(var j=0; j<this.field_height; j++)
		{			
			if(i==j)
			{
				if(this.field_cells[i][j].content==cnt) line++;				
			}
		}
	
	if(line==this.field_width)
		this.sendWin();
	
}
//совпала ли ветикаль
Field.prototype.checkV = function(c_i,cnt){
	var line=0;

	
	for(var j=0; j<this.field_height; j++)				
		if(this.field_cells[c_i][j].content==cnt) line++;	
	
	if(line==this.field_width)
		this.sendWin();
	
}
//совпала ли горизонталь
Field.prototype.checkH = function(c_j,cnt){
	var line=0;

	for(var i=0; i<this.field_width; i++)			
		if(this.field_cells[i][c_j].content==cnt) line++;
			

	if(line==this.field_width)
		this.sendWin();
	
}
//что там с игрой
Field.prototype.checkC = function(){
var line=0;

	for(var i=0; i<this.field_width; i++)			
		for(var j=0; j<this.field_height; j++)					
			if(this.field_cells[i][j].content!='') line++;
					

	if(line==(this.field_width*this.field_height))
		this.elem.dispatchEvent(end_game);
	
}
//кто-то победил
Field.prototype.sendWin = function(){	
	if(!this.gamer)
		this.elem.dispatchEvent(winY);
	else
		this.elem.dispatchEvent(winX);
}
