/**
 * @module cocos2dx_effekseer
 */
var efk = efk || {};

/**
 * @class Effect
 */
efk.Effect = {

/**
 * @method create
 * @param {String} arg0
 * @return {efk.Effect}
 */
create : function (
str 
)
{
    return efk.Effect;
},

/**
 * @method Effect
 * @constructor
 */
Effect : function (
)
{
},

};

/**
 * @class EffectEmitter
 */
efk.EffectEmitter = {

/**
 * @method getInternalHandle
 * @return {int}
 */
getInternalHandle : function (
)
{
    return 0;
},

/**
 * @method setEffect
 * @param {efk.Effect} arg0
 */
setEffect : function (
effect 
)
{
},

/**
 * @method setTargetPosition
 * @param {vec3_object} arg0
 */
setTargetPosition : function (
vec3 
)
{
},

/**
 * @method setRemoveOnStop
 * @param {bool} arg0
 */
setRemoveOnStop : function (
bool 
)
{
},

/**
 * @method setColor
 * @param {color4b_object} arg0
 */
setColor : function (
color4b 
)
{
},

/**
 * @method isPlaying
 * @return {bool}
 */
isPlaying : function (
)
{
    return false;
},

/**
 * @method getRemoveOnStop
 * @return {bool}
 */
getRemoveOnStop : function (
)
{
    return false;
},

/**
 * @method stop
 */
stop : function (
)
{
},

/**
 * @method play
* @param {int} int
*/
play : function(
int 
)
{
},

/**
 * @method getIsLooping
 * @return {bool}
 */
getIsLooping : function (
)
{
    return false;
},

/**
 * @method setSpeed
 * @param {float} arg0
 */
setSpeed : function (
float 
)
{
},

/**
 * @method setIsLooping
 * @param {bool} arg0
 */
setIsLooping : function (
bool 
)
{
},

/**
 * @method getPlayOnEnter
 * @return {bool}
 */
getPlayOnEnter : function (
)
{
    return false;
},

/**
 * @method stopRoot
 */
stopRoot : function (
)
{
},

/**
 * @method setPlayOnEnter
 * @param {bool} arg0
 */
setPlayOnEnter : function (
bool 
)
{
},

/**
 * @method getEffect
 * @return {efk.Effect}
 */
getEffect : function (
)
{
    return efk.Effect;
},

/**
 * @method getSpeed
 * @return {float}
 */
getSpeed : function (
)
{
    return 0;
},

/**
 * @method create
* @param {efk.EffectManager|efk.EffectManager} effectmanager
* @param {String} str
* @return {efk.EffectEmitter|efk.EffectEmitter}
*/
create : function(
effectmanager,
str 
)
{
    return efk.EffectEmitter;
},

/**
 * @method EffectEmitter
 * @constructor
 * @param {efk.EffectManager} arg0
 */
EffectEmitter : function (
effectmanager 
)
{
},

};

/**
 * @class EffectManager
 */
efk.EffectManager = {

/**
 * @method begin
 * @param {cc.Renderer} arg0
 * @param {float} arg1
 */
begin : function (
renderer, 
float 
)
{
},

/**
 * @method setIsDistortionEnabled
 * @param {bool} arg0
 */
setIsDistortionEnabled : function (
bool 
)
{
},

/**
 * @method end
 * @param {cc.Renderer} arg0
 * @param {float} arg1
 */
end : function (
renderer, 
float 
)
{
},

/**
 * @method setCameraMatrix
 * @param {mat4_object} arg0
 */
setCameraMatrix : function (
mat4 
)
{
},

/**
 * @method update
 */
update : function (
)
{
},

/**
 * @method setProjectionMatrix
 * @param {mat4_object} arg0
 */
setProjectionMatrix : function (
mat4 
)
{
},

/**
 * @method create
 * @param {size_object} arg0
 * @return {efk.EffectManager}
 */
create : function (
size 
)
{
    return efk.EffectManager;
},

/**
 * @method EffectManager
 * @constructor
 */
EffectManager : function (
)
{
},

};
