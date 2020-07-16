/**
 * Created by GSN on 7/9/2015.
 */

//TODO: add sound

var DEBUGGING = true;

var ScreenFlappy = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function()
    {
        //singleton
        this._super();
        ScreenFlappy._instance = this;
        //singleton

        //basic attributes
        var size = cc.director.getVisibleSize();
        this.width = size.width;
        this.height = size.height;
        //basic attributes

        //constants
        this.bird = {g: -2000, v0: 600, vMax: -1000, gAngle: 720, vAngle0: -720, minAngle: -30, maxAngle: 90};
        this.limit = {max: 1, min: 75/900};
        this.timeScale = 1;
        //constants

        this.addChild(new Background(size.width, size.height), -1);
        this.addChild(new Obstacle(size.width, size.height), 0);
        this.addChild(new Flappy(size.width*1/3, this.bird.y), 1);
        this.addChild(new PointSystem(size.width, size.height), 1);
        this.addChild(new FlashLayer(size.width, size.height), 10);
        this.addChild(new GameoverLayer(size.width, size.height), 5);
        this.addChild(new GameStartLayer(size.width, size.height), 3);

        //cc.audioEngine.preloadEffect("flappy/sfx/sfw_wing.wav");
        //cc.audioEngine.preloadEffect("flappy/sfx/sfx_hit.wav");
        //cc.audioEngine.preloadEffect("flappy/sfx/sfx_point.wav");
        //cc.audioEngine.preloadEffect("flappy/sfx/sfx_swooshing.wav");
        //cc.audioEngine.preloadEffect("flappy/sfx/sfx_die.wav");
        //
        //cc.audioEngine.playMusic("flappy/theme.mp3", true);
        //cc.audioEngine.pauseMusic();


        this.initGame();
    },

    initGame:function()
    {
        //Math.seedrandom("son");
        this.bird.v = 20; this.bird.y = this.height/2;
        this.bird.vAngle = 0; this.bird.angle = 0;

        Flappy.Instance().initGame();
        Background.Instance().initGame();
        Obstacle.Instance().initGame();
        PointSystem.Instance().initGame();
        GameStartLayer.Instance().show();
        GameoverLayer.Instance().hide();

        this.update = this.idleFlappy;
        this.scheduleUpdate();
    },

    startGame:function()
    {
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.pushFlappy
        }, this);
        this.spaceListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, sender){
                if (keyCode == 27){
                    ScreenFlappy.Instance().timeScale = 1 -  ScreenFlappy.Instance().timeScale;
                }
                if (ScreenFlappy.Instance().timeScale == 0) return;
                if (keyCode == 32) ScreenFlappy.Instance().pushFlappy(sender);
            }
        }, this);
        GameStartLayer.Instance().hide();
        PointSystem.Instance().show();
        this.bird.v = this.bird.v0;
        this.update = this.flyingFlappy;
        Obstacle.Instance().startGame();
        //cc.audioEngine.rewindMusic();
    },

    idleFlappy: function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        var amplitude = 10;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.height/2 + amplitude || this.bird.y <= this.height/2 - amplitude)
            this.bird.v = -this.bird.v;
        Flappy.Instance().y = this.bird.y;
    },

    flyingFlappy: function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY())
            this.bird.y = this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY();

        var colliedWithPipes = Obstacle.Instance().collided();
        var colliedWithBorders =  this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2;

        if ((colliedWithPipes && !DEBUGGING) || colliedWithBorders) {
            //cc.audioEngine.playEffect("flappy/sfx/sfx_hit.wav", false);
            cc.audioEngine.pauseMusic();
            PointSystem.Instance().saveBestScore();
            FlashLayer.Instance().flash();
            this.setFallingFlappy();
            return;
        }
        Flappy.Instance().y = this.bird.y;

        this.rotateFlappy(dt);
    },

    setFallingFlappy: function(){
        cc.eventManager.removeListener(this.clickListener);
        cc.eventManager.removeListener(this.spaceListener);
        this.bird.v = 500;
        this.bird.vAngle = 0;
        this.update = this.fallingFlappy;
        Background.Instance().unscheduleUpdate();
        Flappy.Instance().unschedule(Flappy.Instance().wing);
        Obstacle.Instance().unscheduleUpdate();
        GameStartLayer.Instance().unscheduleUpdate();
        //cc.audioEngine.playEffect("flappy/sfx/sfx_die.wav");
    },

    fallingFlappy:function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2){
            Flappy.Instance().y = this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2;
            this.unscheduleUpdate();
            PointSystem.Instance().hide();
            GameoverLayer.Instance().show();
            return;
        }
        Flappy.Instance().y = this.bird.y;

        this.rotateFlappy(dt);
    },

    rotateFlappy:function(dt)
    {
        if (this.bird.v >= 0){
            this.bird.vAngle = this.bird.vAngle0;
            this.bird.angle += this.bird.vAngle * dt;
            if (this.bird.angle < this.bird.minAngle){
                this.bird.angle = this.bird.minAngle;
                this.bird.vAngle = 0;
            }
        } else{
            this.bird.vAngle += this.bird.gAngle * dt;
            this.bird.angle += this.bird.vAngle * dt;
            if (this.bird.angle > this.bird.maxAngle)
                this.bird.angle = this.bird.maxAngle;
        }
        Flappy.Instance().rotation = this.bird.angle;
    },

    pushFlappy:function(sender)
    {
        var screen = sender.getCurrentTarget();
        screen.bird.v = screen.bird.v0;
        //cc.audioEngine.playEffect("flappy/sfx/sfx_wing.wav", false);
    },

    dtAfterTimeScale:function(dt)
    {
        return dt * this.timeScale;
    }
});

ScreenFlappy.Instance = function(){ return ScreenFlappy._instance; };


