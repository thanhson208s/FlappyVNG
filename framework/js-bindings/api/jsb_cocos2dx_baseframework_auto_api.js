/**
 * @module cocos2dx_baseframework
 */
var fr = fr || {};

/**
 * @class FrameworkDelegate
 */
fr.FrameworkDelegate = {

/**
 * @method setFolderAssets
 * @param {String} arg0
 */
setFolderAssets : function (
str 
)
{
},

/**
 * @method logStackError
 * @param {String} arg0
 * @param {unsigned int} arg1
 * @param {String} arg2
 */
logStackError : function (
str, 
int, 
str 
)
{
},

/**
 * @method applicationFinished
 */
applicationFinished : function (
)
{
},

/**
 * @method applicationDidEnterBackground
 */
applicationDidEnterBackground : function (
)
{
},

/**
 * @method applicationWillEnterForeground
 */
applicationWillEnterForeground : function (
)
{
},

/**
 * @method applicationDidFinishLaunching
 * @return {bool}
 */
applicationDidFinishLaunching : function (
)
{
    return false;
},

/**
 * @method getConfig
 * @param {String} arg0
 * @return {String}
 */
getConfig : function (
str 
)
{
    return ;
},

/**
 * @method setJSVersion
 * @param {String} arg0
 */
setJSVersion : function (
str 
)
{
},

/**
 * @method setConfig
 * @param {String} arg0
 * @param {String} arg1
 */
setConfig : function (
str, 
str 
)
{
},

/**
 * @method getFolderAssetsName
 * @return {String}
 */
getFolderAssetsName : function (
)
{
    return ;
},

/**
 * @method getInstance
 * @return {fr::FrameworkDelegate}
 */
getInstance : function (
)
{
    return fr::FrameworkDelegate;
},

/**
 * @method FrameworkDelegate
 * @constructor
 */
FrameworkDelegate : function (
)
{
},

};

/**
 * @class sPackage
 */
fr.sPackage = {

/**
 * @method sPackage
 * @constructor
 */
sPackage : function (
)
{
},

};

/**
 * @class InPacket
 */
fr.InPacket = {

/**
 * @method getDouble
 * @return {double}
 */
getDouble : function (
)
{
    return 0;
},

/**
 * @method getCmdId
 * @return {int}
 */
getCmdId : function (
)
{
    return 0;
},

/**
 * @method getByte
 * @return {int}
 */
getByte : function (
)
{
    return 0;
},

/**
 * @method getError
 * @return {int}
 */
getError : function (
)
{
    return 0;
},

/**
 * @method getLong
 * @return {long long}
 */
getLong : function (
)
{
    return long long;
},

/**
 * @method getBool
 * @return {bool}
 */
getBool : function (
)
{
    return false;
},

/**
 * @method getInt
 * @return {int}
 */
getInt : function (
)
{
    return 0;
},

/**
 * @method init
 * @param {fr::sPackage} arg0
 */
init : function (
spackage 
)
{
},

/**
 * @method getControllerId
 * @return {int}
 */
getControllerId : function (
)
{
    return 0;
},

/**
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
},

/**
 * @method getUnsignedShort
 * @return {unsigned short}
 */
getUnsignedShort : function (
)
{
    return 0;
},

/**
 * @method getShort
 * @return {int}
 */
getShort : function (
)
{
    return 0;
},

/**
 * @method getCharArray
 * @param {int} arg0
 * @return {char}
 */
getCharArray : function (
int 
)
{
    return 0;
},

/**
 * @method getBytes
 * @param {int} arg0
 * @return {char}
 */
getBytes : function (
int 
)
{
    return 0;
},

/**
 * @method InPacket
 * @constructor
 */
InPacket : function (
)
{
},

};

/**
 * @class OutPacket
 */
fr.OutPacket = {

/**
 * @method reset
 */
reset : function (
)
{
},

/**
 * @method putInt
 * @param {int} arg0
 * @return {fr::OutPacket}
 */
putInt : function (
int 
)
{
    return fr::OutPacket;
},

/**
 * @method getCmdId
 * @return {int}
 */
getCmdId : function (
)
{
    return 0;
},

/**
 * @method setCmdId
 * @param {int} arg0
 */
setCmdId : function (
int 
)
{
},

/**
 * @method packHeader
 */
packHeader : function (
)
{
},

/**
 * @method setControllerId
 * @param {int} arg0
 */
setControllerId : function (
int 
)
{
},

/**
 * @method putUnsignedShort
 * @param {unsigned short} arg0
 * @return {fr::OutPacket}
 */
putUnsignedShort : function (
short 
)
{
    return fr::OutPacket;
},

/**
 * @method putShort
 * @param {int} arg0
 * @return {fr::OutPacket}
 */
putShort : function (
int 
)
{
    return fr::OutPacket;
},

/**
 * @method putDouble
 * @param {double} arg0
 * @return {fr::OutPacket}
 */
putDouble : function (
double 
)
{
    return fr::OutPacket;
},

/**
 * @method initData
 * @param {int} arg0
 */
initData : function (
int 
)
{
},

/**
 * @method putString
 * @param {String} arg0
 * @return {fr::OutPacket}
 */
putString : function (
str 
)
{
    return fr::OutPacket;
},

/**
 * @method putBytes
 * @param {char} arg0
 * @param {int} arg1
 * @return {fr::OutPacket}
 */
putBytes : function (
char, 
int 
)
{
    return fr::OutPacket;
},

/**
 * @method putLong
 * @param {long long} arg0
 * @return {fr::OutPacket}
 */
putLong : function (
long long 
)
{
    return fr::OutPacket;
},

/**
 * @method updateSize
 */
updateSize : function (
)
{
},

/**
 * @method getData
 * @param {int} arg0
 * @return {char}
 */
getData : function (
int 
)
{
    return 0;
},

/**
 * @method putByteArray
 * @param {char} arg0
 * @param {int} arg1
 * @return {fr::OutPacket}
 */
putByteArray : function (
char, 
int 
)
{
    return fr::OutPacket;
},

/**
 * @method putByte
 * @param {int} arg0
 * @return {fr::OutPacket}
 */
putByte : function (
int 
)
{
    return fr::OutPacket;
},

/**
 * @method updateUnsignedShortAtPos
 * @param {unsigned short} arg0
 * @param {int} arg1
 */
updateUnsignedShortAtPos : function (
short, 
int 
)
{
},

/**
 * @method OutPacket
 * @constructor
 */
OutPacket : function (
)
{
},

};

/**
 * @class GsnClient
 */
fr.GsnClient = {

/**
 * @method setFinishConnectListener
 * @param {function} arg0
 */
setFinishConnectListener : function (
func 
)
{
},

/**
 * @method scheduleUpdateReceiver
 */
scheduleUpdateReceiver : function (
)
{
},

/**
 * @method setDisconnectListener
 * @param {function} arg0
 */
setDisconnectListener : function (
func 
)
{
},

/**
 * @method setTimeoutForConnect
 * @param {int} arg0
 */
setTimeoutForConnect : function (
int 
)
{
},

/**
 * @method createSocket
 */
createSocket : function (
)
{
},

/**
 * @method isConnected
 * @return {bool}
 */
isConnected : function (
)
{
    return false;
},

/**
 * @method getTimeoutForConnect
 * @return {int}
 */
getTimeoutForConnect : function (
)
{
    return 0;
},

/**
 * @method connect
 * @param {char} arg0
 * @param {int} arg1
 */
connect : function (
char, 
int 
)
{
},

/**
 * @method reconnect
 * @return {bool}
 */
reconnect : function (
)
{
    return false;
},

/**
 * @method clearQueue
 */
clearQueue : function (
)
{
},

/**
 * @method onSubThreadStarted
 */
onSubThreadStarted : function (
)
{
},

/**
 * @method disconnect
 */
disconnect : function (
)
{
},

/**
 * @method setReceiveDataListener
 * @param {function} arg0
 */
setReceiveDataListener : function (
func 
)
{
},

/**
 * @method initThread
 * @return {bool}
 */
initThread : function (
)
{
    return false;
},

/**
 * @method setTimeoutForRead
 * @param {int} arg0
 */
setTimeoutForRead : function (
int 
)
{
},

/**
 * @method onSubThreadLoop
 */
onSubThreadLoop : function (
)
{
},

/**
 * @method setListener
 * @param {fr::ClientListener} arg0
 */
setListener : function (
clientlistener 
)
{
},

/**
 * @method setUseUDP
 * @param {bool} arg0
 */
setUseUDP : function (
bool 
)
{
},

/**
 * @method getTimeoutForRead
 * @return {int}
 */
getTimeoutForRead : function (
)
{
    return 0;
},

/**
 * @method isDoConnection
 * @return {bool}
 */
isDoConnection : function (
)
{
    return false;
},

/**
 * @method onSubThreadEnded
 */
onSubThreadEnded : function (
)
{
},

/**
 * @method onUIThreadReceiveMessage
 * @param {fr::sPackage} arg0
 */
onUIThreadReceiveMessage : function (
spackage 
)
{
},

/**
 * @method send
 * @param {fr::OutPacket} arg0
 */
send : function (
outpacket 
)
{
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method removeClient
 * @param {fr::GsnClient} arg0
 */
removeClient : function (
gsnclient 
)
{
},

/**
 * @method create
 * @return {fr::GsnClient}
 */
create : function (
)
{
    return fr::GsnClient;
},

/**
 * @method getInstance
 * @return {fr::GsnClient}
 */
getInstance : function (
)
{
    return fr::GsnClient;
},

/**
 * @method GsnClient
 * @constructor
 */
GsnClient : function (
)
{
},

};

/**
 * @class NativeService
 */
fr.NativeService = {

/**
 * @method getFolderUpdateAssets
 * @return {String}
 */
getFolderUpdateAssets : function (
)
{
    return ;
},

/**
 * @method logPortalPlayGame
 * @param {String} arg0
 */
logPortalPlayGame : function (
str 
)
{
},

/**
 * @method getPackageName
 * @return {String}
 */
getPackageName : function (
)
{
    return ;
},

/**
 * @method applicationDidFinishLaunching
 */
applicationDidFinishLaunching : function (
)
{
},

/**
 * @method logLoadSuccess
 * @param {bool} arg0
 */
logLoadSuccess : function (
bool 
)
{
},

/**
 * @method logImageLoadFail
 * @param {String} arg0
 */
logImageLoadFail : function (
str 
)
{
},

/**
 * @method getPlatformName
 * @return {String}
 */
getPlatformName : function (
)
{
    return ;
},

/**
 * @method logJSError
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @param {String} arg3
 */
logJSError : function (
str, 
str, 
str, 
str 
)
{
},

/**
 * @method logLoginFail
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @param {String} arg3
 */
logLoginFail : function (
str, 
str, 
str, 
str 
)
{
},

/**
 * @method getNativeVersion
 * @return {float}
 */
getNativeVersion : function (
)
{
    return 0;
},

/**
 * @method initGSNTracker
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @param {String} arg3
 */
initGSNTracker : function (
str, 
str, 
str, 
str 
)
{
},

/**
 * @method logLoadStart
 */
logLoadStart : function (
)
{
},

/**
 * @method endGame
 */
endGame : function (
)
{
},

/**
 * @method getConfig
 * @param {String} arg0
 * @return {String}
 */
getConfig : function (
str 
)
{
    return ;
},

/**
 * @method logBackToPortal
 */
logBackToPortal : function (
)
{
},

/**
 * @method getFolderUpdateAssetsById
 * @param {String} arg0
 * @return {String}
 */
getFolderUpdateAssetsById : function (
str 
)
{
    return ;
},

/**
 * @method logUpdateError
 * @param {String} arg0
 */
logUpdateError : function (
str 
)
{
},

};

/**
 * @class AsyncSprite
 */
fr.AsyncSprite = {

/**
 * @method updatePath
 * @param {String} arg0
 * @param {String} arg1
 */
updatePath : function (
str, 
str 
)
{
},

/**
 * @method create
* @param {size_object|function} size
* @param {function} func
* @return {fr::AsyncSprite|fr::AsyncSprite}
*/
create : function(
size,
func 
)
{
    return fr::AsyncSprite;
},

};

/**
 * @class HttpMultipart
 */
fr.HttpMultipart = {

/**
 * @method executeAsyncTask
 */
executeAsyncTask : function (
)
{
},

/**
 * @method addFilePart
 * @param {String} arg0
 * @param {String} arg1
 * @param {char} arg2
 * @param {unsigned long} arg3
 */
addFilePart : function (
str, 
str, 
char, 
long 
)
{
},

/**
 * @method addImage
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 */
addImage : function (
str, 
str, 
str 
)
{
},

/**
 * @method setCallback
 * @param {function} arg0
 */
setCallback : function (
func 
)
{
},

/**
 * @method addFormPart
 * @param {String} arg0
 * @param {String} arg1
 */
addFormPart : function (
str, 
str 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @param {function} arg1
 * @return {fr::HttpMultipart}
 */
create : function (
str, 
func 
)
{
    return fr::HttpMultipart;
},

/**
 * @method HttpMultipart
 * @constructor
 * @param {String} arg0
 * @param {function} arg1
 */
HttpMultipart : function (
str, 
func 
)
{
},

};

/**
 * @class NativePortal
 */
fr.NativePortal = {

/**
 * @method getSessionKey
 * @return {String}
 */
getSessionKey : function (
)
{
    return ;
},

/**
 * @method isJsRuntimePlayed
 * @return {bool}
 */
isJsRuntimePlayed : function (
)
{
    return false;
},

/**
 * @method playGame
 * @param {String} arg0
 * @param {int} arg1
 * @param {int} arg2
 */
playGame : function (
str, 
int, 
int 
)
{
},

/**
 * @method isShowInappShop
 * @return {bool}
 */
isShowInappShop : function (
)
{
    return false;
},

/**
 * @method saveState
 * @param {String} arg0
 */
saveState : function (
str 
)
{
},

/**
 * @method setSocialType
 * @param {String} arg0
 */
setSocialType : function (
str 
)
{
},

/**
 * @method getJsonStringGamesNeedDownload
 * @return {String}
 */
getJsonStringGamesNeedDownload : function (
)
{
    return ;
},

/**
 * @method setShowInappShop
 * @param {bool} arg0
 * @return {bool}
 */
setShowInappShop : function (
bool 
)
{
    return false;
},

/**
 * @method getGameHeight
 * @return {int}
 */
getGameHeight : function (
)
{
    return 0;
},

/**
 * @method updateEncryptKeyForCurrentGame
 */
updateEncryptKeyForCurrentGame : function (
)
{
},

/**
 * @method setSearchPaths
 * @param {String} arg0
 */
setSearchPaths : function (
str 
)
{
},

/**
 * @method deleteGame
 * @param {String} arg0
 * @param {function} arg1
 */
deleteGame : function (
str, 
func 
)
{
},

/**
 * @method setPortalSize
 * @param {int} arg0
 * @param {int} arg1
 */
setPortalSize : function (
int, 
int 
)
{
},

/**
 * @method setRestartVMfunc
 * @param {function} arg0
 */
setRestartVMfunc : function (
func 
)
{
},

/**
 * @method setPvrEncryptKeys
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 */
setPvrEncryptKeys : function (
int, 
int, 
int, 
int 
)
{
},

/**
 * @method isShowLocalShop
 * @return {bool}
 */
isShowLocalShop : function (
)
{
    return false;
},

/**
 * @method setShowLocalShop
 * @param {bool} arg0
 * @return {bool}
 */
setShowLocalShop : function (
bool 
)
{
    return false;
},

/**
 * @method clearGamesNeedDownload
 */
clearGamesNeedDownload : function (
)
{
},

/**
 * @method backToPortal
 */
backToPortal : function (
)
{
},

/**
 * @method setPortalEncryptKeys
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 */
setPortalEncryptKeys : function (
int, 
int, 
int, 
int 
)
{
},

/**
 * @method getState
 * @return {String}
 */
getState : function (
)
{
    return ;
},

/**
 * @method setTrackId
 * @param {String} arg0
 */
setTrackId : function (
str 
)
{
},

/**
 * @method setFinishDownloadGame
 * @param {String} arg0
 */
setFinishDownloadGame : function (
str 
)
{
},

/**
 * @method setJsRuntimePlayed
 * @param {bool} arg0
 */
setJsRuntimePlayed : function (
bool 
)
{
},

/**
 * @method addToQueueDownloadGame
 * @param {String} arg0
 * @param {String} arg1
 */
addToQueueDownloadGame : function (
str, 
str 
)
{
},

/**
 * @method setEncryptKeys
 * @param {int} arg0
 * @param {int} arg1
 * @param {int} arg2
 * @param {int} arg3
 */
setEncryptKeys : function (
int, 
int, 
int, 
int 
)
{
},

/**
 * @method getSocialType
 * @return {String}
 */
getSocialType : function (
)
{
    return ;
},

/**
 * @method restartVM
 */
restartVM : function (
)
{
},

/**
 * @method setSessionKey
 * @param {String} arg0
 */
setSessionKey : function (
str 
)
{
},

/**
 * @method getGameWidth
 * @return {int}
 */
getGameWidth : function (
)
{
    return 0;
},

/**
 * @method getGameId
 * @return {String}
 */
getGameId : function (
)
{
    return ;
},

/**
 * @method getTrackId
 * @return {String}
 */
getTrackId : function (
)
{
    return ;
},

/**
 * @method getInstance
 * @return {fr::NativePortal}
 */
getInstance : function (
)
{
    return fr::NativePortal;
},

};
