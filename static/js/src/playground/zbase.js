class AcGamePlayground{
	constructor(root){
		this.root = root;
		this.$playground = $(`<div class="ac-game-playground"></div>`);
		this.hide();
		this.root.$ac_game.append(this.$playground);
		this.start();
	}
	get_random_color(){
		let colors = ["yellow", "bule", "green", "pink", "grey", "red"];
		return colors[Math.floor(Math.random() * 6)];
	}
	start(){
		let outer = this;
		$(window).resize(function(){
			outer.resize();
		});
	}
	update(){

	}
	show(){   // da kai playground jie mian
		this.$playground.show();
		
		this.width = this.$playground.width();
		this.height = this.$playground.height();
		this.game_map = new GameMap(this);
		this.resize();
		this.players = [];
		this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.15, true));

		for(let i = 0;i < 5;i++){
			this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.15, false))
		}
	}
	resize(){
		this.width = this.$playground.width();
		this.height = this.$playground.height();
		let unit = Math.min(this.width / 16, this.height / 9);
		this.width = unit * 16;
		this.height = unit * 9;
		this.scale = this.height;
		if(this.game_map)this.game_map.resize();
	}
	hide(){   // guan bi playground jie mian
		this.$playground.hide();
	}
}
