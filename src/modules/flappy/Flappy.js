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
        this.setScale(0.25, 0.25);
        this.x0 = x;
        this.y0 = y;
        //basic attributes

        //properties
        this.rate = 10;
        this.index = 0;
        this.spriteNames = ["flappy/bird/up.png", "flappy/bird/mid.png", "flappy/bird/down.png", "flappy/bird/mid.png"];
        //properties
    },

    initGame: function()
    {
        this.setPosition(this.x0, this.y0);
        this.rotation = 0;
        this.schedule(this.wing, 1/ScreenFlappy.Instance().dtAfterTimeScale(this.rate));
    },

    wing: function(dt)
    {
        if (ScreenFlappy.Instance().timeScale == 0) return;
        this.index = (this.index + 1) % this.spriteNames.length;
        this.setSpriteFrame(new cc.SpriteFrame(this.spriteNames[this.index], cc.rect(0,0,175,122)));
    }
});

Flappy.Instance = function(){ return Flappy._instance; }