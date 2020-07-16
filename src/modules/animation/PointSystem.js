/**
 * Created by HP on 7/13/2020.
 */


var PointSystem = cc.Layer.extend({
    ctor: function(width, height)
    {
        this._super();
        PointSystem.instance = this;
        this.width = width;
        this.height = height;
        this.zIndex = 1;
        this.point = 0;
        this.num2Sprites(this.point);
    },
    num2Sprites: function(num){
        this.removeAllChildren();
        var numList = [];
        if (num == 0) numList.push(0);
        else{
            while (num > 0){
                numList.push(num % 10);
                num = Math.floor(num/10);
            }
        }

        var i, curX = 10;
        for (i = numList.length - 1; i >= 0; i--){
            var sprite = new cc.Sprite("flappy/num/" + parseInt(numList[i]) + ".png");
            this.addChild(sprite);
            curX += sprite.width * sprite.getScaleX() * 1.1;
            sprite.setPosition(curX - this.width/2, this.height/2 - sprite.height * sprite.getScaleY());
        }
    },
    increasePoint: function(){
        this.point++;
        this.num2Sprites(this.point);
    }
})