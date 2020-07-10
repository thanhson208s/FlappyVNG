/**
 * Created by HP on 7/9/2020.
 */


var Flappy = cc.Sprite.extend({

    ctor: function(){
        this._super("flappy/bird/up.png");

        this.zIndex = 0;
        this.setScale(0.4, 0.4);
        this.rate = 5;
        this.count = 0;
        this.index = 0;

        this.spriteNames = ["flappy/bird/up.png", "flappy/bird/mid.png", "flappy/bird/down.png", "flappy/bird/mid.png"];
        this.scheduleUpdate();
    },
    update: function(dt){
        this.count += dt;
        if (this.count >= 1/this.rate){
            this.count -= 1/this.rate;
            this.index = (this.index + 1) % 4;
            var spriteFrame = new cc.SpriteFrame(this.spriteNames[this.index], cc.rect(0,0,175,122));
            this.setSpriteFrame(spriteFrame);
        }
    }
});