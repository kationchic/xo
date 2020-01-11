var Cell = function(i,j) {	
	//содержимое ячейки (x или o или пустая)
	this.content='';
	//место ячейки под этим солнцем
	this.cell_i=i;
	this.cell_j=j;	

	this.elem = document.getElementById('cell-'+i+'-'+j);
}
///////////////////////////////////
//пустая ли ячейка или с сюрпризом
Cell.prototype.isEmpty = function(){	
	if (this.content=='') return true; else return false;
}
//заполняем ячейку X
Cell.prototype.setX= function(){
	if (this.isEmpty())
	{
		this.content='x';
		this.elem.classList.add("blue");
	}
}
//заполняем ячейку O
Cell.prototype.setO= function(){
	if (this.isEmpty()) 
	{
		this.content='o';
		this.elem.classList.add("green");
	}
}
Cell.prototype.cellClick= function(){	
	this.elem.dispatchEvent(new CustomEvent("cell_click", {
	    detail: { 
	    	'i': this.cell_i, 
	    	'j': this.cell_j
	    },
	    bubbles: true
	}));	
}
//создаем событие нажатия на ячейку
Cell.prototype.cellWaitClick= function(){
	this.elem.addEventListener("click", this.cellClick.bind(this));
}