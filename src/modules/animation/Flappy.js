/**
 * Created by HP on 7/9/2020.
 */


var Flappy = cc.Sprite.extend({

    ctor: function(x, y)
    {
        //singleton
        this._super("flappy/bird/up.png");
        Flappy._instance = this;
        //singleton

        //basic attributes
        this.setScale(0.3, 0.3);
        this.setPosition(x, y);
        //basic attributes

        //properties
        this.rate = 10;
        this.index = 0;
        this.spriteNames = ["flappy/bird/up.png", "flappy/bird/mid.png", "flappy/bird/down.png", "flappy/bird/mid.png"];
        //properties

        this.schedule(this.wing, 1/this.rate);
    },

    wing: function()
    {
        this.index = (this.index + 1) % this.spriteNames.length;
        this.setSpriteFrame(new cc.SpriteFrame(this.spriteNames[this.index], cc.rect(0,0,175,122)));
    }
});

Flappy.Instance = function(){ return Flappy._instance; }