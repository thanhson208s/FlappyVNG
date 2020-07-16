/**
 * Created by CPU12735-local on 7/14/2020.
 */

var FlashLayer = cc.LayerColor.extend({
    ctor: function(width, height)
    {
        //singleton
        this._super(cc.color(255, 255, 255, 0), width, height);
        FlashLayer._instance = this;
        //singleton

        //basic attributes
        this.setPosition(0, 0);
        this.startOpacity = 120;
        this.maxOpacity = 255;
        this.effectTime = 0.3;
        this.increasing = true;
        //basic attributes
    },

    update: function(dt)
    {
        if (this.increasing){
            var newOpacity = this.opacity + (this.maxOpacity * 2 - this.startOpacity) * dt / this.effectTime;
            if (newOpacity > this.maxOpacity){
                this.increasing = false;
                this.opacity = this.maxOpacity;
            }
            else this.opacity = newOpacity;
        }else{
            var newOpacity = this.opacity - (this.maxOpacity * 2 - this.startOpacity) * dt / this.effectTime;
            if (newOpacity < 0){
                this.increasing = true;
                this.opacity = 0;
                this.unscheduleUpdate();
                return;
            }
            else this.opacity = newOpacity;
        }
    },

    flash: function()
    {
        this.opacity = this.startOpacity;
        this.scheduleUpdate();
    }
});

FlashLayer.Instance = function(){ return FlashLayer._instance; }
