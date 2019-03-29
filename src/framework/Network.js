/**
 * Created by KienVN on 1/21/2016.
 */

fr.Network = {

    initXmlHttp: function(callbackFunc){
        var timeout = setTimeout(function()
        {
            if(callbackFunc != undefined)
            {
                callbackFunc(false, "Request time out!");
            }
        }, 15000);
        var callBack = function(result, data)
        {
            clearTimeout(timeout);
            if(callbackFunc != undefined)
            {
                callbackFunc(result, data);
            }
        };
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                callBack(true, xhr.responseText);
            }
            else{
                if(!cc.sys.isNative && (xhr.status == 200 || xhr.status == 0))
                {
                    return;
                }
                callBack(false, "error: " + xhr.readyState + "," + xhr.status);
            }
        };
        xhr.onerror = function(){
            cc.log("Request error!");
            callBack(false, "onerror");
        };
        xhr.ontimeout = function(){
            cc.log("Request time out!");
            callBack(false, "ontimeout");
        };
        xhr.onabort = function () {
            cc.log("Request aborted!");
            callBack(false, "ontimeout");
        };
        xhr.timeout = 10000;
        return xhr;
    },
    xmlHttpRequestGet: function(urlRequest, callbackFunc){
        var xhr = this.initXmlHttp(callbackFunc);
        xhr.open("GET", urlRequest, true);
        xhr.send();
    },
    xmlHttpPostForm: function(url, args, callbackFunc){
        var xhr = this.initXmlHttp(callbackFunc);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.open("POST", url);
        xhr.timeout = 5000;
        xhr.send(args);
    },
    requestJsonGet:function(urlRequest, callbackFunc)
    {
        this.xmlHttpRequestGet(urlRequest, function(result, response)
        {
            if(result)
            {
                var data = JSON.parse(response);
                if(data) {
                    callbackFunc(true, data);
                }else{
                    callbackFunc(false,"parse error: " + urlRequest + " : " + response);
                }
            }
            else
            {
                callbackFunc(false,response);
            }
        });
    }
};