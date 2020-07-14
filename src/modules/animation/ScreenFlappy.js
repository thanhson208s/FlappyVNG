/**
 * Created by GSN on 7/9/2015.
 */

// TODO:
// + change logic of restart
// + save point to file and make high score menu
// + make fall effect for flappy

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

        //properties
        var size = cc.director.getVisibleSize();
        this.bird = {g: -2000, v0: 750, vMax: -1000, gAngle: 720, vAngle0: -720, minAngle: -30, maxAngle: 90};
        this.bird.v = 20;
        this.bird.y = size.height*1/2;
        this.bird.vAngle = 0;
        this.bird.angle = 0;
        this.limit = {max: 1, min: 75/900};
        //properties

        this.addChild(new Flappy(size.width*1/3, this.bird.y), 1);
        this.addChild(new Background(size.width, size.height), -1);
        this.addChild(new PointSystem(size.width, size.height), 1);
        this.addChild(new Obstacle(size.width, size.height), 0);
        this.addChild(new DeathLayer(size.width, size.height), 10);

        var btnPlay = new cc.Sprite("flappy/play.png");
        btnPlay.setPosition(size.width*2/3, size.height/2);
        btnPlay.setScale(0.5, 0.5);
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(sender){
                var x = sender.getLocationX();
                var y = sender.getLocationY();
                if (x < btnPlay.x - btnPlay.width / 2 * btnPlay.getScaleX() || x > btnPlay.x + btnPlay.width / 2 * btnPlay.getScaleX()) return;
                if (y < btnPlay.y - btnPlay.height / 2 * btnPlay.getScaleY() || y > btnPlay.y + btnPlay.height / 2 * btnPlay.getScaleY()) return;
                var screen = sender.getCurrentTarget().parent;
                screen.clickListener = cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: screen.pushTheBird
                }, screen);
                screen.removeChild(btnPlay);
                screen.bird.v = screen.bird.v0;
                screen.update = screen.flyingFlappy;
                Obstacle.Instance().initPipes();
                //cc.audioEngine.playMusic("flappy/theme.mp3", true);
            }
        }, btnPlay);
        this.addChild(btnPlay);

        this.update = this.idleFlappy;
        this.scheduleUpdate();
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
        var colliedWithPipes = Obstacle.Instance().collided();
        var colliedWithBorders =  this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2 || this.bird.y >= this.limit.max * this.height - Flappy.Instance().height * Flappy.Instance().getScaleY()/2;

        if (colliedWithPipes || colliedWithBorders) {
            DeathLayer.Instance().flash();
            this.setFallingFlappy();
            return;
        }
        Flappy.Instance().y = this.bird.y;

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

    setFallingFlappy: function(){
        cc.eventManager.removeListener(this.clickListener);
        this.bird.v = 0;
        this.bird.vAngle = 0;
        this.update = this.fallingFlappy;
        Background.Instance().unscheduleUpdate();
        Flappy.Instance().unschedule(Flappy.Instance().wing);
        Obstacle.Instance().unscheduleUpdate();
    },

    fallingFlappy: function(dt)
    {
        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y <= this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2){
            Flappy.Instance().y = this.limit.min * this.height + Flappy.Instance().width * Flappy.Instance().getScaleX()/2;
            this.unscheduleUpdate();
            var btnReplay = new cc.Sprite("flappy/replay.png");
            btnReplay.setPosition(this.width/2, this.height/2);
            btnReplay.setScale(0.5, 0.5);
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(sender){
                    var x = sender.getLocationX();
                    var y = sender.getLocationY();
                    if (x < btnReplay.x - btnReplay.width / 2 * btnReplay.getScaleX() || x > btnReplay.x + btnReplay.width / 2 * btnReplay.getScaleX()) return;
                    if (y < btnReplay.y - btnReplay.height / 2 * btnReplay.getScaleY() || y > btnReplay.y + btnReplay.height / 2 * btnReplay.getScaleY()) return;
                    fr.view(ScreenFlappy, 1);
                }
            }, btnReplay);
            this.addChild(btnReplay);
            return;
        }
        Flappy.Instance().y = this.bird.y;

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

    pushTheBird: function(sender)
    {
        var screen = sender.getCurrentTarget();
        screen.bird.v = screen.bird.v0;
    }
});

ScreenFlappy.Instance = function(){ return ScreenFlappy._instance; };


