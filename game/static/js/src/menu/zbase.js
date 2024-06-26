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
		<div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
			Logout
		</div>
	</div>
</div>
`);
		this.$menu.hide();
		this.root.$ac_game.append(this.$menu);
		this.$single = this.$menu.find('.ac-game-menu-field-item-single');
		this.$multi = this.$menu.find('.ac-game-menu-field-item-multi');
		this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

		this.start();
	}

	start() {
		this.add_listening_events();
	}
	add_listening_events(){
		let outer = this;
		this.$single.click(function(){
			outer.hide();
			outer.root.playground.show("single mode");
		});
		this.$multi.click(function(){
			outer.hide();
			outer.root.playground.show("multi mode");
		});
		this.$settings.click(function(){
			outer.root.settings.logout_on_remote();
		});
	}
	show(){  //zhan shi menu jie mian
		this.$menu.show();
	}
	hide(){  //guan bi menu jie mian
		this.$menu.hide();
	}
}
