class AcGamePlayground{
	constructor(root){
		this.root = root;
		this.$playground = $(`<div>Game Interface</div>`);
		this.hide();
		this.root.$ac_game.append(this.$playground);

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
