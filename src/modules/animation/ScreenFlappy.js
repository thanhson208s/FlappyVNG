/**
 * Created by GSN on 7/9/2015.
 */

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
        //constants

        this.addChild(new Background(size.width, size.height), -1);
        this.addChild(new Obstacle(size.width, size.height), 0);
        this.addChild(new Flappy(size.width*1/3, this.bird.y), 1);
        this.addChild(new PointSystem(size.width, size.height), 1);
        this.addChild(new BtnPlay(size.width*2/3, size.height/2), 3);
        this.addChild(new FlashLayer(size.width, size.height), 10);
        this.addChild(new GameoverLayer(size.width, size.height), 5);

        //var particleSystem = new cc.ParticleFlower();
        //particleSystem.setPosition(size.width/2, size.height/2);
        //particleSystem.texture = cc.textureCache.addImage("flappy/stars.png");
        //if (particleSystem.setShapeType)
        //    particleSystem.setShapeType(cc.ParticleSystem.STAR_SHAPE);
        //this.addChild(particleSystem, 20);

        this.initGame();
    },

    initGame:function()
    {
        this.bird.v = 20; this.bird.y = this.height/2;
        this.bird.vAngle = 0; this.bird.angle = 0;

        Flappy.Instance().initGame();
        Background.Instance().initGame();
        Obstacle.Instance().initGame();
        PointSystem.Instance().initGame();
        BtnPlay.Instance().show();
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
                if (keyCode == 32) ScreenFlappy.Instance().pushFlappy(sender);
            }
        }, this);
        BtnPlay.Instance().hide();
        this.bird.v = this.bird.v0;
        this.update = this.flyingFlappy;
        Obstacle.Instance().startGame();
    },

    idleFlappy: function(dt)
    {
        var amplitude = 10;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.height/2 + amplitude || this.bird.y <= this.height/2 - amplitude)
            this.bird.v = -this.bird.v;
        Flappy.Instance().y = this.bird.y;
    },

    flyingFlappy: function(dt)
    {
        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY())
            this.bird.y = this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY();

        var colliedWithPipes = Obstacle.Instance().collided();
        var colliedWithBorders =  this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2;

        if (colliedWithPipes || colliedWithBorders) {
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
    },

    fallingFlappy:function(dt)
    {
        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2){
            Flappy.Instance().y = this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2;
            this.unscheduleUpdate();
            GameoverLayer.Instance().show();
            return;
        }
        Flappy.Instance().y = this.bird.y;

        this.rotateFlappy(dt);
    },

    rotateFlappy:function(dt){
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

    pushFlappy: function(sender)
    {
        var screen = sender.getCurrentTarget();
        screen.bird.v = screen.bird.v0;
    }
});

ScreenFlappy.Instance = function(){ return ScreenFlappy._instance; };

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

BtnPlay.Instance = function(){ return BtnPlay._instance; }


