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

        this.musicOn = true;
        this.musicVolume = 0.2;
        this.sfxOn = true;
        this.sfxVolume = this._sfxVolume = 1;

        jsb.AudioEngine.lazyInit();
        this.musicId = jsb.AudioEngine.play2d("flappy/theme.mp3", true, this.musicVolume);
    },

    onExit:function()
    {
        this._super();
        jsb.AudioEngine.end();
    },

    playEffect:function(url, volume)
    {
        if (volume == null) volume = this.sfxVolume;
        if (volume > 0 && this.sfxOn) {
            jsb.AudioEngine.play2d("flappy/sfx/" + url, false, volume);
        }
    },

    setMusicVolume:function(volume)
    {
        this.musicVolume = volume;
        if (this.musicVolume == 0) this.musicOn = false;
        else this.musicOn = true;
        jsb.AudioEngine.setVolume(this.musicId, volume);
    },

    toggleMusicVolume:function()
    {
        if (this.musicOn){
            this.musicOn = false;
            var volume = 0;
        }else{
            this.musicOn = true;
            if (this.musicVolume > 0)
                var volume = this.musicVolume;
            else{
                var volume = this.musicVolume = 1;
            }
        }
        jsb.AudioEngine.setVolume(this.musicId, volume);
    },

    toggleSfxVolume:function()
    {
        if (this.sfxOn){
            this.sfxOn = false;
            this.sfxVolume = 0;
        }else{
            this.sfxOn = true;
            if (this._sfxVolume > 0)
                this.sfxVolume = this._sfxVolume;
            else{
                this.sfxVolume = this._sfxVolume = 1;
            }
        }
    }
});

SoundCenter.Instance = function(){return SoundCenter._instance; }


