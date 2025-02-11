/**
 * Created by CPU12735-local on 7/15/2020.
 */

var GameOverLayer = cc.Layer.extend({
    ctor:function(width, height)
    {
        //singleton
        this._super();
        GameOverLayer._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setAnchorPoint(0, 0);
        this.setPosition(0, 0);
        //basic attributes

        this.addChild(new BtnReplay(width/2, height/4));
        this.addChild(new Scoreboard(width/2, height *5/9));

        var gameoverSprite = new cc.Sprite("flappy/gameover.png");
        gameoverSprite.setPosition(width/2, height * 7/8);
        gameoverSprite.setScale(1.7, 1.7);
        this.addChild(gameoverSprite, 0, "gameover");
    },

    show:function(){
        this.getChildByName("gameover").runAction(cc.MoveTo(0.5, this.width/2, this.height * 7/8));
        Scoreboard.Instance().show();
    },

    hide:function(){
        this.getChildByName("gameover").y = this.height * 9/8;
        BtnReplay.Instance().hide();
        Scoreboard.Instance().hide();
    }
});

GameOverLayer.Instance = function(){ return GameOverLayer._instance; }

var BtnReplay = cc.Sprite.extend({
    ctor:function(x, y)
    {
        //singleton
        this._super("flappy/replay.png");
        BtnReplay._instance = this;
        //singleton

        //basic attributes
        this.setPosition(x, y);
        this.setScale(0.4, 0.4);
        //basic attributes
    },

    show:function()
    {
        this.runAction(cc.sequence(
            cc.moveTo(1, this.x, this.y + GameOverLayer.Instance().height/2),
            cc.callFunc(function(){
                BtnReplay.Instance().clickListener = cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: BtnReplay.Instance().restartGame
                }, BtnReplay.Instance());
                BtnReplay.Instance().spaceListener = cc.eventManager.addListener({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:function(keyCode, sender){
                        if (keyCode == 32) BtnReplay.Instance().restartGame(sender);
                    }
                }, BtnReplay.Instance());
            })
        ));
    },

    hide:function()
    {
        this.y = this.y - GameOverLayer.Instance().height/2;
        if (this.clickListener)
            cc.eventManager.removeListener(this.clickListener);
        if (this.spaceListener)
            cc.eventManager.removeListener(this.spaceListener);
    },

    restartGame: function(sender){
        if (sender.getType() == cc.Event.MOUSE) {
            var x = sender.getLocationX();
            var y = sender.getLocationY();
            var btnReplay = BtnReplay.Instance();
            if (x < btnReplay.x - btnReplay.width / 2 * btnReplay.getScaleX() || x > btnReplay.x + btnReplay.width / 2 * btnReplay.getScaleX()) return;
            if (y < btnReplay.y - btnReplay.height / 2 * btnReplay.getScaleY() || y > btnReplay.y + btnReplay.height / 2 * btnReplay.getScaleY()) return;
        }
        SoundCenter.Instance().playEffect("sfx_swooshing.mp3");
        FlashLayer.Instance().flash();
        ScreenFlappy.Instance().initGame();
    }
});

BtnReplay.Instance = function(){ return BtnReplay._instance; };

var Scoreboard = cc.Sprite.extend({
    ctor:function(x, y)
    {
        //singleton
        this._super("flappy/scoreboard/scoreboardNew.png");
        Scoreboard._instance = this;
        //singleton

        //basic attributes
        this.setScale(1.3, 1.3);
        this.setPosition(x, y);
        //basic attributes

        //constants
        this.isNormalBoard = false;
        this.scorePos = {x: this.width - 40, y: this.height - 65};
        this.bestScorePos = {x: this.width - 40, y: 40};
        this.medalPos = {x: 76, y: this.height/2 - 10};
        this.thresholds = MEDAL_CONST.THRESHOLDS;
        this.starRate = MEDAL_CONST.STAR_RATES;
        //constants
    },

    spark:function(){
        var medal = this.getChildByName("medal");
        var R = (medal.width / 2 * medal.getScaleX() + medal.height / 2 * medal.getScaleY()) / 2;
        var r = Math.random() * R;
        var angle = Math.random() * 360;
        var x = r * Math.cos(angle / 180 * Math.PI);
        var y = r * Math.sin(angle / 180 * Math.PI);
        this.addChild(new Star(medal.x + x, medal.y + y), 2);
    },

    show:function()
    {
        var score = PointSystem.Instance().score;
        var bestScore = PointSystem.Instance().bestScore;
        if (score > bestScore) {
            if (this.isNormalBoard) {
                this.setSpriteFrame(new cc.SpriteFrame("flappy/scoreboard/scoreboardNew.png", cc.rect(0, 0, 346, 175)));
                this.isNormalBoard = false;
            }
            bestScore = score;
        }
        else {
            if (!this.isNormalBoard) {
                this.setSpriteFrame(new cc.SpriteFrame("flappy/scoreboard/scoreboard.png", cc.rect(0, 0, 346, 175)));
                this.isNormalBoard = true;
            }
        }

        this.score2Sprites(bestScore, true);
        this.runAction(cc.sequence(
            cc.moveTo(0.5, this.x, this.y + GameOverLayer.Instance().height),
            cc.callFunc(function(){
                Scoreboard.Instance().scoreSprites = [];
                Scoreboard.Instance().currentScore = 0;
                Scoreboard.Instance().showScoreIncreasing();
                if (score > 0) {
                    Scoreboard.Instance().schedule(Scoreboard.Instance().showScoreIncreasing, 0);
                }
                else Scoreboard.Instance().showMedal(score);
            })
        ));
    },

    hide:function()
    {
        this.removeAllChildren();
        this.y = this.y - GameOverLayer.Instance().height;
        this.unschedule(this.spark);
    },

    score2Sprites:function(score, best)
    {
        var x, y;
        if(best){
            x = this.bestScorePos.x;
            y = this.bestScorePos.y;
        }
        else{
            x = this.scorePos.x;
            y = this.scorePos.y;
        }

        var numList = [];
        if (score == 0) numList.push(0);
        else{
            while (score > 0){
                numList.push(score % 10);
                score = Math.floor(score/10);
            }
        }

        for (var i = 0; i < numList.length; i++){
            var sprite = new cc.Sprite("flappy/num/" + parseInt(numList[i]) + ".png");
            sprite.setScale(0.6, 0.6);
            sprite.setPosition(x, y);
            this.addChild(sprite, 1);
            x -= sprite.width * sprite.getScaleX() + 2;
        }
    },

    showScoreIncreasing:function(){
        if (this.currentScore > PointSystem.Instance().score) {
            this.unschedule(this.showScoreIncreasing);
            this.showMedal(PointSystem.Instance().score);
            return;
        }
        for (var i = 0; i < this.scoreSprites.length; i++){
            this.removeChild(this.scoreSprites[i]);
        }
        this.scoreSprites = [];

        var score = this.currentScore++;
        var x = this.scorePos.x;
        var y = this.scorePos.y;
        var numList = [];
        if (score == 0) numList.push(0);
        else{
            while (score > 0){
                numList.push(score % 10);
                score = Math.floor(score/10);
            }
        }
        SoundCenter.Instance().playEffect("numIncrease.mp3");
        for (var i = 0; i < numList.length; i++){
            var sprite = new cc.Sprite("flappy/num/" + parseInt(numList[i]) + ".png");
            sprite.setScale(0.6, 0.6);
            sprite.setPosition(x, y);
            this.addChild(sprite, 1);
            this.scoreSprites.push(sprite);
            x -= sprite.width * sprite.getScaleX() + 2;
        }
    },

    showMedal:function(score)
    {
        var i;
        for (i = 1; i < this.thresholds.length; i++){
            if (score < this.thresholds[i][1]) break;
        }
        i--;
        var medalSprite = new cc.Sprite("flappy/medal/" + this.thresholds[i][0] + ".png");
        medalSprite.setPosition(this.medalPos.x, this.medalPos.y);
        medalSprite.setScale(100, 100);
        this.addChild(medalSprite, 1, "medal");
        medalSprite.setVisible(false)
        medalSprite.runAction(cc.sequence(
            cc.delayTime(0.2),
            cc.callFunc(function(){medalSprite.setVisible(true)}),
            cc.scaleTo(0.75, 0.6, 0.6),
            cc.callFunc(function(){
                SoundCenter.Instance().playEffect("medalDrop.mp3", 0.2);
                if (Scoreboard.Instance().thresholds[i][0] != "none")
                    Scoreboard.Instance().schedule(Scoreboard.Instance().spark, Scoreboard.Instance().starRate[Scoreboard.Instance().thresholds[i][0]]);
            }),
            cc.callFunc(function(){
                BtnReplay.Instance().show();
            })
        ));
    }
});

Scoreboard.Instance = function(){ return Scoreboard._instance; };

var Star = cc.Sprite.extend({
    ctor:function(x, y){
        this._super("flappy/stars.png");

        //basic attributes
        this.setScale(0.4, 0.4);
        this.opacity = 0;
        this.setPosition(x, y);
        //basic attributes

        //properties
        this.lifeTime = 1;
        this.increasing = true;
        //properties

        this.scheduleUpdate();
    },

    update:function(dt){
        if (this.increasing){
            var opacity = this.opacity + 255 * 2 / this.lifeTime * dt;
            if (opacity > 255){
                this.opacity = 255;
                this.increasing = false;
            }else this.opacity = opacity;
        }else{
            var opacity = this.opacity - 255 * 2 / this.lifeTime * dt;
            if (opacity < 0){
                this.opacity = 0;
                Scoreboard.Instance().removeChild(this);
            }else this.opacity = opacity;
        }
    }
});