/**
 * Created by GSN on 6/10/2015.
 */

fr.createAnimationById = function(key, object) {
    return fr.createAnimation(resAni[key],key, object);
};

fr.createAnimation = function(folderPath, key, object)
{
    fr.loadAnimationData(folderPath, key, object);
    return db.DBCCFactory.getInstance().buildArmatureNode(key);
};
fr.loadAnimationData = function(folderPath, key, object)
{
    if(object != undefined && object != null)
    {
        if(object.listAnimationLoaded == undefined)
        {
            object.listAnimationLoaded = {};
        }
        if(key in object.listAnimationLoaded)
            return;
        object.listAnimationLoaded[key] = key;
    }
    db.DBCCFactory.getInstance().loadDragonBonesData(folderPath + "/skeleton.xml", key);
    db.DBCCFactory.getInstance().loadTextureAtlas(folderPath + "/texture.plist", key);
};
fr.unloadAllAnimationData = function(object)
{
    if(object.listAnimationLoaded == undefined)
    {
        return;
    }

    for(var keyStored in object.listAnimationLoaded)
    {
        db.DBCCFactory.getInstance().removeTextureAtlas(keyStored,false);
    }
    object.listAnimationLoaded = {};
};
fr.preloadAllAnimation = function(object)
{
    for(var key in resAni)
    {
        fr.loadAnimationData(resAni[key], key, object);
    }
};