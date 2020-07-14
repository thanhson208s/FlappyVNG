/**
 * Created by HP on 7/11/2020.
 */

var Obstacle = cc.Layer.extend({

    ctor: function(width, height)
    {
        this._super();
        this.width = width;
        this.height = height;
        this.zIndex = 0;

        this.speed = 180;
        this.grounds = ["first", "second"];
        this.distanceBetweenPair = 150;
        this.pipeWidth = 80;
        this.gapDistance = 220;
        this.pipeStartPoint = this.width * 3/2;
        this.maxHeight = this.height/2 - this.gapDistance;
        this.minHeight = (75 / 900 - 1/2) * this.height + this.gapDistance;
        this.currentPipeTag = 0;

        var firstGround = new cc.Sprite("flappy/ground.png");
        firstGround.setScale(this.width/firstGround.width, this.height/firstGround.height);
        firstGround.zIndex = 1;
        var secondGround = new cc.Sprite("flappy/ground.png");
        secondGround.setScale(this.width/secondGround.width, this.height/secondGround.height);
        secondGround.zIndex = 1;
        this.addChild(firstGround, 1, this.grounds[0]);
        this.addChild(secondGround, 1, this.grounds[1]);

        this.groundSpawnX = this.width * (1 - 100/firstGround.width);
        firstGround.setPosition(0, 0);
        secondGround.setPosition(this.groundSpawnX, 0);

        this.update = this.idle;
        this.scheduleUpdate();
    },
    idle: function(dt)
    {
        this.x -= this.speed * dt;

        var firstGround = this.getChildByName(this.grounds[0]);
        if (this.x + firstGround.x + this.width/2 <= this.width - this.groundSpawnX){
            firstGround.x += 2 * this.groundSpawnX;
            this.grounds.push(this.grounds.shift());
        }
    },
    updateWithPipes: function(dt)
    {
        this.x -= this.speed * dt;

        var firstGround = this.getChildByName(this.grounds[0]);
        if (this.x + firstGround.x + this.width/2 <= this.width - this.groundSpawnX){
            firstGround.x += 2 * this.groundSpawnX;
            this.grounds.push(this.grounds.shift());
        }

        var firstPipe = this.getChildByTag(this.pairs[0]);
        if (this.x + firstPipe.x + this.pipeWidth <= 0){
            var lastPipe = this.getChildByTag(this.pairs[this.pairs.length - 1]);
            firstPipe.setPosition(lastPipe.x + this.pipeWidth + this.distanceBetweenPair, this.getNewSpawnHeight(lastPipe.y));
            this.pairs.push(this.pairs.shift());
        }
    },
    initPipes: function()
    {
        var numOfPairs = Math.ceil(this.width / (this.pipeWidth + this.distanceBetweenPair)) + 1;
        var i;
        this.pairs = [];
        var curStartPoint = this.pipeStartPoint - this.x
        for (i = 0; i < numOfPairs; i++){
            this.pairs[i] = i;
            var pipePair = new PipePair(this.gapDistance, this.pipeWidth);
            this.addChild(pipePair, 0, this.pairs[i])
            pipePair.setPosition(curStartPoint, this.getNewSpawnHeight(0));
            curStartPoint += this.pipeWidth + this.distanceBetweenPair;
        }
        this.update = this.updateWithPipes;
    },
    getNewSpawnHeight: function(oldHeight)
    {
        //TODO: need a more complicated function
        return Math.random()*(this.maxHeight - this.minHeight) + this.minHeight;
    },
    collided: function(flappy)
    {
        var curPipe = this.getChildByTag(this.currentPipeTag);
        if (flappy.x + flappy.width/2 * flappy.getScaleX() < this.x + curPipe.x - this.pipeWidth/2) return false;
        else if (flappy.x - flappy.width/2 * flappy.getScaleX() > this.x + curPipe.x + this.pipeWidth/2){
            this.currentPipeTag = (this.currentPipeTag + 1) % this.pairs.length;
            PointSystem.instance.increasePoint();
            return false;
        }
        else{
            //TODO: detect collision if exists
            return false;
        }
    }
});

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
