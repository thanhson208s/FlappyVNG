/**
 * Created by HP on 7/9/2020.
 */


var Background = cc.Layer.extend({
    ctor: function(width, height)
    {
        //singleton
        this._super();
        Background._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setPosition(width/2, height/2);
        //basic attributes

        //properties
        this.speed = 30;
        this.backgrounds = ["first", "second"];
        this.distanceBetweenBackgrounds = this.width * (1 - 100/1464);
        //properties

        var firstSprite = new cc.Sprite("flappy/background.png");
        firstSprite.setScale(this.width/firstSprite.width, this.height/firstSprite.height);
        firstSprite.setPosition(0, 0);
        this.addChild(firstSprite, 0, this.backgrounds[0]);

        var secondSprite = new cc.Sprite("flappy/background.png");
        secondSprite.setScale(firstSprite.getScaleX(), firstSprite.getScaleY());
        secondSprite.setPosition(this.distanceBetweenBackgrounds, 0);
        this.addChild(secondSprite, 0, this.backgrounds[1]);

        this.scheduleUpdate();
    },

    update: function(dt)
    {
        for (var i = 0; i < this.backgrounds.length; i++){
            this.getChildByName(this.backgrounds[i]).x -= this.speed * dt;
        }

        var firstBackground = this.getChildByName(this.backgrounds[0]);
        if (this.x + firstBackground.x  <= this.width/2 - this.distanceBetweenBackgrounds){
            firstBackground.x += 2 * this.distanceBetweenBackgrounds;
            this.backgrounds.push(this.backgrounds.shift());
        }
    }
});

Background.Instance = function(){ return Background._instance; }