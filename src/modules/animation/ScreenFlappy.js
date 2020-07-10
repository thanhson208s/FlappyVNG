/**
 * Created by GSN on 7/9/2015.
 */


var ScreenFlappy = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        this.bird = {g: -2000, v0: 800, gAngle: 720, vAngle0: -720, maxAngle: -30, minAngle: 90};
        this.bird.v = 20;
        this.bird.y = size.height*1/2;
        this.bird.vAngle = 0;
        this.bird.angle = 0;

        this.limit = {max: 1, min: 75/900};

        var flappySprite = new Flappy();
        flappySprite.setPosition(size.width*1/3, this.bird.y);

        this.bird.sprite = flappySprite;

        var background = new Background(size.width, size.height);
        background.setPosition(size.width/2, size.height/2);

        this.background = background;

        var coverLayer = new cc.LayerColor(cc.color(0,0,0,0), size.width, size.height);
        coverLayer.setPosition(size.width/2, size.height/2);
        coverLayer.zIndex = 1;


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
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: function(sender){
                        var bird = sender.getCurrentTarget().parent.bird;
                        bird.v = bird.v0;
                    }
                }, coverLayer);
                screen.removeChild(btnPlay);
                screen.bird.v = screen.bird.v0;
                screen.update = screen.flyingFlappy;
                cc.audioEngine.playMusic("flappy/theme.mp3", true);
            }
        }, btnPlay);

        this.addChild(btnPlay);
        this.addChild(coverLayer);
        this.addChild(background);
        this.addChild(flappySprite);

        this.update = this.idleFlappy;
        this.scheduleUpdate();
    },
    idleFlappy: function(dt)
    {
        var amplitude = 10;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.height/2 + amplitude || this.bird.y <= this.height/2 - amplitude)
            this.bird.v = -this.bird.v;
        this.bird.sprite.y = this.bird.y;
    },
    flyingFlappy: function(dt)
    {
        this.bird.v += this.bird.g * dt;
        this.bird.y += this.bird.v * dt;
        this.bird.sprite.y = this.bird.y;

        if (this.bird.y <= this.limit.min * this.height + this.bird.sprite.width * this.bird.sprite.getScaleX() /2 || this.bird.y >= this.limit.max * this.height - this.bird.sprite.height * this.bird.sprite.getScaleY() / 2) {
            console.log("Losed");
            this.unscheduleUpdate();
            this.background.unscheduleUpdate();
            this.bird.sprite.unscheduleUpdate();

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
                    fr.view(ScreenFlappy, 3);
                }
            }, btnReplay);
            this.addChild(btnReplay);
            return;
        }

        if (this.bird.v >= 0){
            this.bird.vAngle = this.bird.vAngle0;
            this.bird.angle += this.bird.vAngle * dt;
            if (this.bird.angle < -30){
                this.bird.angle = -30;
                this.bird.vAngle = 0;
            }
        } else{
            this.bird.vAngle += this.bird.gAngle * dt;
            this.bird.angle += this.bird.vAngle * dt;
            if (this.bird.angle > 90)
                this.bird.angle = 90;
        }
        this.bird.sprite.rotation = this.bird.angle;
    }
});