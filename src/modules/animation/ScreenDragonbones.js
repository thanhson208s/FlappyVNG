/**
 * Created by GSN on 7/9/2015.
 */


var ScreenDragonbones = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var btnPlayIdle = gv.commonButton(200, 64, size.width - 120, size.height - 52,"Idle");
        this.addChild(btnPlayIdle);
        btnPlayIdle.addClickEventListener(this.testPlayAnimation.bind(this));

        var btnTestFinishEvent = gv.commonButton(200, 64, size.width - 120, size.height - 136,"Test Finish Event");
        btnTestFinishEvent.setTitleFontSize(26);
        this.addChild(btnTestFinishEvent);
        btnTestFinishEvent.addClickEventListener(this.testFinishAnimationEvent.bind(this));

        var btn_change_display = gv.commonButton(200, 64, size.width - 120, size.height - 220,"Change display");
        btn_change_display.setTitleFontSize(28);
        this.addChild(btn_change_display);
        btn_change_display.addClickEventListener(this.testChangeDisplayOnBone.bind(this));

        var btn_test_load = gv.commonButton(200, 64, size.width - 120, size.height - 304,"Test load ani");
        this.addChild(btn_test_load);
        btn_test_load.addClickEventListener(this.testLoadAnimation.bind(this));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        var xPos = (size.width - 220)/2;
        this.lblLog = gv.commonText(fr.Localization.text("..."), xPos, size.height*0.2);
        this.addChild(this.lblLog);

        this.nodeAnimation = new cc.Node();
        this.nodeAnimation.setPosition(xPos, size.height*0.5);
		this.nodeAnimation.setScaleX(-1);
        this.addChild(this.nodeAnimation);

        this.character = null;
        this.lblResult = new cc.LabelBMFont("",res.FONT_BITMAP_DICE_NUMBER);

        this.lblResult.setAnchorPoint(0.5,0.5);
        this.lblResult.retain();
        this.testPlayAnimation();
    },
    onEnter:function(){
        this._super();
    },
    onRemoved:function()
    {
        fr.unloadAllAnimationData(this);
    },
    updateTest:function(dt)
    {
        this.nodeAnimation.setScale(0.5);
        this.nodeAnimation.runAction(cc.scaleTo(0.5, 1.0).easing(cc.easeBounceOut()));
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
    testAnimationBinding:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.chipu,this);
        this.nodeAnimation.addChild(this.character);
        this.character.setPosition(cc.p(0,0));
        this.character.setScale(2);
        this.character.getAnimation().gotoAndPlay("win_0_",-1,-1,1);
        this.character.setCompleteListener(function () {
            this.testAnimationBinding();
        }.bind(this));

    },
    testPlayAnimation:function()
    {
        if(this.character)
            this.character.removeFromParent(true);

        this.character = fr.createAnimationById(resAniId.chipu,this);
        //doi mau, yeu cau phai co file shader, nhung bone co ten bat dau tu color_ se bi doi mau
        this.character.setBaseColor(255,255,0);
        //chinh toc do play animation
        this.character.getAnimation().setTimeScale(0.5);
        this.nodeAnimation.addChild(this.character);
        //play animation gotoAndPlay(animationName, fadeInTime, duration, playTimes)
        this.character.getAnimation().gotoAndPlay("idle_0_",-1);

    },
    testFinishAnimationEvent:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.chipu,this);
        this.nodeAnimation.addChild(this.character);
        this.character.getAnimation().gotoAndPlay("win_0_",-1,-1,1);
        this.character.setCompleteListener(this.onFinishAnimations.bind(this));
    },
    testChangeDisplayOnBone:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.eff_dice_number,this);
        this.nodeAnimation.addChild(this.character);
        this.lblResult.removeFromParent();
        this.character.getArmature().getCCSlot("2").setDisplayImage(this.lblResult);
        var number = 2 + cc.random0To1()*10;
        this.lblResult.setString(Math.floor(number).toString());
        this.lblResult.retain();
        this.character.getAnimation().gotoAndPlay("run",0);

    },
    testLoadAnimation:function()
    {
        var testCount = 100;
        var start = Date.now();

        for(var i = 0; i< testCount; i++)
        {
            var ani  = fr.createAnimationById(resAniId.firework_test,this);
            this.addChild(ani);
            ani.setPosition(cc.random0To1()*cc.winSize.width, cc.random0To1()*cc.winSize.height);
            ani.getAnimation().gotoAndPlay("run",cc.random0To1()*5,-1,1);
            ani.setCompleteListener(this.onFinishEffect.bind(this));
        }
        var end = Date.now();
        cc.log("time: " + (end - start));
        this.lblLog.setString("time: " + (end - start));
    },

    onFinishAnimations:function()
    {
        this.character.getAnimation().gotoAndPlay("idle_0_",0);
    },
    onFinishEffect:function(animation)
    {
        animation.removeFromParent();
    }

});