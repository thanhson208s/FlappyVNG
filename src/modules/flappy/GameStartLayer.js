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
        this.autoCode = "AUTO".split('').map(function(x) {return x.charCodeAt(0)});
        this.debugCode = "DEBUG".split('').map(function(x) {return x.charCodeAt(0)});
        this.muteCode = "MUTE".split('').map(function(x) {return x.charCodeAt(0)});
        this.sfxCode = "SFX".split('').map(function(x) {return x.charCodeAt(0)});
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
        this.sfxIndex = -1;
        this.debugIndex = -1;
        this.muteIndex = -1;
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
                        }
                    }else {
                        GameStartLayer.Instance().autoIndex = -1;
                        if (keyCode == GameStartLayer.Instance().autoCode[0]) GameStartLayer.Instance().autoIndex++;
                    }

                    if (keyCode == GameStartLayer.Instance().debugCode[GameStartLayer.Instance().debugIndex + 1]){
                        GameStartLayer.Instance().debugIndex++;
                        if (GameStartLayer.Instance().debugIndex == GameStartLayer.Instance().debugCode.length - 1){
                            GameStartLayer.Instance().debugIndex = -1;
                            DEBUGGING = !DEBUGGING;
                        }
                    }else {
                        GameStartLayer.Instance().debugIndex = -1;
                        if (keyCode == GameStartLayer.Instance().debugCode[0]) GameStartLayer.Instance().debugIndex++;
                    }

                    if (keyCode == GameStartLayer.Instance().muteCode[GameStartLayer.Instance().muteIndex + 1]){
                        GameStartLayer.Instance().muteIndex++;
                        if (GameStartLayer.Instance().muteIndex == GameStartLayer.Instance().muteCode.length - 1){
                            GameStartLayer.Instance().muteIndex = -1;
                            SoundCenter.Instance().toggleMusicVolume();
                        }
                    }else {
                        GameStartLayer.Instance().muteIndex = -1;
                        if (keyCode == GameStartLayer.Instance().muteCode[0]) GameStartLayer.Instance().muteIndex++;
                    }

                    if (keyCode == GameStartLayer.Instance().sfxCode[GameStartLayer.Instance().sfxIndex + 1]){
                        GameStartLayer.Instance().sfxIndex++;
                        if (GameStartLayer.Instance().sfxIndex == GameStartLayer.Instance().sfxCode.length - 1){
                            GameStartLayer.Instance().sfxIndex = -1;
                            SoundCenter.Instance().toggleSfxVolume();
                        }
                    }else {
                        GameStartLayer.Instance().sfxIndex = -1;
                        if (keyCode == GameStartLayer.Instance().sfxCode[0]) GameStartLayer.Instance().sfxIndex++;
                    }

                    if (keyCode == 39) {
                        var oldBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        Flappy.Instance().changeColorToNext();
                        var newBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        SoundCenter.Instance().playEffect("switch.mp3");
                        oldBtn.setScale(0.3, 0.3);
                        oldBtn.setOpacity(160);
                        newBtn.setScale(0.4, 0.4);
                        newBtn.setOpacity(255);
                    }
                    else if (keyCode == 37) {
                        var oldBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        Flappy.Instance().changeColorToPrev();
                        var newBtn = GameStartLayer.Instance().getChildByName("btn" + Flappy.Instance().version);
                        SoundCenter.Instance().playEffect("switch.mp3");
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
                    SoundCenter.Instance().playEffect("switch.mp3");
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