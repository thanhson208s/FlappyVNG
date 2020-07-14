/**
 * Created by HP on 7/9/2020.
 */


var Background = cc.Layer.extend({
    ctor: function(width, height)
    {
        this._super();
        this.width = width;
        this.height = height;
        this.zIndex = -1;

        this.backgroundSpeed = 30;
        this.backgrounds = ["first", "second"];

        var firstSprite = new cc.Sprite("flappy/background.png");
        firstSprite.setScale(this.width/firstSprite.width, this.height/firstSprite.height);
        this.addChild(firstSprite, 0, this.backgrounds[0]);
        var secondSprite = new cc.Sprite("flappy/background.png");
        secondSprite.setScale(firstSprite.getScaleX(), firstSprite.getScaleY());
        this.addChild(secondSprite, 0, this.backgrounds[1]);

        this.backgroundSpawnX = this.width * (1 - 100/firstSprite.width);
        firstSprite.setPosition(0, 0);
        secondSprite.setPosition(this.backgroundSpawnX, 0);

        this.scheduleUpdate();
    },
    update: function(dt){
        this.x -= this.backgroundSpeed * dt;

        var firstBackground = this.getChildByName(this.backgrounds[0]);
        if (this.x + firstBackground.x + this.width/2 <= this.width - this.backgroundSpawnX){
            firstBackground.x += 2 * this.backgroundSpawnX;
            this.backgrounds.push(this.backgrounds.shift());
        }
    }
});