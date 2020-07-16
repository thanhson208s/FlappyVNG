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
        this.setAnchorPoint(0, 0);
        this.setPosition(0, 0);
        //basic attributes

        //Constants
        this.speed = PIPE_CONST.SPEED;
        this.distanceBetweenPair = PIPE_CONST.DISTANCE;
        this.pipeWidth = PIPE_CONST.WIDTH;
        this.gapDistance = PIPE_CONST.GAP_DISTANCE;
        this.pipeStartPoint = this.width * 2;
        this.maxHeight = this.height - (this.gapDistance/2 + this.pipeWidth / 2);
        this.minHeight = BG_CONST.GROUND_HEIGHT * this.height + (this.gapDistance/2 + this.pipeWidth / 2);
        this.grounds = ["first", "second"];
        this.groundSpawnX = this.width * (3/2 - BG_CONST.OVERLAP_WIDTH);
        //Constants

        this.spawnGrounds();
        this.spawnPipes();
    },

    initGame: function()
    {
        this.currentPipeTag = this.pipeTags[0];
        var curStartPoint = this.pipeStartPoint;
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
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.moveGrounds(dt);
    },

    updateWithPipes: function(dt)
    {
        dt = ScreenFlappy.Instance().dtAfterTimeScale(dt);
        this.moveGrounds(dt);
        this.movePipes(dt);
    },

    spawnGrounds: function(){
        var firstGround = new cc.Sprite("flappy/ground.png");
        firstGround.setScale(this.width/firstGround.width, this.height/firstGround.height);
        firstGround.setPosition(this.width/2, this.height/2);
        this.addChild(firstGround, 1, this.grounds[0]);
        var secondGround = new cc.Sprite("flappy/ground.png");
        secondGround.setScale(this.width/secondGround.width, this.height/secondGround.height);
        secondGround.setPosition(this.groundSpawnX, this.height/2);
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
        if (firstGround.x  <= this.width - this.groundSpawnX){
            firstGround.x = this.groundSpawnX;
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

    collided: function(x, y)
    {
        var curPipe = this.getChildByTag(this.currentPipeTag);
        var flappy = Flappy.Instance();

        var left = x - flappy.width/2 * flappy.getScaleX();
        //right
        var rot = flappy.rotation / 180 * Math.PI;
        var a = flappy.width/2 * flappy.getScaleX();
        var b = flappy.height/2 * flappy.getScaleY();
        var A = Math.pow(Math.cos(rot), 2)/(a*a) + Math.pow(Math.sin(rot), 2)/(b*b);
        var B = Math.sin(2*rot)*(1/(a*a) - 1/(b*b));
        var C = Math.pow(Math.sin(rot), 2)/(a*a) + Math.pow(Math.cos(rot), 2)/(b*b);
        var right = x + 1/Math.sqrt(A - B*B/(4*C));
        //right
        var down = y - 1/Math.sqrt(C - B*B/(4*A));
        if (down <= ScreenFlappy.Instance().limit.min * ScreenFlappy.Instance().height){
            flappy.y = ScreenFlappy.Instance().limit.min * ScreenFlappy.Instance().height + (y - down);
            return true;
        }

        flappy.y = y;
        if (right < curPipe.x - this.pipeWidth/2)
            return false;
        else if (left >= curPipe.x + this.pipeWidth/2){
            this.currentPipeTag = (this.currentPipeTag + 1) % this.pipeTags.length;
            PointSystem.Instance().increaseScore();
            return false;
        }
        else{
            var up = y + 1/Math.sqrt(C - B*B/(4*A));
            var colliedWithPipe = up >= curPipe.y + this.gapDistance/2 || down <= curPipe.y - this.gapDistance/2;
            return colliedWithPipe && !DEBUGGING;
        }
    },

    getCurrentPipe:function()
    {
        return this.getChildByTag(this.currentPipeTag);
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
