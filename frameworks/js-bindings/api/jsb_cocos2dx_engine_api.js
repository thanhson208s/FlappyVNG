/**
 * @module cocos2dx_engine
 */
var engine = engine || {};

/**
 * @class AsyncDownloader
 */
engine.AsyncDownloader = {

/**
 * @method startDownload
 */
startDownload : function (
)
{
},

/**
 * @method initDownload
 * @param {String} arg0
 * @param {String} arg1
 * @param {function} arg2
 */
initDownload : function (
str, 
str, 
func 
)
{
},

/**
 * @method progressDownloaded
 */
progressDownloaded : function (
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
 * @method httpCallback
 * @param {cc.network::HttpClient} arg0
 * @param {cc.network::HttpResponse} arg1
 */
httpCallback : function (
httpclient, 
httpresponse 
)
{
},

/**
 * @method create
 * @param {String} arg0
 * @param {String} arg1
 * @param {function} arg2
 * @return {AsyncDownloader}
 */
create : function (
str, 
str, 
func 
)
{
    return AsyncDownloader;
},

/**
 * @method AsyncDownloader
 * @constructor
 */
AsyncDownloader : function (
)
{
},

};

/**
 * @class HttpMultipart
 */
engine.HttpMultipart = {

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
 * @return {HttpMultipart}
 */
create : function (
str, 
func 
)
{
    return HttpMultipart;
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
 * @class UIAvatar
 */
engine.UIAvatar = {

/**
 * @method setTexture
 * @param {cc.Texture2D} arg0
 */
setTexture : function (
texture2d 
)
{
},

/**
 * @method callbackDownload
 * @param {int} arg0
 * @param {String} arg1
 */
callbackDownload : function (
int, 
str 
)
{
},

/**
 * @method setImage
 * @param {String} arg0
 */
setImage : function (
str 
)
{
},

/**
 * @method setDefaultImage
 */
setDefaultImage : function (
)
{
},

/**
 * @method asyncExecuteWithUrl
 * @param {String} arg0
 * @param {String} arg1
 */
asyncExecuteWithUrl : function (
str, 
str 
)
{
},

/**
 * @method setOpacity
 * @param {unsigned char} arg0
 */
setOpacity : function (
char 
)
{
},

/**
 * @method getImageSize
 * @return {size_object}
 */
getImageSize : function (
)
{
    return cc.Size;
},

/**
 * @method asyncExecute
 */
asyncExecute : function (
)
{
},

/**
 * @method createScreenshot
 * @param {String} arg0
 * @param {String} arg1
 * @return {String}
 */
createScreenshot : function (
str, 
str 
)
{
    return ;
},

/**
 * @method create
* @param {String|String} str
* @param {String} str
* @param {String} str
* @return {UIAvatar|UIAvatar}
*/
create : function(
str,
str,
str 
)
{
    return UIAvatar;
},

/**
 * @method createWithMask
 * @param {String} arg0
 * @param {String} arg1
 * @param {String} arg2
 * @return {UIAvatar}
 */
createWithMask : function (
str, 
str, 
str 
)
{
    return UIAvatar;
},

/**
 * @method UIAvatar
 * @constructor
 */
UIAvatar : function (
)
{
},

};

/**
 * @class CircleMove
 */
engine.CircleMove = {

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @return {CircleMove}
 */
create : function (
float, 
float 
)
{
    return CircleMove;
},

};

/**
 * @class TimeProgressEffect
 */
engine.TimeProgressEffect = {

/**
 * @method setNen
 * @param {cc.Sprite} arg0
 */
setNen : function (
sprite 
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method create
 * @param {cc.ProgressTimer} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {TimeProgressEffect}
 */
create : function (
progresstimer, 
float, 
float 
)
{
    return TimeProgressEffect;
},

/**
 * @method TimeProgressEffect
 * @constructor
 */
TimeProgressEffect : function (
)
{
},

};

/**
 * @class MoveCircle
 */
engine.MoveCircle = {

/**
 * @method startWithTarget
 * @param {cc.Node} arg0
 */
startWithTarget : function (
node 
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method create
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @param {float} arg3
 * @return {MoveCircle}
 */
create : function (
float, 
float, 
float, 
float 
)
{
    return MoveCircle;
},

};

/**
 * @class CCShake
 */
engine.CCShake = {

/**
 * @method startWithTarget
 * @param {cc.Node} arg0
 */
startWithTarget : function (
node 
)
{
},

/**
 * @method stop
 */
stop : function (
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method initWithDuration
 * @param {float} arg0
 * @param {float} arg1
 * @param {float} arg2
 * @return {bool}
 */
initWithDuration : function (
float, 
float, 
float 
)
{
    return false;
},

/**
 * @method actionWithDuration
* @param {float|float} float
* @param {float|float} float
* @param {float} float
* @return {CCShake|CCShake}
*/
actionWithDuration : function(
float,
float,
float 
)
{
    return CCShake;
},

/**
 * @method CCShake
 * @constructor
 */
CCShake : function (
)
{
},

};

/**
 * @class sPackage
 */
engine.sPackage = {

/**
 * @method clean
 */
clean : function (
)
{
},

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
engine.InPacket = {

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
 * @method getString
 * @return {String}
 */
getString : function (
)
{
    return ;
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
 * @param {sPackage} arg0
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
 * @method clean
 */
clean : function (
)
{
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
engine.OutPacket = {

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
 * @return {OutPacket}
 */
putInt : function (
int 
)
{
    return OutPacket;
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
 * @return {OutPacket}
 */
putUnsignedShort : function (
short 
)
{
    return OutPacket;
},

/**
 * @method putShort
 * @param {int} arg0
 * @return {OutPacket}
 */
putShort : function (
int 
)
{
    return OutPacket;
},

/**
 * @method putString
 * @param {String} arg0
 * @return {OutPacket}
 */
putString : function (
str 
)
{
    return OutPacket;
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
 * @method putBytes
 * @param {char} arg0
 * @param {int} arg1
 * @return {OutPacket}
 */
putBytes : function (
char, 
int 
)
{
    return OutPacket;
},

/**
 * @method putLong
 * @param {double} arg0
 * @return {OutPacket}
 */
putLong : function (
double 
)
{
    return OutPacket;
},

/**
 * @method clean
 */
clean : function (
)
{
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
 * @return {OutPacket}
 */
putByteArray : function (
char, 
int 
)
{
    return OutPacket;
},

/**
 * @method putByte
 * @param {int} arg0
 * @return {OutPacket}
 */
putByte : function (
int 
)
{
    return OutPacket;
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
engine.GsnClient = {

/**
 * @method onSubThreadStarted
 */
onSubThreadStarted : function (
)
{
},

/**
 * @method onSubThreadEnded
 */
onSubThreadEnded : function (
)
{
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
 * @method isDoConnection
 * @return {bool}
 */
isDoConnection : function (
)
{
    return false;
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
 * @method onSubThreadLoop
 * @return {bool}
 */
onSubThreadLoop : function (
)
{
    return false;
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
 * @method setFinishConnectListener
 * @param {function} arg0
 */
setFinishConnectListener : function (
func 
)
{
},

/**
 * @method onUIThreadReceiveMessage
 * @param {sPackage} arg0
 */
onUIThreadReceiveMessage : function (
spackage 
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
 * @method setListener
 * @param {ClientListener} arg0
 */
setListener : function (
clientlistener 
)
{
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
 * @method send
 * @param {OutPacket} arg0
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
 * @param {GsnClient} arg0
 */
removeClient : function (
gsnclient 
)
{
},

/**
 * @method create
 * @return {GsnClient}
 */
create : function (
)
{
    return GsnClient;
},

/**
 * @method getInstance
 * @return {GsnClient}
 */
getInstance : function (
)
{
    return GsnClient;
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
 * @class Handler
 */
engine.Handler = {

/**
 * @method setTimeOut
 * @param {double} arg0
 * @param {bool} arg1
 */
setTimeOut : function (
double, 
bool 
)
{
},

/**
 * @method setID
 * @param {String} arg0
 */
setID : function (
str 
)
{
},

/**
 * @method set
 * @param {function} arg0
 */
set : function (
func 
)
{
},

/**
 * @method stop
 * @param {String} arg0
 */
stop : function (
str 
)
{
},

/**
 * @method Handler
 * @constructor
* @param {String} str
*/
Handler : function(
str 
)
{
},

};

/**
 * @class HandlerManager
 */
engine.HandlerManager = {

/**
 * @method addHandler
* @param {String|Handler} str
* @param {function} func
*/
addHandler : function(
str,
func 
)
{
},

/**
 * @method update
 * @param {float} arg0
 */
update : function (
float 
)
{
},

/**
 * @method forceRemoveHandler
 * @param {String} arg0
 */
forceRemoveHandler : function (
str 
)
{
},

/**
 * @method stopHandler
 * @param {String} arg0
 * @param {String} arg1
 */
stopHandler : function (
str, 
str 
)
{
},

/**
 * @method exitIOS
 */
exitIOS : function (
)
{
},

/**
 * @method getHandler
 * @param {String} arg0
 * @return {Handler}
 */
getHandler : function (
str 
)
{
    return Handler;
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstance
 * @return {HandlerManager}
 */
getInstance : function (
)
{
    return HandlerManager;
},

/**
 * @method HandlerManager
 * @constructor
 */
HandlerManager : function (
)
{
},

};
