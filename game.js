
/*Creamos el modelo BOARD del juego. Todos los elementos que contendra, por ejemblo barras
pelota, y el tamaño del tablero (Board)*/
(function(){

	self.Board = function(width,height){

		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;

	}
	/*Creamos un prototype para agregar los diferentes elementos del juego.*/
	self.Board.prototype = {
		get elements(){
			var elements = this.bars;
			elements.push(this.ball);
			return elements;
		}
	}

})();

/*Creamos el modelo de las Barras*/

(function(){
	self.Bar = function(x, y, width, height, board ){

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.kind = 'rectangle';

		this.board.bars.push(this);

	}

	self.Bar.prototype = {
		 up: function(){

		},
		 down: function(){

		}
	}
})();

/*Creamos el modelo de la bola*/

(function(){

	self.Ball = function(x, y, board){

		this.x = x;
		this.y = y;
		this.board = board;
		this.kind = 'circle';

		this.board.ball = this;
		console.log(this.board.elements);

	}
})();

	/*Creamos la VISTA del juego. Recibira por parametro el canvas y el board para mostrarlo*/

(function(){

	self.BoardView = function(canvas, board){

		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		this.ctx = canvas.getContext("2d");
	}

	self.BoardView.prototype = {

		draw: function(){
			for(var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];
				draw(this.ctx, el);
			}
		}
	}

	function draw(ctx, element){
		if(element !== null || element.hasOwnProperty(kind)) {
			switch(element.kind){
			case "rectangle":
				ctx.fillRect(element.x, element.y, element.width, element.height);
				break;
			case "circle":
				    ctx.arc(element.x, element.y, 10, 0, 7, true);
    				ctx.fill();
				break;
			}
		}	
	}
		
})();

/*MAIN QUE EJECUTARA EL JUEGO*/

window.addEventListener('load', main);

function main(){

	var board = new Board(800,400);
	var bar = new Bar(20,100,40,100,board);
	var bar = new Bar(740,100,40,100,board);
	var ball = new Ball(300,100,board);
	var canvas = document.getElementById('myCanvas');
	var board_view = new BoardView(canvas,board);

	board_view.draw();
}

