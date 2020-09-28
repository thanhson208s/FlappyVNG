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
        this.initCodeListeners();
        //constants

        //add title
        this.addChild(new Title(width/2, height * 5/6), 0, "title");

        //add message
        var mess = new cc.Sprite("flappy/message.png");
        mess.setScale(1.6, 1.6);
        mess.setPosition(width/2, height*3/7);
        this.addChild(mess, 0, "mess");

        //add skin buttons
        for (var i = 0; i < Flappy.Instance().versions.length; i++){
            var btn = new cc.Sprite("flappy/btn/" + Flappy.Instance().versions[i] + "Btn.png");
            btn.setPosition(this.width * (1/2 +(i - (Flappy.Instance().versions.length - 1)/2) * 1/7), this.height/6);
            this.addChild(btn, 0, "btn" + i);
        }
    },

    initCodeListeners: function()
    {
        this.codes = [];
        this.codeIndexes = [];
        for (var key in CODE){
            this.codes.push(CODE[key]);
            this.codeIndexes.push(-1);
        }
    },

    matchCodes: function(keyCode)
    {
        for (var i = 0; i < this.codes.length; i++) {
            if (keyCode == GameStartLayer.Instance().codes[i][GameStartLayer.Instance().codeIndexes[i] + 1].charCodeAt(0)) {
                GameStartLayer.Instance().codeIndexes[i]++;
                if (GameStartLayer.Instance().codeIndexes[i] == GameStartLayer.Instance().codes[i].length - 1) {
                    GameStartLayer.Instance().codeIndexes[i] = -1;
                    switch (GameStartLayer.Instance().codes[i]) {
                        case CODE.AUTO:
                            AUTO = !AUTO;
                            break;
                        case CODE.DEBUG:
                            DEBUGGING = !DEBUGGING;
                            break;
                        case CODE.MUTE:
                            SoundCenter.Instance().toggleMusicVolume();
                            break;
                        case CODE.SFX:
                            SoundCenter.Instance().toggleSfxVolume();
                            break;
                    }
                }
            } else {
                GameStartLayer.Instance().codeIndexes[i] = -1;
                if (keyCode == GameStartLayer.Instance().codes[i][0].charCodeAt(0)) GameStartLayer.Instance().codeIndexes[i]++;
            }
        }
    },

    show:function()
    {
        //set position to initial
        this.setPosition(0, 0);

        //display currently selected skin
        for (var i = 0; i < Flappy.Instance().versions.length; i++){
            if (i == Flappy.Instance().version) this.selectSkin(i);
            else this.unSelectSkin(i);
        }

        //add click listener (choose skin or start game)
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(sender){
                for (var i = 0; i < Flappy.Instance().versions.length; i++){
                    var btn = GameStartLayer.Instance().getChildByName("btn" + i);
                    var loc = btn.convertToNodeSpace(sender.getLocation());
                    if (loc.x < 0 || loc.x > btn.width || loc.y < 0 || loc.y > btn.height)
                        continue;
                    if (i != Flappy.Instance().version){
                        GameStartLayer.Instance().unSelectSkin(Flappy.Instance().version);
                        Flappy.Instance().changeColorTo(Flappy.Instance().versions[i]);
                        GameStartLayer.Instance().selectSkin(Flappy.Instance().version);
                        SoundCenter.Instance().playEffect("switch.mp3");
                    }
                    return;
                }
                ScreenFlappy.Instance().startGame();
            }
        }, this);

        //reset code indexes
        for (var i = 0; i < this.codeIndexes.length; i++)
            this.codeIndexes[i] = -1;

        //add keyboard listener (start game, choose skin, detect code)
        this.keyboardListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, sender){
                switch(keyCode){
                    case 32:    //space pressed
                        ScreenFlappy.Instance().startGame();
                        break;
                    case 39:    //right arrow pressed
                    case 38:    //up arrow pressed
                        GameStartLayer.Instance().onNextColorSelect();
                        break;
                    case 37:    //left arrow pressed
                    case 40:    //down arrow pressed
                        GameStartLayer.Instance().onPrevColorSelect();
                        break;
                    default:
                        GameStartLayer.Instance().matchCodes(keyCode);
                        break;
                }
            }
        }, this);
    },

    hide:function()
    {
        //remove all listeners
        if (this.clickListener) {
            cc.eventManager.removeListener(this.clickListener);
            this.clickListener = null;
        }
        if (this.keyboardListener) {
            cc.eventManager.removeListener(this.keyboardListener);
            this.keyboardListener = null;
        }

        //keep moving left till out of sight
        this.scheduleUpdate();
    },

    onNextColorSelect: function()
    {
        this.unSelectSkin(Flappy.Instance().version);
        Flappy.Instance().changeColorToNext();
        this.selectSkin(Flappy.Instance().version);
        SoundCenter.Instance().playEffect("switch.mp3");
    },

    onPrevColorSelect: function()
    {
        this.unSelectSkin(Flappy.Instance().version);
        Flappy.Instance().changeColorToPrev();
        this.selectSkin(Flappy.Instance().version);
        SoundCenter.Instance().playEffect("switch.mp3");
    },

    unSelectSkin: function(ver)
    {
        var btn = this.getChildByName("btn" + ver);
        btn.setScale(0.3, 0.3);
        btn.setOpacity(160);
    },

    selectSkin: function(ver)
    {
        var btn = this.getChildByName("btn" + ver);
        btn.setScale(0.4, 0.4);
        btn.setOpacity(255);
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
        var animation = new cc.Animation();
        for (var i = 0; i < this.spriteNames.length; i++){
            animation.addSpriteFrameWithFile(this.spriteNames[i]);
        }
        animation.setDelayPerUnit(2.5/this.spriteNames.length);
        var animate = cc.Animate(animation).repeatForever();
        this.runAction(animate);
    }
});