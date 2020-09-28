/**
 * Created by HP on 7/13/2020.
 */

var PointSystem = cc.Layer.extend({
    ctor:function(width, height)
    {
        //singleton
        this._super();
        PointSystem._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.setPosition(width/2, height/2);
        //basic attributes

        //constants
        this.storageKey = "flappyBestScore";
        if (cc.sys.localStorage.getItem(this.storageKey) == null)
            cc.sys.localStorage.setItem(this.storageKey, 0);
        //constants
    },

    initGame:function()
    {
        this.score = 0;
        this.bestScore = cc.sys.localStorage.getItem(this.storageKey);
    },

    show:function(){
        this.score2Sprites(0);
    },

    hide:function(){
        this.removeAllChildren();
    },

    score2Sprites:function(score)
    {
        this.removeAllChildren();
        var numList = [];
        if (score == 0) numList.push(0);
        else{
            while (score > 0){
                numList.push(score % 10);
                score = Math.floor(score/10);
            }
        }

        var curX = 55;
        for (var i = numList.length - 1; i >= 0; i--){
            var sprite = new cc.Sprite("flappy/num/" + parseInt(numList[i]) + ".png");
            this.addChild(sprite);
            sprite.setPosition(curX - this.width/2, this.height/2 - sprite.height * sprite.getScaleY());
            curX += sprite.width * sprite.getScaleX() + 2;
        }
    },

    increaseScore:function(point)
    {
        var oldPoint = this.score % CHALLENGE_THRESHOLD;
        this.score += point;
        var newPoint = this.score % CHALLENGE_THRESHOLD;

        if (oldPoint > newPoint) ScreenFlappy.Instance().playRandomChallenge();
        SoundCenter.Instance().playEffect("sfx_point.mp3");
        this.score2Sprites(this.score);
    },

    saveBestScore:function()
    {
        if (this.score > this.bestScore)
            cc.sys.localStorage.setItem(this.storageKey, this.score);
    }
});

PointSystem.Instance = function(){ return PointSystem._instance; }

