/**
 * Created by KienVN on 10/19/2015.
 */
var KEY_ENCRYPT = "gsn";
fr.UserData = {
    setObject:function(key, object)
    {
        cc.sys.localStorage.setItem(key, JSON.stringify(object));
    },
    getObject:function(key)
    {
        var val = cc.sys.localStorage.getItem(key);
        return JSON.parse(val);
    },
    getString: function (key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)|| _.isNaN(val))
            return defaultValue;
        else
            return val;
    },
    setString:function(key, value)
    {
        cc.sys.localStorage.setItem(key, value);
    },
    getNumber:function(key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)|| _.isNaN(val))
            return defaultValue;
        else
            return Number(val);
    },
    setNumber:function(key, value)
    {
        cc.sys.localStorage.setItem(key, value);
    },
    getBool:function(key, defaultValue)
    {
        var val = cc.sys.localStorage.getItem(key);
        if(_.isNull(val)||
            _.isNaN(val) ||
            _.isEmpty(val))
            return defaultValue;
        else
        {
            return val == 1;
        }

    },
    setBool:function(key, value)
    {
        var numVal = value ? 1 : 0;
        cc.sys.localStorage.setItem(key, numVal);
    }
};