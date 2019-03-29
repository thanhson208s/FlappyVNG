/**
 * Created by KienVN on 9/29/2017.
 */

var gv = gv||{};

gv.commonButton = function(w, h, x, y, text){
    if(text === undefined)
        text = "";
    var btn = new ccui.Button(res.base.img_btn_normal, res.base.img_btn_normal, res.base.img_btn_disable);
    if(x === undefined)
        x = 0;
    if(y === undefined)
        y = 0;
    btn.attr({
        x: x,
        y: y
    });

    btn.setTitleText(text);
    btn.setTitleFontSize(32);
    btn.setTitleColor(cc.color(65,65,65,255));
    btn.setZoomScale(0.1);
    btn.setPressedActionEnabled(true);

    btn.setScale9Enabled(true);
    btn.setUnifySizeEnabled(false);
    btn.ignoreContentAdaptWithSize(false);
    var capInsets = cc.rect(15,15, 15, 15);
    btn.setCapInsets(capInsets);
    btn.setContentSize(cc.size(w,h));
    return btn;
};

gv.commonText = function(text, x, y){
        var _lb = new ccui.Text(text,'', 30);
        if(x === undefined)
            x = 0;
        if(y === undefined)
            y = 0;
        _lb.attr({
            x: x,
            y: y
        });
        _lb.setColor(cc.color(220,220,220,255));
        return _lb;
};