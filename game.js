
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
		this.playing = false;

	}
	/*Creamos un prototype para agregar los diferentes elementos del juego.*/
	self.Board.prototype = {
		get elements(){
			var elements = this.bars.map(function(bar){ return bar; });
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
		this.speed = 10;

		this.board.bars.push(this);

	}

	self.Bar.prototype = {
		 up: function(){
		 	this.y += this.speed;
		},
		 down: function(){
		 	this.y -= this.speed;
		},
		toString: function(){
			return "x: " +this.x +" y: " +this.y;
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
		this.speed_x = 3;
		this.speed_y = 0;

		this.direction = 1;

	}

	self.Ball.prototype = {
		move: function(){
			this.x += (this.speed_x * this.direction);
			this.y += (this.speed_y);
		}
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

		clean: function(){
			this.ctx.clearRect(0,0, this.board.width, this.board.height);
		},

		draw: function(){
			for(var i = this.board.elements.length - 1; i >= 0; i--) {
				var el = this.board.elements[i];
				console.log(el);
				draw(this.ctx, el);
			}
		},
		play: function(){
			if (this.board.playing == true)	{
				this.clean();
				this.draw();
				this.board.ball.move();
			}
		}
	}

	function draw(ctx, element){
		console.log(element);
		switch(element.kind){
			case "rectangle":
				ctx.fillRect(element.x, element.y, element.width, element.height);
				break;
			case "circle":
					ctx.beginPath();
					ctx.arc(element.x, element.y, 10, 0, 7, true);
					ctx.fill();
					ctx.closePath();
				break;
			}
		}



	})();

/*MAIN QUE EJECUTARA EL JUEGO*/
//Declaracion de variables
var board = new Board(800,400);
var bar1 = new Bar(20,100,40,100,board);
var bar2 = new Bar(740,100,40,100,board);
var ball = new Ball(300,100,board);
var canvas = document.getElementById('myCanvas');
var board_view = new BoardView(canvas,board);

document.addEventListener('keydown', function(e){

	if(e.keyCode == 40){
		e.preventDefault();
		bar1.up();
	}
	else if(e.keyCode == 38){
		e.preventDefault();
		bar1.down();
	}
	else if(e.keyCode == 87){
		e.preventDefault();
		bar2.down();
	}
	else if(e.keyCode == 83){
		e.preventDefault();
		bar2.up();
	}
	else if(e.keyCode == 32){
		e.preventDefault();
		board.playing =! board.playing;
	}

	console.log(""+bar1);
	console.log(""+bar2);

});


window.requestAnimationFrame(controller);

function controller(){
	board_view.play();
	window.requestAnimationFrame(controller);
}

