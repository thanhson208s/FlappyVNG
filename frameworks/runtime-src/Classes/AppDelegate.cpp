#include "AppDelegate.h"
#include "SimpleAudioEngine.h"

#if (CC_TARGET_PLATFORM != CC_PLATFORM_LINUX)
#include "ide-support/CodeIDESupport.h"
#endif

#if (COCOS2D_DEBUG > 0) && (CC_CODE_IDE_DEBUG_SUPPORT > 0)
#include "runtime/Runtime.h"
#include "ide-support/RuntimeJsImpl.h"
#endif
#include "baseframework/BaseFramework.h"
#include "update/ScreenUpdateAssets.h"
USING_NS_CC;
using namespace CocosDenshion;

AppDelegate::AppDelegate()
{
	FileUtils::setEncryptKeyPart(0, 0x99999999);
	FileUtils::setEncryptKeyPart(1, 0x99999999);
	FileUtils::setEncryptKeyPart(2, 0x99999999);
	FileUtils::setEncryptKeyPart(3, 0x99999999);
}

AppDelegate::~AppDelegate()
{
	SimpleAudioEngine::end();
    ScriptEngineManager::destroyInstance();
    
#if (COCOS2D_DEBUG > 0) && (CC_CODE_IDE_DEBUG_SUPPORT > 0)
    // NOTE:Please don't remove this call if you want to debug with Cocos Code IDE
    RuntimeEngine::getInstance()->end();
#endif
}

//if you want a different context,just modify the value of glContextAttrs
//it will takes effect on all platforms
void AppDelegate::initGLContextAttrs()
{
    //set OpenGL context attributions,now can only set six attributions:
    //red,green,blue,alpha,depth,stencil
    GLContextAttrs glContextAttrs = {8, 8, 8, 8, 24, 8};

    GLView::setGLContextAttrs(glContextAttrs);
}

bool AppDelegate::applicationDidFinishLaunching()
{
	fr::FrameworkDelegate::getInstance()->applicationDidFinishLaunching();
	fr::FrameworkDelegate::getInstance()->setFolderAssets("demo");
    // initialize director
    auto director = Director::getInstance();

    // set FPS. the default value is 1.0/60 if you don't call this
    director->setAnimationInterval(1.0 / 60);
	director->getOpenGLView()->setDesignResolutionSize(1136, 640, ResolutionPolicy::FIXED_HEIGHT);
#if (COCOS2D_DEBUG > 0) && (CC_CODE_IDE_DEBUG_SUPPORT > 0)

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    // for getIPAddress
    extern void setFrameworkActivityPathForAndroid(const std::string &path);
    setFrameworkActivityPathForAndroid("com/gsn/baseframework/FrameworkActivity");
#endif

    auto runtimeEngine = RuntimeEngine::getInstance();
    auto jsRuntime = RuntimeJsImpl::create();
    runtimeEngine->addRuntime(jsRuntime, kRuntimeEngineJs);
    runtimeEngine->start();
    
    // js need special debug port
    if (runtimeEngine->getProjectConfig().getDebuggerType() != kCCRuntimeDebuggerNone)
    {
        jsRuntime->startWithDebugger();
    }
#else
    auto scene = Scene::create();
	ScreenUpdateAssets* layer = ScreenUpdateAssets::create();
	scene->addChild(layer);
	director->runWithScene(scene);
#endif

    return true;
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    auto director = Director::getInstance();
    director->stopAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_hide");
    SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    SimpleAudioEngine::getInstance()->pauseAllEffects();    
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
    auto director = Director::getInstance();
    director->startAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_show");
    SimpleAudioEngine::getInstance()->resumeBackgroundMusic();
    SimpleAudioEngine::getInstance()->resumeAllEffects();
}

