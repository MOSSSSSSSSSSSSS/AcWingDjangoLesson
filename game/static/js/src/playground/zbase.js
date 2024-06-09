class AcGamePlayground{
	constructor(root){
		this.root = root;
		this.$playground = $(`<div class="ac-game-playground"></div>`);
		//this.hide();
		this.root.$ac_game.append(this.$playground);
		
		this.width = this.$playground.width();
		this.height = this.$playground.height();
		this.game_map = new GameMap(this);
		this.start();
	}
	start(){

	}
	update(){

	}
	show(){   // da kai playground jie mian
		this.$playground.show();
	}
	hide(){   // guan bi playground jie mian
		this.$playground.hide();
	}
}
