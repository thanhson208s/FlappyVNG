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

        this.backgroundSpeed = -20;

        this.firstSprite = new cc.Sprite("flappy/background.png");
        this.firstSprite.setScale(this.width/this.firstSprite.width, this.height/this.firstSprite.height);
        this.addChild(this.firstSprite);
        this.secondSprite = new cc.Sprite("flappy/background.png");
        this.secondSprite.setScale(this.firstSprite.getScaleX(), this.firstSprite.getScaleY());
        this.addChild(this.secondSprite);

        this.firstSprite.setPosition(0, 0);
        this.secondSprite.setPosition(this.width * (1-100/this.firstSprite.width), 0);

        this.scheduleUpdate();
    },
    update: function(dt){
        var dx = this.backgroundSpeed * dt;
        this.firstSprite.x += dx;
        this.secondSprite.x += dx;

        if (this.firstSprite.x <= - this.width * (1-100/this.firstSprite.width)){
            this.firstSprite.x += 2 * this.width * (1-100/this.firstSprite.width);
            var temp = this.firstSprite;
            this.firstSprite = this.secondSprite;
            this.secondSprite = temp;
        }
    }
});