/**
 * Created by KienVN on 5/23/2015.
 */

var PoolObject = cc.Class.extend(
    {
        ctor:function()
        {
            this.poolObjects = {};
        },
       get:function(objClass,arg)
       {
           var obj = null;
           var pid = objClass.prototype.__pid;

           if (!pid) {
               var desc = { writable: true, enumerable: false, configurable: true };
               desc.value = ClassManager.getNewID();
               Object.defineProperty(objClass.prototype, '__pid', desc);
           }

           if(pid in this.poolObjects)
           {
               var listObjects = this.poolObjects[pid];
               if(listObjects.length > 0)
               {
                   obj = listObjects[0];
                   listObjects.splice(0,1);

                   if(obj.release != undefined)
                       obj.release();
               }
           }
           if(obj == null)
           {
               if(arg != null) {
                   obj = new objClass(arg);
               }
               else {
                   obj = new objClass();
               }
           }
           return obj;
       },
       push:function(obj)
       {
           var pid = obj.constructor.prototype.__pid;

           if (!pid) {
               var desc = { writable: true, enumerable: false, configurable: true };
               desc.value = ClassManager.getNewID();
               Object.defineProperty(obj.constructor.prototype, '__pid', desc);
           }

           if(obj.retain != undefined)
               obj.retain();

           if(pid in this.poolObjects)
           {
               this.poolObjects[pid].push(obj);
           }
           else
           {
               var list = new Array();
               list.push(obj);
               this.poolObjects[pid] = list;
           }
       }
    }
)