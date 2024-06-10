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
	}
	show(){  //zhan shi menu jie mian
		this.$menu.show();
	}
	hide(){  //guan bi menu jie mian
		this.$menu.hide();
	}
}
let AC_GAME_OBJECTS = [];

class AcGameObject{
	constructor(){
		AC_GAME_OBJECTS.push(this);
		this.has_called_start = false;
		this.timedelta = 0; // dang qian ju li shang yi zhen shi jian jian ge hao miao
	}
	start(){ //zhi ähui zai di yi zhen zhi xing
	}
	update(){ //mei yi zhen zhi xing yi ci

	}
	on_destroy(){ //bei xiao hui qian zhi xing
	}
	destroy(){ //shan diao dang qian wu ti
		this.on_destroy();
		for(let i = 0;i<AC_GAME_OBJECTS.length;i++){
			if(AC_GAME_OBJECTS[i] === this){
				AC_GAME_OBJECTS.splice(i, 1);
				break;
			}
		}
	}
}
let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp){
	
	for(let i = 0;i<AC_GAME_OBJECTS.length;i++){
		let obj = AC_GAME_OBJECTS[i];
		if(!obj.has_called_start){
			obj.start();
			obj.has_called_start = true;
		}else{
			obj.timedelta = timestamp - last_timestamp;
			obj.update();
		}
	}
	last_timestamp = timestamp;
	requestAnimationFrame(AC_GAME_ANIMATION);
}
requestAnimationFrame(AC_GAME_ANIMATION);
class GameMap extends AcGameObject{
	constructor(playground){
		super();
		this.playground = playground;
		this.$canvas = $(`<canvas></canvas>`);
		this.ctx = this.$canvas[0].getContext('2d');
		this.ctx.canvas.width = this.playground.width;
		this.ctx.canvas.height = this.playground.height;
		this.playground.$playground.append(this.$canvas);
	}
	render(){
		this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
	start(){

	}
	update(){
		this.render();
	}
}
class Player extends AcGameObject{
    constructor(playground, x, y, radius, color, speed, is_me){
        super();
        this.x = x;
        this.y = y;
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.radius = radius;
        this.speed = speed;
        this.is_me = is_me;
        this.color = color;
    }
}
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
export class AcGame {
    	constructor(id) {
		this.id = id;
		this.$ac_game = $(`#` + id);
		//this.menu = new AcGameMenu(this);
		this.playground = new AcGamePlayground(this);
	
		this.start();
    	}
	start(){

	}
}
