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
	start(){ //zhi �hui zai di yi zhen zhi xing
	}
	update(){ //mei yi zhen zhi xing yi ci

	}
	on_destroy(){ //bei xiao hui qian zhi xing
	}
	destroy(){ //shan diao dang qian wu ti
		this.on_destroy();
		for(let i = 0 ; i < AC_GAME_OBJECTS.length ; i++){
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
class Particle extends AcGameObject {
    constructor(playground, x, y, radius, color, vx, vy, speed, move_length){
        super();
        this.playground = playground;
        this.x = x;
        this.y = y;
        this.ctx = this.playground.game_map.ctx;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.speed = speed;
        this.color = color;
        this.friction = 0.9;
        this.move_length = move_length;
        this.eps = 1;
    }
    start(){

    }
    update(){
        if(this.move_length < this.eps || this.speed < this.eps){
            this.destroy();
            return false;
        }
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}class Player extends AcGameObject{
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
        this.eps = 0.1;
        this.vx = 0;
        this.vy = 0;
        this.move_length = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.friction = 0.9;
        this.spend_time = 0;

        this.cur_skill = null;
    }
    start(){
        if(this.is_me){
            this.add_listening_events();
        }else{
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }
    add_listening_events(){
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function(){
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e){
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if(e.which === 3){
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            }else{
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX - rect.left, e.clientY - rect.top);
                }

                outer.cur_skill = null;
            }
        });
        $(window).keydown(function(e){
            if(e.which === 81){ // q
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }
    shoot_fireball(tx, ty){
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1;
        new FireBall(this.playground, this, x, y, radius, vx, vy ,color, speed, move_length, this.playground.height * 0.007);
    }
    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    move_to(tx, ty){
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }
    is_attacked(angle, damage){
        for(let i = 0; i < 20 + Math.random() * 10;i ++){
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random() * 0.23;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            let color = "red";
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x, y, radius, color, vx, vy, speed, move_length);
        }
        this.radius -= damage;
        if(this.radius < 10){
            this.destroy();
            return false;
        }
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed * 1.5;
    }
    update(){
        if(!this.is_me){
            this.spend_time += this.timedelta / 1000;
            if(this.spend_time > 4 && Math.random() < 1 / 300.0){
                let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
                if(player !== this){
                    let tx = player.x + player.speed * player.vx * this.timedelta / 1000 * 0.3;
                    let ty = player.y + player.speed * player.vy * this.timedelta / 1000 * 0.3;
                    this.shoot_fireball(tx, ty);
                }
            }
        }
        if(this.damage_speed > 10){
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
        }else{
            if(this.move_length < this.eps){
                this.move_length = 0;
                this.vx = this.vy = 0;
                if(!this.is_me){
                    let tx = Math.random() * this.playground.width;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            }else{
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
                this.x += moved * this.vx;
                this.y += moved * this.vy;
                this.move_length -= moved;
            }
        }
        
        this.render();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    on_destroy(){
        for(let i = 0;i < this.playground.players.length; i ++ ){
            if(this === this.playground.players[i]){
                this.playground.players.splice(i, 1);
            }
        }
    }
}
class FireBall extends AcGameObject{
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage){
        super();
        this.playground = playground;
        this.player = player;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.ctx = this.playground.game_map.ctx;
        this.move_length = move_length;
        this.damage = damage;
        this.eps = 0.1
    }
    start(){

    }
    update(){
        if(this.move_length < this.eps){
            this.destroy();
            return false;
        }
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        for(let i = 0;i < this.playground.players.length ; i ++){
            let player = this.playground.players[i];
            if(this.player !== player && this.is_collision(player)){
                this.attack(player);
            }
        }
        
        this.render();
    }
    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    is_collision(player){
        let distance = this.get_dist(this.x, this.y, player.x, player.y);
        if(distance < this.radius + player.radius){
            return true;
        }
        return false;
    }
    attack(player){
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
        this.destroy();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}class AcGamePlayground{
	constructor(root){
		this.root = root;
		this.$playground = $(`<div class="ac-game-playground"></div>`);
		this.hide();
		
		this.start();
	}
	get_random_color(){
		let colors = ["yellow", "bule", "green", "pink", "grey", "pink"];
		return colors[Math.floor(Math.random() * 6)];
	}
	start(){

	}
	update(){

	}
	show(){   // da kai playground jie mian
		this.root.$ac_game.append(this.$playground);
		
		this.width = this.$playground.width();
		this.height = this.$playground.height();
		this.game_map = new GameMap(this);
		this.players = [];
		this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

		for(let i = 0;i < 5;i++){
			this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false))
		}
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
		this.menu = new AcGameMenu(this);
		this.playground = new AcGamePlayground(this);
	
		this.start();
    	}
	start(){

	}
}