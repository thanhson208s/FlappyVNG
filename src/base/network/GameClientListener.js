/**
 * Created by KienVN on 5/21/2015.
 */


var GameClientListener = cc.Class.extend(
    {
        ctor:function()
        {
            this._basePacket  = null;
            return true;
        },
        onFinishConnect:function(isSuccess)
        {
            cc.log("onFinishConnect:" + isSuccess);
            if(isSuccess)
            {
                fr.getCurrentScreen().onConnectSuccess();

                var pk = gv.gameClient.getOutPacket(CmdSendHandshake);
                pk.putData();
                gv.gameClient.getNetwork().send(pk);
                gv.poolObjects.push(pk);
            }else{
                fr.getCurrentScreen().onConnectFail(gv.gameClient._serverName + ":" + gv.gameClient._port);
            }
        },
        onDisconnected:function()
        {
            cc.log("onDisconnected");
        },
        onReceived:function(cmd, pkg)
        {
            cc.log("<=========================================");
            cc.log("CMD: " + cmd);
            var packet = gv.gameClient.getInPacket(cmd,pkg);
            if(packet == null)
                return;

            //log debug
            if(gv.gameClient._clientListener._basePacket == null)
            {
                var  basePacket = new CmdReceiveCommon();
                basePacket.init(pkg);
                basePacket.readData();
                gv.gameClient._clientListener._basePacket = basePacket;
            }

            for(var varName in packet)
            {
                if(!(varName in gv.gameClient._clientListener._basePacket)){
                    cc.log(varName + ":" + packet[varName]);
                }
            }
            //listener
            gv.gameClient._clientListener.onReceivedPacket(cmd,packet);

            //pool
            gv.poolObjects.push(packet);

        },
        onReceivedPacket:function(cmd, packet)
        {
            switch (cmd)
            {
                case gv.CMD.PACKET_ERROR:
                    break;
                case gv.CMD.HAND_SHAKE:
                    gv.gameClient.sendLoginRequest();
                    break;
                case gv.CMD.USER_LOGIN:
                    fr.getCurrentScreen().onFinishLogin();
                    break;
            }
        }
    }
)