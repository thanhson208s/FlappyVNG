/**
 * Created by CPU12735-local on 7/17/2020.
 */

var SoundCenter = cc.Layer.extend({
    ctor:function()
    {
        //singleton
        this._super();
        SoundCenter._instance = this;
        //singleton

        jsb.AudioEngine.lazyInit();

        this.musicVolume = 1;
        this.sfxVolume = 1;
    },

    onExit:function()
    {
        this._super();
        jsb.AudioEngine.end();
    }
});

SoundCenter.Instance = function(){return SoundCenter._instance; }


