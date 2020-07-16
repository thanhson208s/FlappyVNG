/**
 * Created by HP on 7/9/2020.
 */


var Flappy = cc.Sprite.extend({

    ctor: function(x, y)
    {
        //singleton
        this._super("flappy/bird/BWup.png");
        Flappy._instance = this;
        //singleton

        //basic attributes
        this.setScale(0.25, 0.25);
        this.x0 = x;
        this.y0 = y;
        //basic attributes

        //properties
        this.rate = 10;
        this.index = 0;
        this.spriteNames = [];
        this.versions = ["yellow", "BW", "red", "blue"];
        //properties
    },

    initGame: function()
    {
        var version = this.versions[Math.floor(Math.random() * this.versions.length)];
        this.spriteNames = ["flappy/bird/" + version + "up.png", "flappy/bird/" + version + "mid.png", "flappy/bird/" + version + "down.png", "flappy/bird/" + version + "mid.png"];
        this.setPosition(this.x0, this.y0);
        this.rotation = 0;

        var animation = cc.Animation();
        for (var i = 0; i < this.spriteNames.length; i++){
            animation.addSpriteFrameWithFile(this.spriteNames[i]);
        }
        animation.setDelayPerUnit(1/this.rate);
        var animate = cc.Animate(animation).repeatForever();
        animate.setTag(0);
        this.runAction(animate);
    }
});

Flappy.Instance = function(){ return Flappy._instance; }