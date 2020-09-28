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
        this.width = size.width + 50;
        this.height = size.height + 50;
        
        this.setPosition(-25, -25);
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
        this.challenges = ["DARK", "RAIN", "SHAKE", "REVERSE"];
        //constants

        //add children layers
        this.addChild(new Background(this.width, this.height), -1);
        this.addChild(new Obstacle(this.width, this.height), 0);
        this.addChild(new Flappy(this.width*1/3, this.height/2), 1);
        this.addChild(new cc.Sprite("flappy/darkness.png"), 2, "darkness");
        this.addChild(new cc.ParticleRain(), 2, "rain");

        this.addChild(new PointSystem(this.width, this.height), 3);
        this.addChild(new GameStartLayer(this.width, this.height), 4);
        this.addChild(new GameOverLayer(this.width, this.height), 5);
        this.addChild(new FlashLayer(this.width, this.height), 10);
        
        this.addChild(new Player());
        this.addChild(new SoundCenter());
        //add children layers

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

        this.initDarkness();
        this.initRain();

        this.update = this.idleFlappy;
        this.scheduleUpdate();
    },

    startGame:function()
    {
        // add listeners for push flappy to main layer //
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.pushFlappy
        }, this);

        this.spaceListener = cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, sender){
                if (keyCode == 27){
                    ScreenFlappy.Instance().timeScale = 1 - ScreenFlappy.Instance().timeScale;
                }
                if (ScreenFlappy.Instance().timeScale == 0) return;
                if (keyCode == 32) ScreenFlappy.Instance().pushFlappy(sender);
            }
        }, this);
        // add listeners for push flappy to main layer //

        GameStartLayer.Instance().hide();
        PointSystem.Instance().show();
        this.bird.v = this.bird.v0;
        this.update = this.flyingFlappy;
        Obstacle.Instance().startGame();
        if (AUTO) Player.Instance().startGame();
        SoundCenter.Instance().playEffect("sfx_wing.mp3");
    },

    /*Different Update Functions for Flappy */
    idleFlappy: function(dt)
    {
        Obstacle.Instance().update(dt);

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

        this.getChildByName("darkness").y = Flappy.Instance().y = this.bird.y;
    },

    flyingFlappy: function(dt)
    {
        Obstacle.Instance().update(dt);

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

            //stop running challenge
            this.stopAllActions();
            if (this.getChildByName("darkness").isVisible())
                this.clearDarkness();
            if (this.getChildByName("rain").isActive())
                this.stopRain();
            if (this.isShaking) this.stopShake();
            if (this.getScaleX() < 0) this.stopReverse();
            return;
        }
        else this.getChildByName("darkness").y = Flappy.Instance().y;
    },

    setFallingFlappy: function(){
        cc.eventManager.removeListener(this.clickListener);
        cc.eventManager.removeListener(this.spaceListener);
        this.bird.v = 500;
        this.bird.vAngle = 0;
        this.update = this.fallingFlappy;
        Background.Instance().unscheduleUpdate();
        Flappy.Instance().stopActionByTag(0);
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
        this.getChildByName("darkness").y = flappy.y = this.bird.y;
    },
    /*Different Update Functions for Flappy */

    /* Flappy Transform Functions */
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
    /* Flappy Transform Functions */

    /* Darkness Control Functions */
    initDarkness: function()
    {
        var darkness = this.getChildByName("darkness");
        darkness.setPosition(this.width/3, this.height/2);
        darkness.setVisible(false);
        darkness.setOpacity(0);
        darkness.setScale(15);
    },

    runDarkness: function()
    {
        var darkness = this.getChildByName("darkness");
        darkness.setVisible(true);
        darkness.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(7, 2),
                cc.fadeTo(7, 255)
            ),
            cc.delayTime(7),
            cc.spawn(
                cc.scaleTo(2, 15),
                cc.fadeTo(2, 0)
            ),
            cc.callFunc(function(){
                this.setVisible(false);
            }.bind(darkness))
        ));
    },

    clearDarkness: function()
    {
        var darkness = this.getChildByName("darkness");
        darkness.runAction(cc.sequence(
            cc.spawn(
                cc.scaleTo(0.5, 15),
                cc.fadeOut(0.5)
            ),
            cc.callFunc(function(){
                this.setVisible(false);
            }.bind(darkness))
        ));
    },
    /* Darkness Control Functions */

    /* Rain Control Functions */
    initRain: function()
    {
        var rainEmitter = this.getChildByName("rain");
        rainEmitter.texture = cc.textureCache.addImage("flappy/rainDrop.png");
        rainEmitter.shapeType = cc.ParticleSystem.BALL_SHAPE;
        rainEmitter.setPosition(this.width*1/2, this.height);

        rainEmitter.setLife(2);
        rainEmitter.setLifeVar(1);
        rainEmitter.setEmissionRate(400);

        rainEmitter.setGravity(cc.p(0, -1000));
        rainEmitter.setSpeed(800);
        rainEmitter.setAngle(-100);

        var startColor = rainEmitter.getStartColor();
        rainEmitter.setStartColor(cc.color(startColor.r, startColor.g, startColor.b, 100));

        rainEmitter.stopSystem();
    },

    startRain: function()
    {
        var darkness = this.getChildByName("darkness");
        darkness.setVisible(true);
        darkness.runAction(cc.sequence(
            cc.fadeTo(1, 127),
            cc.callFunc(function(){
                this.getChildByName("rain").resetSystem();
            }.bind(this)),
            cc.fadeTo(1, 255),
            cc.callFunc(function(){
                this.bird.g = FLAPPY_CONST.G * 1.25;
            }.bind(this)),

            cc.delayTime(12),

            cc.callFunc(function(){
                this.getChildByName("rain").stopSystem();
            }.bind(this)),
            cc.fadeOut(2),
            cc.callFunc(function(){
                this.getChildByName("darkness").setVisible(false);
                this.bird.g = FLAPPY_CONST.G;
            }.bind(this))
        ));
    },

    stopRain: function()
    {
        this.getChildByName("rain").stopSystem();
        
        this.getChildByName("darkness").runAction(cc.sequence(
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                this.getChildByName("darkness").setVisible(false);
                this.bird.g = FLAPPY_CONST.G;
            }.bind(this))
        ));
    },
    /* Rain Control Function */

    /* Shake Control Functions */
    startShake: function()
    {
        this.shakeVector = cc.p(0, 5);
        this.shakeVectorVar = cc.p(0, 2)
        this.isShaking = true;
        this.shakeRoutine();
        this.runAction(cc.sequence(
            cc.delayTime(4),
            cc.callFunc(function(){
                this.shakeVector = cc.p(0, 10);
                this.shakeVectorVar = cc.p(0, 2.5);
            }.bind(this)),
            cc.delayTime(8),
            cc.callFunc(function(){
                this.shakeVector = cc.p(0, 15);
                this.shakeVectorVar = cc.p(0, 3);
            }.bind(this)),
            cc.delayTime(4),
            cc.callFunc(function(){
                this.stopShake();
            }.bind(this))
        ));
    },

    shakeRoutine: function()
    {
        var shakeVector = cc.p(this.shakeVector.x + this.shakeVectorVar.x * Math.random(), this.shakeVector.y + this.shakeVectorVar.y * Math.random());
        this.runAction(cc.sequence(
            cc.moveBy(0.05, shakeVector),
            cc.moveBy(0.05, shakeVector).reverse(),
            cc.callFunc(function(){
                if (this.isShaking)
                    this.shakeRoutine();
            }.bind(this))
        ));
    },

    stopShake: function()
    {
        this.isShaking = false;
    },
    /* Shake Control Functions */

    /* Reverse Control Functions */
    startReverse: function()
    {
        this.runAction(cc.sequence(
            cc.callFunc(function(){
                this.unscheduleUpdate();
            }.bind(this)),
            cc.scaleTo(0.25, -1, 1),
            cc.delayTime(0.25),
            cc.callFunc(function(){
                this.scheduleUpdate();
            }.bind(this)),
            cc.delayTime(15),
            cc.callFunc(function(){
                this.unscheduleUpdate();
            }.bind(this)),
            cc.scaleTo(0.25, 1, 1),
            cc.delayTime(0.25),
            cc.callFunc(function(){
                this.scheduleUpdate();
            }.bind(this))
        ));
    },

    stopReverse: function()
    {
        this.runAction(cc.scaleTo(0.5, 1, 1));
    },
    /* Reverse Control Functions */

    playRandomChallenge: function()
    {
        var challenge = this.challenges[Math.floor(Math.random() * this.challenges.length)];
        switch(challenge){
            case "DARK":
                this.runDarkness();
                break;
            case "RAIN":
                this.startRain();
                break;
            case "SHAKE":
                this.startShake();
                break;
            case "REVERSE":
                this.startReverse();
                break;
            default:
                break;
        }
    },

    dtAfterTimeScale:function(dt)
    {
        return dt * this.timeScale;
    }
});

ScreenFlappy.Instance = function(){ return ScreenFlappy._instance; };


