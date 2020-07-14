/**
 * Created by HP on 7/13/2020.
 */

var PointSystem = cc.Layer.extend({
    ctor: function(width, height)
    {
        //singleton
        this._super();
        PointSystem._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setPosition(width/2, height/2);
        //basic attributes

        //properties
        this.score = 0;
        this.highScore = 0;
        //properties

        this.num2Sprites(this.score);
    },

    num2Sprites: function(score){
        this.removeAllChildren();
        var numList = [];
        if (score == 0) numList.push(0);
        else{
            while (score > 0){
                numList.push(score % 10);
                score = Math.floor(score/10);
            }
        }

        var curX = 10;
        for (var i = numList.length - 1; i >= 0; i--){
            var sprite = new cc.Sprite("flappy/num/" + parseInt(numList[i]) + ".png");
            this.addChild(sprite);
            curX += sprite.width * sprite.getScaleX() * 1.1;
            sprite.setPosition(curX - this.width/2, this.height/2 - sprite.height * sprite.getScaleY());
        }
    },

    increaseScore: function(){
        this.num2Sprites(++this.score);
    }
});

PointSystem.Instance = function(){ return PointSystem._instance; }

