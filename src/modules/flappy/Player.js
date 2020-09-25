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
        this.lastTimePlay = 0;
        this.on = true;
        this.runAction(cc.sequence(
            cc.repeat(cc.sequence(
                cc.delayTime(0.25),
                cc.callFunc(function(){
                    if (Player.Instance().on) ScreenFlappy.Instance().pushFlappy();
                })
            ), 5),
            cc.delayTime(0.75),
            cc.repeat(cc.sequence(
                cc.delayTime(0.25),
                cc.callFunc(function(){
                    if (Player.Instance().on) ScreenFlappy.Instance().pushFlappy();
                })
            ), 5),
            cc.callFunc(function(){
                Player.Instance().scheduleUpdate();
            })
        ));
    },

    update:function(dt)
    {
        this.lastTimePlay += dt;
        if (this.lastTimePlay < 1/8) return;

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
        if (down <= ScreenFlappy.Instance().limit.min * ScreenFlappy.Instance().height){
            ScreenFlappy.Instance().pushFlappy();
            this.lastTimePlay = 0;
            this.on = true;
        }

        if (targetName == "pipe") {
            if (down - 10 <= target.y - PIPE_CONST.GAP_DISTANCE / 2 && this.on) {
                ScreenFlappy.Instance().pushFlappy();
                this.lastTimePlay = 0;
            }
        }
        else{
            if (down <= target.y - target.width * target.getScaleY() * 3/2 && this.on){
                ScreenFlappy.Instance().pushFlappy();
                this.lastTimePlay = 0;
            }
        }
    },

    turnOff:function()
    {
        this.on = false;
    }
});

Player.Instance = function(){ return Player._instance; };