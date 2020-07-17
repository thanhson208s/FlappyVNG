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

        this.addChild(new Title(width/2, height * 5/6), 0, "title");

        var mess = new cc.Sprite("flappy/message.png");
        mess.setScale(1.6, 1.6);
        mess.setPosition(width/2, height*3/7);
        this.addChild(mess, 0, "mess");


        for (var i = 0; i < Flappy.Instance().versions.length; i++){
            var btn = new cc.Sprite("flappy/btn/" + Flappy.Instance().versions[i] + "Btn.png");
            btn.setPosition(this.width * (1/2 +(i - (Flappy.Instance().versions.length - 1)/2) * 1/7), this.height/6);
            this.addChild(btn, 0, "btn" + i);
        }
    },

    show:function()
    {
        this.setPosition(0, 0);
        for (var i = 0; i < Flappy.Instance().versions.length; i++){
            var btn = this.getChildByName("btn" + i);
            if (i == Flappy.Instance().version){
                btn.setScale(0.4, 0.4);
                btn.setOpacity(255);
            }
            else {
                btn.setScale(0.3, 0.3);
                btn.setOpacity(160);
            }
        }
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

                    if (keyCode == 39) {
                        var oldBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        Flappy.Instance().changeColorToNext();
                        var newBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        jsb.AudioEngine.play2d("flappy/sfx/switch.mp3", false);
                        oldBtn.setScale(0.3, 0.3);
                        oldBtn.setOpacity(160);
                        newBtn.setScale(0.4, 0.4);
                        newBtn.setOpacity(255);
                    }
                    else if (keyCode == 37) {
                        var oldBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        Flappy.Instance().changeColorToPrev();
                        var newBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        jsb.AudioEngine.play2d("flappy/sfx/switch.mp3", false);
                        oldBtn.setScale(0.3, 0.3);
                        oldBtn.setOpacity(160);
                        newBtn.setScale(0.4, 0.4);
                        newBtn.setOpacity(255);
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
        if (sender.getType() == cc.Event.MOUSE) {
            var x = sender.getLocationX();
            var y = sender.getLocationY();
            for (var i = 0; i < Flappy.Instance().versions.length; i++){
                var btn = GameStartLayer.Instance().getChildByName("btn" + i);
                if (x < btn.x - btn.width / 2 * btn.getScaleX() || x > btn.x + btn.width / 2 * btn.getScaleX() || y < btn.y - btn.height / 2 * btn.getScaleY() || y > btn.y + btn.height / 2 * btn.getScaleY()) continue;
                if (i != Flappy.Instance().version){
                    var oldBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                    Flappy.Instance().changeColorTo(Flappy.Instance().versions[i]);
                    jsb.AudioEngine.play2d("flappy/sfx/switch.mp3", false);
                    oldBtn.setScale(0.3, 0.3);
                    oldBtn.setOpacity(160);
                    btn.setScale(0.4, 0.4);
                    btn.setOpacity(255);
                }
                return;
            }
        }
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

var Title = cc.Sprite.extend({
    ctor:function(x, y)
    {
        this._super("flappy/title/title.png");

        this.setScale(2, 2);
        this.setPosition(x, y);

        this.spriteNames = ([1, 2, 3, 4, 5, 6, 7]).map(function(x){return "flappy/title/title" + x + ".png"});
        var animation = cc.Animation();
        for (var i = 0; i < this.spriteNames.length; i++){
            animation.addSpriteFrameWithFile(this.spriteNames[i]);
        }
        animation.setDelayPerUnit(2.5/this.spriteNames.length);
        var animate = cc.Animate(animation).repeatForever();
        animate.setTag(0);
        this.runAction(animate);
    }
});