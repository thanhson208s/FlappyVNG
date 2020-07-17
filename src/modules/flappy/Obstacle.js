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
        this.pipeStartPoint = this.width * 3/2;
        this.maxHeight = this.height - (this.gapDistance/2 + this.pipeWidth / 2);
        this.minHeight = BG_CONST.GROUND_HEIGHT * this.height + (this.gapDistance/2 + this.pipeWidth / 2);
        this.grounds = ["first", "second"];
        this.groundSpawnX = this.width * (3/2 - BG_CONST.OVERLAP_WIDTH);
        this.coinRate = COIN_RATE;
        this.targets = [];
        this.targetNames = [];
        this.plus1 = [];
        this.plus2 = [];
        //Constants

        this.spawnGrounds();
        this.spawnPipes();
    },

    initGame: function()
    {
        for (var i = 0; i < this.targets.length; i++){
            if (this.targetNames[i] == "coin"){
                this.removeChild(this.targets[i]);
            }
        }
        var nTarget = this.targets.length;
        for (var i = 0; i < nTarget; i++){
            if (this.targetNames[0] == "coin"){
                this.targetNames.shift();
                this.targets.shift();
            }
            else{
                this.targetNames.push(this.targetNames.shift());
                this.targets.push(this.targets.shift());
            }
        }
        this.currentTargetIndex = 0;
        var curStartPoint = this.pipeStartPoint;
        for (var i = 0; i < this.targets.length; i++){
            var pipePair = this.targets[i];
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
        this.moveTargets(dt);
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
        for (var i = 0; i < numOfPairs; i++){
            var pipePair = new PipePair(this.gapDistance, this.pipeWidth)
            this.addChild(pipePair);
            this.targets.push(pipePair);
            this.targetNames.push("pipe");
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

    moveTargets: function(dt)
    {
        for (var i = 0; i < this.targets.length; i++){
            this.targets[i].x -= this.speed * dt;
        }

        var firstTarget = this.targets[0];
        if (firstTarget.x + this.pipeWidth <= 0){
            if (this.targetNames[0] == "coin"){
                this.removeChild(this.targets.shift());
                this.targetNames.shift();
            }
            else {
                var lastPipe = this.targets[this.targets.length - 1];

                var coinCount = 0;
                while(Math.random() < this.coinRate){
                    coinCount++;
                }
                if (coinCount == 0)
                    firstTarget.setPosition(lastPipe.x + this.pipeWidth + this.distanceBetweenPair, this.getNewSpawnHeight(lastPipe.y));
                else {
                    var distance = (5 / 8 * (this.pipeWidth + this.distanceBetweenPair) * (coinCount + 1) - (coinCount - 1) * 80) / (coinCount + 1);
                    var curX = lastPipe.x;
                    var curY = lastPipe.y;
                    for (var i = 0; i < coinCount; i++){
                        curY = this.getNewSpawnHeight(curY);
                        curX += distance;
                        var coin = new Coin(curX, curY);
                        this.targets.push(coin);
                        this.targetNames.push("coin");
                        this.addChild(coin);
                    }
                    firstTarget.setPosition(curX + distance, this.getNewSpawnHeight(curY));
                }

                this.targets.push(this.targets.shift());
                this.targetNames.push(this.targetNames.shift());

            }
            this.currentTargetIndex--;
        }
    },

    getNewSpawnHeight: function(oldHeight)
    {
        return Math.random()*(this.maxHeight - this.minHeight) + this.minHeight;
    },

    collided: function(x, y)
    {
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
        var up = y + 1/Math.sqrt(C - B*B/(4*A));
        if (down <= ScreenFlappy.Instance().limit.min * ScreenFlappy.Instance().height){
            flappy.y = ScreenFlappy.Instance().limit.min * ScreenFlappy.Instance().height + (y - down);
            return true;
        }
        flappy.y = y;

        if (this.targetNames[this.currentTargetIndex] == "coin"){
            var coin = this.targets[this.currentTargetIndex];
            if (right <= coin.x - coin.width/2 * coin.getScaleX()){
                //do nothing
            }
            else if (left >= coin.x + coin.width/2 * coin.getScaleX()){
                this.currentTargetIndex++;
            }else{
                if (!(up <= coin.y - coin.height/2 * coin.getScaleY() || down >= coin.y + coin.height/2 * coin.getScaleY())){
                    this.targets.splice(this.currentTargetIndex, 1);
                    this.targetNames.splice(this.currentTargetIndex, 1);
                    if (this.plus2.length == 0) {
                        var plus = new PlusPoint(2);
                        this.addChild(plus);
                        this.plus2.push(plus);
                    }
                    this.plus2.shift().show(coin.x, coin.y);
                    this.removeChild(coin);
                    PointSystem.Instance().increaseScore(2);
                }
            }
            return false;
        }
        else {
            var curPipe = this.targets[this.currentTargetIndex];
            if (right < curPipe.x - this.pipeWidth / 2)
                return false;
            else if (left > curPipe.x + this.pipeWidth / 2) {
                PointSystem.Instance().increaseScore(1);
                this.currentTargetIndex++;
                if (this.plus1.length == 0) {
                    var plus = new PlusPoint(1);
                    this.addChild(plus);
                    this.plus1.push(plus);
                }
                this.plus1.shift().show(left, flappy.y);
                return false;
            }
            else {
                var colliedWithPipe = up >= curPipe.y + this.gapDistance / 2 || down <= curPipe.y - this.gapDistance / 2;
                return colliedWithPipe && !DEBUGGING;
            }
        }
    },

    getCurrentTarget:function()
    {
        return this.targets[this.currentTargetIndex];
    },

    getCurrentTargetName:function()
    {
        return this.targetNames[this.currentTargetIndex];
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


var Coin = cc.Sprite.extend({
   ctor:function(x, y)
   {
       this._super("flappy/coin/coin0.png");

       this.setPosition(x, y);
       this.setScale(0.1, 0.1);

       this.index = 0;
       this.rate = 10;
       this.spriteNames = [0, 1, 2, 3, 4, 5].map(function(x){ return "flappy/coin/coin" + x + ".png"});

       var animation = cc.Animation();
       for (var i = 0; i < this.spriteNames.length; i++){
           animation.addSpriteFrameWithFile(this.spriteNames[i]);
       }
       animation.setDelayPerUnit(1/this.rate);
       var animate = cc.Animate(animation).repeatForever();
       this.runAction(animate);

       this.amplitude = Math.random() * (1/5 - 1/8) + 1/8;
       this.maxHeight = this.y + Obstacle.Instance().height * this.amplitude;
       this.minHeight = this.y - Obstacle.Instance().height * this.amplitude;
       if (this.maxHeight >= Obstacle.Instance().maxHeight){
           this.maxHeight = Obstacle.Instance().maxHeight;
           this.minHeight = this.maxHeight - 2 * this.amplitude * Obstacle.Instance().height;
       }else if (this.minHeight <= Obstacle.Instance().maxHeight){
           this.minHeight = Obstacle.Instance().minHeight;
           this.maxHeight = this.minHeight + 2 * this.amplitude * Obstacle.Instance().height;
       }

       var coin = this;
       this.runAction(cc.sequence(
           cc.moveBy(Math.random() * 0.5, cc.p(0, this.maxHeight - this.y)),
           cc.callFunc(function(){
               coin.runAction(cc.sequence(
                   cc.moveBy(Math.random() * 1 + 1, cc.p(0, coin.minHeight - coin.maxHeight)),
                   cc.moveBy(Math.random() * 1 + 1, cc.p(0, coin.maxHeight - coin.minHeight))
               ).repeatForever());
           })
        ));
   }
});

var PlusPoint = cc.Sprite.extend({
    ctor:function(point)
    {
        this._super("flappy/plus" + point + ".png");
        this.setScale(0.8, 0.8);
        this.setOpacity(0);
        this.point = point;
    },

    show:function(x, y)
    {
        this.setOpacity(255);
        this.setPosition(x, y);
        var plus = this;

        this.runAction(cc.sequence(
            cc.fadeOut(1),
            cc.callFunc(function(){
                if (plus.point == 1)
                    Obstacle.Instance().plus1.push(plus);
                else
                    Obstacle.Instance().plus2.push(plus);
            })
        ));
        this.runAction(cc.moveBy(1, cc.p(-Obstacle.Instance().speed, 50)));
    }
});
