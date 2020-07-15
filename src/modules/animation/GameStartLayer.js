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

        var title = new cc.Sprite("flappy/title.png");
        title.setScale(2, 2);
        title.setPosition(width/2, height * 5/6);
        this.addChild(title, 0, "title");

        var mess = new cc.Sprite("flappy/message.png");
        mess.setScale(1.6, 1.6);
        mess.setPosition(width/2, height*3/7);
        this.addChild(mess, 0, "mess");



        //this.addChild(new BtnPlay(width*2/3, height/2));
    },

    show:function()
    {
        this.getChildByName("title").setVisible(true);
        this.getChildByName("mess").setVisible(true);
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.startGame
        }, this);
        this.spaceListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, sender){
                if (keyCode == 32) GameStartLayer.Instance().startGame(sender);
            }
        }, this);
        //BtnPlay.Instance().show();
    },

    hide:function()
    {
        this.getChildByName("title").setVisible(false);
        this.getChildByName("mess").setVisible(false);
        if (this.clickListener)
            cc.eventManager.removeListener(this.clickListener);
        if (this.spaceListener)
            cc.eventManager.removeListener(this.spaceListener);
        //BtnPlay.Instance().hide();
    },

    startGame:function(sender)
    {
        ScreenFlappy.Instance().startGame();
    }
});

GameStartLayer.Instance = function(){ return GameStartLayer._instance; };

var BtnPlay = cc.Sprite.extend({
    ctor:function(x, y)
    {
        //singleton
        this._super("flappy/play.png");
        BtnPlay._instance = this;
        //singleton

        //basic attributes
        this.setPosition(x, y);
        this.setScale(0.5, 0.5);
        //basic attributes
    },

    show:function()
    {
        this.setVisible(true);
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.startGame
        }, this);
        this.spaceListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, sender){
                if (keyCode == 32) BtnPlay.Instance().startGame(sender);
            }
        }, this);
    },

    hide:function()
    {
        this.setVisible(false);
        if (this.clickListener)
            cc.eventManager.removeListener(this.clickListener);
        if (this.spaceListener)
            cc.eventManager.removeListener(this.spaceListener);
    },

    startGame: function(sender)
    {
        if (sender.getType() == cc.Event.MOUSE) {
            var x = sender.getLocationX();
            var y = sender.getLocationY();
            var btnPlay = BtnPlay.Instance();
            if (x < btnPlay.x - btnPlay.width / 2 * btnPlay.getScaleX() || x > btnPlay.x + btnPlay.width / 2 * btnPlay.getScaleX()) return;
            if (y < btnPlay.y - btnPlay.height / 2 * btnPlay.getScaleY() || y > btnPlay.y + btnPlay.height / 2 * btnPlay.getScaleY()) return;
        }
        ScreenFlappy.Instance().startGame();
    }
});

BtnPlay.Instance = function(){ return BtnPlay._instance; };