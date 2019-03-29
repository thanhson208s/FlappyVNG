/**
 * Created by GSN on 7/9/2015.
 */


var ScreenLocalization = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        this.loadGui();

    },
    loadGui:function()
    {
        this.removeAllChildren();
        var size = cc.winSize;
        var xBtn = 7*size.height/12;

        var btnVietLang = gv.commonButton(200, 64, size.width - 120, size.height - 52,"Vietnamese");
        this.addChild(btnVietLang);
        btnVietLang.addClickEventListener(this.onSelectVietnamese.bind(this));

        var btnEnglish = gv.commonButton(200, 64, size.width - 120, size.height - 136,"English");
        this.addChild(btnEnglish);
        btnEnglish.addClickEventListener(this.onSelectEnglish.bind(this));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        var lblHello = gv.commonText(fr.Localization.text("lang_hello"), size.width*0.4, size.height*0.8);
        this.addChild(lblHello);

        var lblDemo = gv.commonText(fr.Localization.text("lang_auto_text"), size.width*0.4, size.height*0.5);
        this.addChild(lblDemo);

    },
    onEnter:function(){
        this._super();
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
    onSelectVietnamese:function(sender)
    {
        fr.Localization.getInstance().setCurrentLanguage('vi');
        this.loadGui();
    },
    onSelectEnglish:function(sender)
    {
        fr.Localization.getInstance().setCurrentLanguage('en');
        this.loadGui();
    }
});