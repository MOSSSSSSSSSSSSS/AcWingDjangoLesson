class AcGameMenu{
	constructor(root){
		this.root = root;
		this.$menu = $(`
<div class="ac-game-menu">
	<div class="ac-game-menu-field">
		<div class="ac-game-menu-field-item ac-game-menu-field-item-single">
			Single Player Mode
		</div>
		<br>
		<div class="ac-game-menu-field-item ac-game-menu-field-item-multi">
			Multiplayer Mode
		</div>
		<br>
		<div class="ac-game-menu-field-item ac-game-menu-field-item-settins">
			Settings
		</div>
	</div>
</div>
`);
		this.root.$ac_game.append(this.$menu);
		this.$single = this.$menu.find('.ac-game-menu-field-item-single');
		this.$multi = this.$menu.find('.ac-game-menu-field-item-multi');
		this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

		this.start();
	}

	start() {
		this.add_listening_events();
		console.log("50");
	}
	add_listening_events(){
		let outer = this;
		this.$single.click(function(){
			outer.hide();
			outer.root.playground.show();
		});
		this.$multi.click(function(){
		});
		this.$settings.click(function(){
		});
		console.log("60");
	}
	show(){  //zhan shi menu jie mian
		this.$menu.show();
	}
	hide(){  //guan bi menu jie mian
		this.$menu.hide();
	}
}
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
class AcGame {
    	constructor(id) {
		this.id = id;
		this.$ac_game = $(`#` + id);
		this.menu = new AcGameMenu(this);
		this.playground = new AcGamePlayground(this);
	
		this.start();
    	}
	start(){

	}
}
