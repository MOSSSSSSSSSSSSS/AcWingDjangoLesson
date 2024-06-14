class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS){
            this.platform = "ACAPP";
        }
        this.start();
    }
    start(){
        this.getinfo();
    }
    login(){

    }
    register(){
        
    }
    getinfo(){
        let outer = this;
        $.ajax({
            url: "https://app6931.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform, 
            },
            success: function(resp){
                if(resp.result === "success"){
                    outer.hide();
                    outer.root.menu.show();
                }else{
                    outer.login();
                }
            }
        })
    }
    hide(){

    }
}