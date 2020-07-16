/**
 * Created by CPU12735-local on 7/15/2020.
 */


var GameStartLayer = cc.Layer.extend({
    ctor:function(width, height)
    {
        //singleton
        this._super();
        GameStartLayer._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setPosition(0, 0);
        this.setAnchorPoint(0, 0);
        //basic attributes

        //constants
        this.speed = PIPE_CONST.SPEED;
        this.autoIndex = -1;
        this.autoCode = "SONDEPTRAI".split('').map(function(x) {return x.charCodeAt(0)});
        this.pipeIndex = -1;
        this.pipeCode = "KHONGLAMMAVANCOAN".split('').map(function(x) {return x.charCodeAt(0)});
        //constants

        var title = new cc.Sprite("flappy/title.png");
        title.setScale(2, 2);
        title.setPosition(width/2, height * 5/6);
        this.addChild(title, 0, "title");

        var mess = new cc.Sprite("flappy/message.png");
        mess.setScale(1.6, 1.6);
        mess.setPosition(width/2, height*3/7);
        this.addChild(mess, 0, "mess");
    },

    show:function()
    {
        this.setPosition(0, 0);
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.startGame
        }, this);
        this.autoIndex = -1;
        this.spaceListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, sender){
                if (keyCode == 32) GameStartLayer.Instance().startGame(sender);
                else{
                    if (keyCode == GameStartLayer.Instance().autoCode[GameStartLayer.Instance().autoIndex + 1]){
                        GameStartLayer.Instance().autoIndex++;
                        if (GameStartLayer.Instance().autoIndex == GameStartLayer.Instance().autoCode.length - 1){
                            GameStartLayer.Instance().autoIndex = -1;
                            AUTO = !AUTO;
                            cc.log("Auto set to " + AUTO);
                        }
                    }else {
                        GameStartLayer.Instance().autoIndex = -1;
                        if (keyCode == GameStartLayer.Instance().autoCode[0]) GameStartLayer.Instance().autoIndex++;
                    }

                    if (keyCode == GameStartLayer.Instance().pipeCode[GameStartLayer.Instance().pipeIndex + 1]){
                        GameStartLayer.Instance().pipeIndex++;
                        if (GameStartLayer.Instance().pipeIndex == GameStartLayer.Instance().pipeCode.length - 1){
                            GameStartLayer.Instance().pipeIndex = -1;
                            DEBUGGING = !DEBUGGING;
                            cc.log("Debug set to " + DEBUGGING);
                        }
                    }else {
                        GameStartLayer.Instance().pipeIndex = -1;
                        if (keyCode == GameStartLayer.Instance().pipeCode[0]) GameStartLayer.Instance().pipeIndex++;
                    }
                }
            }
        }, this);
        //BtnPlay.Instance().show();
    },

    hide:function()
    {
        if (this.clickListener)
            cc.eventManager.removeListener(this.clickListener);
        if (this.spaceListener)
            cc.eventManager.removeListener(this.spaceListener);
        this.scheduleUpdate();
    },

    startGame:function(sender)
    {
        ScreenFlappy.Instance().startGame();
    },

    update:function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.x -= this.speed * dt;
        if (this.x <= -this.width) {
            this.unscheduleUpdate();
        }
    }
});

GameStartLayer.Instance = function(){ return GameStartLayer._instance; };