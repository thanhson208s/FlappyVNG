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
        this.bird = {
            g: FLAPPY_CONST.G,
            v0: FLAPPY_CONST.V_0,
            vMax: FLAPPY_CONST.V_MAX,
            gAngle: FLAPPY_CONST.G_ANGLE,
            vAngle0: FLAPPY_CONST.V_ANGLE_0,
            minAngle: FLAPPY_CONST.ANGLE_MIN,
            maxAngle: FLAPPY_CONST.ANGLE_MAX
        };
        this.limit = {max: 1, min: BG_CONST.GROUND_HEIGHT};
        this.timeScale = TIME_SCALE;
        //constants

        this.addChild(new Background(size.width, size.height), -1);
        this.addChild(new Obstacle(size.width, size.height), 0);
        this.addChild(new Flappy(size.width*1/3, this.bird.y), 1);
        this.addChild(new PointSystem(size.width, size.height), 1);
        this.addChild(new FlashLayer(size.width, size.height), 10);
        this.addChild(new GameOverLayer(size.width, size.height), 5);
        this.addChild(new GameStartLayer(size.width, size.height), 3);
        this.addChild(new Player());
        this.addChild(new SoundCenter());



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
        GameOverLayer.Instance().hide();

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
        if (AUTO) Player.Instance().startGame();
        SoundCenter.Instance().playEffect("sfx_wing.mp3");
    },

    idleFlappy: function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        var amplitude = 10;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.height/2 + amplitude){
            this.bird.y = this.height/2 + amplitude;
            this.bird.v = -this.bird.v;
        }else if (this.bird.y <= this.height/2 - amplitude){
            this.bird.y = this.height/2 - amplitude;
            this.bird.v = -this.bird.v;
        }

        Flappy.Instance().y = this.bird.y;
    },

    flyingFlappy: function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.rotateFlappy(dt);

        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;
        if (this.bird.y >= this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY())
            this.bird.y = this.limit.max * this.height + Flappy.Instance().height * Flappy.Instance().getScaleY();

        if (Obstacle.Instance().collided(Flappy.Instance().x + dt*PIPE_CONST.SPEED, this.bird.y)) {
            SoundCenter.Instance().playEffect("sfx_hit.mp3");
            //cc.audioEngine.pauseMusic();
            PointSystem.Instance().saveBestScore();
            FlashLayer.Instance().flash();
            this.setFallingFlappy();
            return;
        }
    },

    setFallingFlappy: function(){
        cc.eventManager.removeListener(this.clickListener);
        cc.eventManager.removeListener(this.spaceListener);
        this.bird.v = 500;
        this.bird.vAngle = 0;
        this.update = this.fallingFlappy;
        Background.Instance().unscheduleUpdate();
        Flappy.Instance().stopActionByTag(0);
        Obstacle.Instance().unscheduleUpdate();
        GameStartLayer.Instance().unscheduleUpdate();
        Player.Instance().unscheduleUpdate();
    },

    fallingFlappy:function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.rotateFlappy(dt);

        this.bird.v += this.bird.g * dt;
        if (this.bird.v < this.bird.vMax)
            this.bird.v = this.bird.vMax;
        this.bird.y += this.bird.v * dt;

        var flappy = Flappy.Instance();
        var rot = flappy.rotation / 180 * Math.PI;
        var a = flappy.width/2 * flappy.getScaleX();
        var b = flappy.height/2 * flappy.getScaleY();
        var A = Math.pow(Math.cos(rot), 2)/(a*a) + Math.pow(Math.sin(rot), 2)/(b*b);
        var B = Math.sin(2*rot)*(1/(a*a) - 1/(b*b));
        var C = Math.pow(Math.sin(rot), 2)/(a*a) + Math.pow(Math.cos(rot), 2)/(b*b);
        var down = this.bird.y - 1/Math.sqrt(C - B*B/(4*A));

        if (down <= this.limit.min * this.height && this.bird.v < 0){
            flappy.y = this.limit.min * this.height + (this.bird.y - down);
            this.unscheduleUpdate();
            PointSystem.Instance().hide();
            SoundCenter.Instance().playEffect("sfx_die.mp3");
            GameOverLayer.Instance().show();
            return;
        }
        flappy.y = this.bird.y;
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

    getNextRot:function(dt)
    {
        if (this.bird.v >= 0){
            var vAngle = this.bird.vAngle0;
            var angle = this.bird.angle + vAngle * dt;
            if (angle < this.bird.minAngle){
                angle = this.bird.minAngle;
            }
        } else{
            var vAngle = this.bird.vAngle + this.bird.gAngle * dt;
            var angle = this.bird.angle + vAngle * dt;
            if (angle > this.bird.maxAngle)
                this.bird.angle = this.bird.maxAngle;
        }
        return angle;
    },

    pushFlappy:function(sender)
    {
        if (sender != null) Player.Instance().turnOff();
        ScreenFlappy.Instance().bird.v = ScreenFlappy.Instance().bird.v0;
        SoundCenter.Instance().playEffect("sfx_wing.mp3");
    },

    dtAfterTimeScale:function(dt)
    {
        return dt * this.timeScale;
    }
});

ScreenFlappy.Instance = function(){ return ScreenFlappy._instance; };


