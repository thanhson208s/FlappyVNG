/**
 * Created by HP on 7/16/2020.
 */


var FLAPPY_CONST = {
    V_0: 600,
    V_MAX: -1000,
    G: -2100,
    V_ANGLE_0: -720,
    G_ANGLE: 720,
    ANGLE_MAX: 90,
    ANGLE_MIN: -30
};

var PIPE_CONST = {
    GAP_DISTANCE: 150,
    SPEED: 165,
    DISTANCE: 195,
    WIDTH: 65
};

var BG_CONST = {
    SPEED: 10,
    GROUND_HEIGHT: 75/900,
    OVERLAP_WIDTH: 100/1464
};

var DEBUGGING = false;
var AUTO = false;
var TIME_SCALE = 1;
var COIN_RATE = 0.2;

var MEDAL_CONST = {
    THRESHOLDS: [["none", 0], ["bronze", 10], ["silver", 20], ["gold", 30], ["ruby", 40], ["diamond", 50]],
    STAR_RATES: {"none": 0, "bronze": 2, "silver": 1, "gold": 0.5, "ruby": 0.4, "diamond": 0.2}
};

var CODE = {
    AUTO: "AUTO",
    DEBUG: "DEBUG",
    MUTE: "MUTE",
    SFX: "SFX"
};

var CHALLENGE_THRESHOLD = 40;