/**
 * Created by HP on 7/9/2020.
 */


var Flappy = cc.Sprite.extend({

    ctor: function(x, y)
    {
        //singleton
        this._super();
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
        this.versions = ["yellow", "BW", "red", "blue"];
        this.animations = [];
        this.version = 0;
        //properties

        for (var i = 0; i < this.versions.length; i++){
            var spriteNames = ["up", "mid", "down", "mid"].map(function(x){
                return "flappy/bird/" + this.versions[i] + x + ".png";
            }.bind(this));
            var animation = new cc.Animation();

            for (var j = 0; j < spriteNames.length; j++){
                animation.addSpriteFrameWithFile(spriteNames[j]);
            }
            animation.setDelayPerUnit(1/this.rate);
            animation.retain();

            this.animations.push(animation);
        }
    },

    initGame: function()
    {
        this.setPosition(this.x0, this.y0);
        this.rotation = 0;

        var animation = this.animations[this.version];
        var animate = cc.Animate(animation).repeatForever();
        animate.setTag(0);
        this.runAction(animate);
    },

    changeColorTo:function(color)
    {
        this.version = this.versions.indexOf(color);
        
        var animation = this.animations[this.version];
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