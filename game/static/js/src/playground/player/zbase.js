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
