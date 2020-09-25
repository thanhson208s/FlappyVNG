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
        this.setRotationX(90);
        this.x0 = x;
        this.y0 = y;
        //basic attributes

        //properties
        this.rate = 10;
        this.index = 0;
        this.spriteNames = [];
        this.versions = ["yellow", "BW", "red", "blue"];
        this.version = 0;
        //properties
    },

    initGame: function()
    {
        this.spriteNames = ["flappy/bird/" + this.versions[this.version] + "up.png", "flappy/bird/" + this.versions[this.version] + "mid.png", "flappy/bird/" + this.versions[this.version] + "down.png", "flappy/bird/" + this.versions[this.version] + "mid.png"];
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
    },

    changeColorTo:function(color)
    {
        this.version = this.versions.indexOf(color);
        this.spriteNames = ["flappy/bird/" + this.versions[this.version] + "up.png", "flappy/bird/" + this.versions[this.version] + "mid.png", "flappy/bird/" + this.versions[this.version] + "down.png", "flappy/bird/" + this.versions[this.version] + "mid.png"];

        var animation = cc.Animation();
        for (var i = 0; i < this.spriteNames.length; i++){
            animation.addSpriteFrameWithFile(this.spriteNames[i]);
        }
        animation.setDelayPerUnit(1/this.rate);
        var animate = cc.Animate(animation).repeatForever();
        this.stopActionByTag(0);
        animate.setTag(0);
        this.runAction(animate);
    },

    changeColorToNext:function()
    {
        this.changeColorTo(this.versions[(this.version + 1) % this.versions.length]);
    },

    changeColorToPrev:function()
    {
        this.changeColorTo(this.versions[(this.version - 1 + this.versions.length) % this.versions.length]);
    }
});

Flappy.Instance = function(){ return Flappy._instance; }