/**
 * Created by HP on 7/11/2020.
 */

var Obstacle = cc.Layer.extend({

    ctor: function(width, height)
    {
        //singleton
        this._super();
        Obstacle._instance = this;
        //singleton

        //basic attributes
        this.width = width;
        this.height = height;
        this.setPosition(width/2, height/2);
        //basic attributes

        //properties
        this.speed = 180;
        this.distanceBetweenPair = 160;
        this.pipeWidth = 60;
        this.gapDistance = 155;
        this.pipeStartPoint = this.width * 3/2;
        this.maxHeight = this.height/2 - this.gapDistance;
        this.minHeight = (75 / 900 - 1/2) * this.height + this.gapDistance;
        this.grounds = ["first", "second"];
        this.groundSpawnX = this.width * (1 - 100/1464);
        //properties

        this.spawnGrounds();
        this.spawnPipes();
    },

    initGame: function()
    {
        this.currentPipeTag = this.pipeTags[0];
        var curStartPoint = this.pipeStartPoint - this.x;
        for (var i = 0; i < this.pipeTags.length; i++){
            var pipePair = this.getChildByTag(this.pipeTags[i]);
            pipePair.setPosition(curStartPoint, this.getNewSpawnHeight(0));
            curStartPoint += this.pipeWidth + this.distanceBetweenPair;
        }

        this.update = this.idle;
        this.scheduleUpdate();
    },

    startGame: function()
    {
        this.update = this.updateWithPipes;
    },

    idle: function(dt)
    {
        this.moveGrounds(dt);
    },

    updateWithPipes: function(dt)
    {
        this.moveGrounds(dt);
        this.movePipes(dt);
    },

    spawnGrounds: function(){
        var firstGround = new cc.Sprite("flappy/ground.png");
        firstGround.setScale(this.width/firstGround.width, this.height/firstGround.height);
        firstGround.setPosition(0, 0);
        this.addChild(firstGround, 1, this.grounds[0]);
        var secondGround = new cc.Sprite("flappy/ground.png");
        secondGround.setScale(this.width/secondGround.width, this.height/secondGround.height);
        secondGround.setPosition(this.groundSpawnX, 0);
        this.addChild(secondGround, 1, this.grounds[1]);
    },

    spawnPipes: function()
    {
        var numOfPairs = Math.ceil(this.width / (this.pipeWidth + this.distanceBetweenPair)) + 1;
        this.pipeTags = [];
        for (var i = 0; i < numOfPairs; i++){
            this.pipeTags[i] = i;
            this.addChild( new PipePair(this.gapDistance, this.pipeWidth), 0, i)
        }
    },

    moveGrounds: function(dt)
    {
        for (var i = 0; i < this.grounds.length; i++){
            this.getChildByName(this.grounds[i]).x -= this.speed * dt;
        }

        var firstGround = this.getChildByName(this.grounds[0]);
        if (this.x + firstGround.x + this.width/2 <= this.width - this.groundSpawnX){
            firstGround.x += 2 * this.groundSpawnX;
            this.grounds.push(this.grounds.shift());
        }
    },

    movePipes: function(dt)
    {
        for (var i = 0; i < this.pipeTags.length; i++){
            this.getChildByTag(i).x -= this.speed * dt;
        }

        var firstPipe = this.getChildByTag(this.pipeTags[0]);
        if (this.x + firstPipe.x + this.pipeWidth <= 0){
            var lastPipe = this.getChildByTag(this.pipeTags[this.pipeTags.length - 1]);
            firstPipe.setPosition(lastPipe.x + this.pipeWidth + this.distanceBetweenPair, this.getNewSpawnHeight(lastPipe.y));
            this.pipeTags.push(this.pipeTags.shift());
        }
    },

    getNewSpawnHeight: function(oldHeight)
    {
        return Math.random()*(this.maxHeight - this.minHeight) + this.minHeight;
    },

    collided: function()
    {
        var curPipe = this.getChildByTag(this.currentPipeTag);
        if (Flappy.Instance().x + Flappy.Instance().width/2 * Flappy.Instance().getScaleX() < this.x + curPipe.x - this.pipeWidth/2) return false;
        else if (Flappy.Instance().x - Flappy.Instance().width/2 * Flappy.Instance().getScaleX() > this.x + curPipe.x + this.pipeWidth/2){
            this.currentPipeTag = (this.currentPipeTag + 1) % this.pipeTags.length;
            PointSystem.Instance().increaseScore();
            return false;
        }
        else{
            return Flappy.Instance().y + Flappy.Instance().height/2 * Flappy.Instance().getScaleY() >= this.y + curPipe.y + this.gapDistance/2 || Flappy.Instance().y - Flappy.Instance().height/2 * Flappy.Instance().getScaleY() <= this.y + curPipe.y - this.gapDistance/2;
        }
    }
});

Obstacle.Instance = function(){ return Obstacle._instance; };

var PipePair = cc.Layer.extend({
    ctor: function(distance, width)
    {
        this._super();
        this.zIndex = 0;
        this.width = width;

        var pipeup = new cc.Sprite("flappy/pipeup.png");
        var pipedown = new cc.Sprite("flappy/pipedown.png");
        pipeup.setAnchorPoint(0.5, 0);
        pipedown.setAnchorPoint(0.5, 1);
        pipeup.setScale(width/pipeup.width, width/pipeup.width);
        pipedown.setScale(width/pipedown.width, width/pipedown.width);

        this.addChild(pipeup);
        this.addChild(pipedown);
        pipeup.setPosition(0, distance/2);
        pipedown.setPosition(0, -distance/2);
    }
});
