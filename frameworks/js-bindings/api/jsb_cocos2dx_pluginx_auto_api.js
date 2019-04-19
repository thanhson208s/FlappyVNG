/**
 * @module pluginx_protocols
 */
var db = db || {};

/**
 * @class PluginProtocol
 */
db.PluginProtocol = {

/**
 * @method getPluginName
 * @return {char}
 */
getPluginName : function (
)
{
    return 0;
},

/**
 * @method getPluginVersion
 * @return {String}
 */
getPluginVersion : function (
)
{
    return ;
},

/**
 * @method getSDKVersion
 * @return {String}
 */
getSDKVersion : function (
)
{
    return ;
},

/**
 * @method setDebugMode
 * @param {bool} arg0
 */
setDebugMode : function (
bool 
)
{
},

};

/**
 * @class PluginManager
 */
db.PluginManager = {

/**
 * @method unloadPlugin
 * @param {char} arg0
 */
unloadPlugin : function (
char 
)
{
},

/**
 * @method loadPlugin
 * @param {char} arg0
 * @return {cc.plugin::PluginProtocol}
 */
loadPlugin : function (
char 
)
{
},

/**
 * @method end
 */
end : function (
)
{
},

/**
 * @method getInstance
 * @return {cc.plugin::PluginManager}
 */
getInstance : function (
)
{
},

};

/**
 * @class ProtocolAnalytics
 */
db.ProtocolAnalytics = {

/**
 * @method logTimedEventBegin
 * @param {char} arg0
 */
logTimedEventBegin : function (
char 
)
{
},

/**
 * @method logError
 * @param {char} arg0
 * @param {char} arg1
 */
logError : function (
char, 
char 
)
{
},

/**
 * @method setCaptureUncaughtException
 * @param {bool} arg0
 */
setCaptureUncaughtException : function (
bool 
)
{
},

/**
 * @method setSessionContinueMillis
 * @param {long} arg0
 */
setSessionContinueMillis : function (
long 
)
{
},

/**
 * @method logEvent
 * @param {char} arg0
 * @param {map_object} arg1
 */
logEvent : function (
char, 
map 
)
{
},

/**
 * @method startSession
 * @param {char} arg0
 */
startSession : function (
char 
)
{
},

/**
 * @method stopSession
 */
stopSession : function (
)
{
},

/**
 * @method logTimedEventEnd
 * @param {char} arg0
 */
logTimedEventEnd : function (
char 
)
{
},

};

/**
 * @class ProtocolIAP
 */
db.ProtocolIAP = {

/**
 * @method onPayResult
 * @param {cc.plugin::PayResultCode} arg0
 * @param {char} arg1
 */
onPayResult : function (
payresultcode, 
char 
)
{
},

/**
 * @method getCallback
 * @return {function}
 */
getCallback : function (
)
{
},

/**
 * @method configDeveloperInfo
 * @param {map_object} arg0
 */
configDeveloperInfo : function (
map 
)
{
},

};

/**
 * @class ProtocolAds
 */
db.ProtocolAds = {

/**
 * @method showAds
 * @param {map_object} arg0
 * @param {cc.plugin::ProtocolAds::AdsPos} arg1
 */
showAds : function (
map, 
adspos 
)
{
},

/**
 * @method hideAds
 * @param {map_object} arg0
 */
hideAds : function (
map 
)
{
},

/**
 * @method queryPoints
 */
queryPoints : function (
)
{
},

/**
 * @method getCallback
 * @return {function}
 */
getCallback : function (
)
{
},

/**
 * @method spendPoints
 * @param {int} arg0
 */
spendPoints : function (
int 
)
{
},

/**
 * @method configDeveloperInfo
 * @param {map_object} arg0
 */
configDeveloperInfo : function (
map 
)
{
},

};

/**
 * @class ProtocolShare
 */
db.ProtocolShare = {

/**
 * @method onShareResult
 * @param {cc.plugin::ShareResultCode} arg0
 * @param {char} arg1
 */
onShareResult : function (
shareresultcode, 
char 
)
{
},

/**
 * @method getCallback
 * @return {function}
 */
getCallback : function (
)
{
},

/**
 * @method configDeveloperInfo
 * @param {map_object} arg0
 */
configDeveloperInfo : function (
map 
)
{
},

};

/**
 * @class ProtocolSocial
 */
db.ProtocolSocial = {

/**
 * @method showLeaderboard
 * @param {char} arg0
 */
showLeaderboard : function (
char 
)
{
},

/**
 * @method showAchievements
 */
showAchievements : function (
)
{
},

/**
 * @method getCallback
 * @return {function}
 */
getCallback : function (
)
{
},

/**
 * @method configDeveloperInfo
 * @param {map_object} arg0
 */
configDeveloperInfo : function (
map 
)
{
},

};

/**
 * @class ProtocolUser
 */
db.ProtocolUser = {

/**
 * @method getCallback
 * @return {function}
 */
getCallback : function (
)
{
},

/**
 * @method configDeveloperInfo
 * @param {map_object} arg0
 */
configDeveloperInfo : function (
map 
)
{
},

/**
 * @method isLoggedIn
 * @return {bool}
 */
isLoggedIn : function (
)
{
    return false;
},

/**
 * @method getSessionID
 * @return {String}
 */
getSessionID : function (
)
{
    return ;
},

/**
 * @method getAccessToken
 * @return {String}
 */
getAccessToken : function (
)
{
    return ;
},

};

/**
 * @class AgentManager
 */
db.AgentManager = {

/**
 * @method getSocialPlugin
 * @return {cc.plugin::ProtocolSocial}
 */
getSocialPlugin : function (
)
{
},

/**
 * @method getAdsPlugin
 * @return {cc.plugin::ProtocolAds}
 */
getAdsPlugin : function (
)
{
},

/**
 * @method purge
 */
purge : function (
)
{
},

/**
 * @method getUserPlugin
 * @return {cc.plugin::ProtocolUser}
 */
getUserPlugin : function (
)
{
},

/**
 * @method getIAPPlugin
 * @return {cc.plugin::ProtocolIAP}
 */
getIAPPlugin : function (
)
{
},

/**
 * @method getSharePlugin
 * @return {cc.plugin::ProtocolShare}
 */
getSharePlugin : function (
)
{
},

/**
 * @method getAnalyticsPlugin
 * @return {cc.plugin::ProtocolAnalytics}
 */
getAnalyticsPlugin : function (
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
 * @method getInstance
 * @return {cc.plugin::AgentManager}
 */
getInstance : function (
)
{
},

};

/**
 * @class FacebookAgent
 */
db.FacebookAgent = {

/**
 * @method activateApp
 */
activateApp : function (
)
{
},

/**
 * @method getUserID
 * @return {String}
 */
getUserID : function (
)
{
    return ;
},

/**
 * @method logEvent
* @param {String|String|String|String} str
* @param {float|map_object|float} float
* @param {map_object} map
*/
logEvent : function(
str,
float,
map 
)
{
},

/**
 * @method logout
 */
logout : function (
)
{
},

/**
 * @method getSDKVersion
 * @return {String}
 */
getSDKVersion : function (
)
{
    return ;
},

/**
 * @method logPurchase
* @param {float|float} float
* @param {String|String} str
* @param {map_object} map
*/
logPurchase : function(
float,
str,
map 
)
{
},

/**
 * @method isLoggedIn
 * @return {bool}
 */
isLoggedIn : function (
)
{
    return false;
},

/**
 * @method canPresentDialogWithParams
 * @param {map_object} arg0
 * @return {bool}
 */
canPresentDialogWithParams : function (
map 
)
{
    return false;
},

/**
 * @method getAccessToken
 * @return {String}
 */
getAccessToken : function (
)
{
    return ;
},

/**
 * @method destroyInstance
 */
destroyInstance : function (
)
{
},

/**
 * @method getInstanceJs
 * @return {cc.plugin::FacebookAgent}
 */
getInstanceJs : function (
)
{
},

};
