/**
 * Created by HP on 7/16/2020.
 */

var Player = cc.Layer.extend({
    ctor:function()
    {
        this._super();
        Player._instance = this;
    },

    startGame:function()
    {
        this.scheduleUpdate();
        this.lastTimePlayAudio = 0.15;
    },

    update:function(dt)
    {
        this.lastTimePlayAudio += dt;
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        var flappy = Flappy.Instance();
        var target = Obstacle.Instance().getCurrentTarget();
        var targetName = Obstacle.Instance().getCurrentTargetName();

        var v = ScreenFlappy.Instance().bird.v + FLAPPY_CONST.G * dt;
        var y = flappy.y + v * dt - 4;
        var x = flappy.x + PIPE_CONST.SPEED * dt;

        var rot = ScreenFlappy.Instance().getNextRot(dt);
        var a = flappy.width / 2 * flappy.getScaleX();
        var b = flappy.height / 2 * flappy.getScaleY();
        var A = Math.pow(Math.cos(rot), 2) / (a * a) + Math.pow(Math.sin(rot), 2) / (b * b);
        var B = Math.sin(2 * rot) * (1 / (a * a) - 1 / (b * b));
        var C = Math.pow(Math.sin(rot), 2) / (a * a) + Math.pow(Math.cos(rot), 2) / (b * b);
        var down = y - 1 / Math.sqrt(C - B * B / (4 * A));
        var left = x - 1 / Math.sqrt(A - B * B / (4 * C));
        if (left - 2 > target.x + PIPE_CONST.WIDTH / 2) return;

        if (targetName == "pipe") {
            if (down - 10 <= target.y - PIPE_CONST.GAP_DISTANCE / 2) {
                ScreenFlappy.Instance().bird.v = ScreenFlappy.Instance().bird.v0;
                if (this.lastTimePlayAudio > 0.15) {
                    jsb.AudioEngine.play2d("flappy/sfx/sfx_wing.mp3", false);
                    this.lastTimePlayAudio = 0;
                }
            }
        }
        else{
            if (down <= target.y - target.width * target.getScaleY() * 3/2){
                ScreenFlappy.Instance().bird.v = ScreenFlappy.Instance().bird.v0;
                if (this.lastTimePlayAudio > 0.15) {
                    jsb.AudioEngine.play2d("flappy/sfx/sfx_wing.mp3", false);
                    this.lastTimePlayAudio = 0;
                }
            }
        }
    }
});

Player.Instance = function(){ return Player._instance; };