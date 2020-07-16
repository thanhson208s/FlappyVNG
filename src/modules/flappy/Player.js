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
    },

    update:function(dt)
    {
        var flappy = Flappy.Instance();
        var pipe = Obstacle.Instance().getCurrentPipe();
        if (flappy.y - flappy.height/2 * flappy.getScaleY() <= pipe.y - PIPE_CONST.GAP_DISTANCE/2)
            ScreenFlappy.Instance().bird.v = FLAPPY_CONST.V_0;
        else{
            var v = ScreenFlappy.Instance().bird.v + FLAPPY_CONST.G * dt;
            var y = flappy.y + v * dt - 2;
            if (flappy.x + dt * PIPE_CONST.SPEED - flappy.width/2 * flappy.getScaleX() <= pipe.x + PIPE_CONST.WIDTH/2) {
                if (y - flappy.height / 2 * flappy.getScaleY() <= pipe.y - PIPE_CONST.GAP_DISTANCE / 2)
                    ScreenFlappy.Instance().bird.v = FLAPPY_CONST.V_0;
            }
        }
    }
});

Player.Instance = function(){ return Player._instance; };