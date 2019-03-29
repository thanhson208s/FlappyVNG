/**
 * Created by KienVN on 5/22/2015.
 */
var fr = fr ||{};

if(cc.sys.isNative) {
    fr.OutPacket.extend = cc.Class.extend;
    fr.InPacket.extend = cc.Class.extend;
}