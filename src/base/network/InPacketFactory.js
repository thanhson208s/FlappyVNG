/**
 * Created by GSN on 7/8/2015.
 */

InPacketFactory = cc.Class.extend({
        ctor: function () {
            this._listPacket = {};
        },
        createPacket:function( cmdId, pkg) {
            var classPacket = this._listPacket[cmdId];
            if(!classPacket)
            {
                return null;
            }
            var pk = gv.poolObjects.get(classPacket);
            if(pk)
            {
                pk.init(pkg);
                pk.readData();
                return pk;
            }
            return null;
        },
        addPacketMap:function(listPacket){
            this._listPacket = _.extend(this._listPacket, listPacket);
        }
    }
);