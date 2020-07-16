/**
 * Created by HP on 7/9/2020.
 */

var Background = cc.Layer.extend({
    ctor:function(width, height)
    {
        //singleton
        this._super();
        Background._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setPosition(width/2, height/2);
        //basic attributes

        //constants
        this.speed = 10;
        this.backgrounds = ["first", "second"];
        this.distanceBetweenBackgrounds = this.width * (1 - 100/1464);
        this.cloudNames = ["small0", "small1", "small2", "medium0", "medium1", "large0", "large1"];
        this.cloudSpeeds = {"small0": 70, "small1": 60, "small2": 50, "medium0": 40, "medium1": 30, "large0": 20, "large1": 0};
        this.cloudProbs = {"small0": 0.1, "small1": 0.09, "small2": 0.08, "medium0": 0.04, "medium1": 0.03, "large0": 0.02, "large1": 0.01};
        //constants

        var firstSprite = new cc.Sprite("flappy/background.png");
        firstSprite.setScale(this.width/firstSprite.width, this.height/firstSprite.height);
        firstSprite.setPosition(0, 0);
        this.addChild(firstSprite, 0, this.backgrounds[0]);

        var secondSprite = new cc.Sprite("flappy/background.png");
        secondSprite.setScale(firstSprite.getScaleX(), firstSprite.getScaleY());
        secondSprite.setPosition(this.distanceBetweenBackgrounds, 0);
        this.addChild(secondSprite, 0, this.backgrounds[1]);

        //this.spawnCloud();
    },

    initGame:function()
    {
        this.scheduleUpdate();
    },

    update:function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.x -= this.speed * dt;

        var firstBackground = this.getChildByName(this.backgrounds[0]);
        if (this.x + firstBackground.x  <= this.width/2 - this.distanceBetweenBackgrounds){
            firstBackground.x += 2 * this.distanceBetweenBackgrounds;
            this.backgrounds.push(this.backgrounds.shift());
        }
    },

    spawnCloud:function(){
        this.clouds = [];
        var cloud;
        cloud = new cc.Sprite("flappy/cloud/large1.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(0, this.height/4);
        this.addChild(cloud, 1);
        this.clouds.push(cloud);

        cloud = new cc.Sprite("flappy/cloud/large0.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);

        cloud = new cc.Sprite("flappy/cloud/medium0.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);

        cloud = new cc.Sprite("flappy/cloud/medium1.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);

        cloud = new cc.Sprite("flappy/cloud/small0.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);

        cloud = new cc.Sprite("flappy/cloud/small1.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);

        cloud = new cc.Sprite("flappy/cloud/small2.png");
        cloud.setScale(0.2, 0.2);
        cloud.setPosition(this.width/6, this.height/4);
        this.addChild(cloud, 1);
    }
});

Background.Instance = function(){ return Background._instance; };

