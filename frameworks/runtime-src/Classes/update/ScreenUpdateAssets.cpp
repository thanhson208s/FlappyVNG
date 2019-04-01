#include "ScreenUpdateAssets.h"
#include "AppDelegate.h"
#if (CC_TARGET_PLATFORM != CC_PLATFORM_LINUX)
#include "ide-support/CodeIDESupport.h"
#endif
#if (COCOS2D_DEBUG > 0) && (CC_CODE_IDE_DEBUG_SUPPORT > 0)
#include "runtime/Runtime.h"
#include "ide-support/RuntimeJsImpl.h"
#else
	#include "js_module_register.h"
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
#include "plugin/protocols/include/PluginManager.h"
using namespace cocos2d::plugin;
#endif
#include "ui/PopupDialog.h"
#include "Localization.h"
#include "baseframework/BaseFramework.h"

USING_NS_CC;
USING_NS_CC_EXT;
using namespace cocos2d::ui;

static void scaleSpriteToFull(Node* node, Size size)
{
	Size contentSize = node->getContentSize();
	float scaleX = size.width / contentSize.width;
	float scaleY = size.height / contentSize.height;
	float scale = scaleX > scaleY ? scaleX : scaleY;
	node->setScale(scale);
}

ScreenUpdateAssets::ScreenUpdateAssets():
_nodeAssetLoading(NULL),
_loadingBar(NULL),
_textStatus(NULL)
{
}

ScreenUpdateAssets::~ScreenUpdateAssets()
{
}

bool ScreenUpdateAssets::init()
{
	Layer::init();
	cocos2d::Device::setKeepScreenOn(true);

	initSplash();
	return true;
}
void ScreenUpdateAssets::initSplash()
{
	_state  = LoadingState::CHECK_UPDATE;

	Size size = Director::getInstance()->getVisibleSize();
	_loadingText = Text::create("Loading...", "Arial", 32);
	_loadingText->setAnchorPoint(Vec2(1, 0));
	_loadingText->setPosition(Vec2(size.width - 20, 20));
	_loadingText->setTextColor(cocos2d::Color4B(255, 255, 255, 255));
	this->addChild(_loadingText);

	this->scheduleOnce(CC_SCHEDULE_SELECTOR(ScreenUpdateAssets::start), 0.8);
}
void ScreenUpdateAssets::showAssetsLoading()
{
	if (_state != LoadingState::UPDATING){
		_state = LoadingState::UPDATING;
		//load 
		_loadingText->setVisible(false);
		_nodeAssetLoading = CCNode::create();
		if (_nodeAssetLoading){
			this->addChild(_nodeAssetLoading);
			Size size = Director::getInstance()->getVisibleSize();
			_nodeAssetLoading->setContentSize(size);

			_textStatus = Text::create("", "Arial", 32);
			if (_textStatus)
			{
				_textStatus->setString("");
			}
			_textStatus->setPosition(Vec2(size.width / 2, 250.0f));
			_nodeAssetLoading->addChild(_textStatus);
		}
	}

}

void ScreenUpdateAssets::start(float dt)
{
	startUpdate();
	
	this->scheduleUpdate();
	_timeStart = utils::getTimeInMilliseconds();
}

void ScreenUpdateAssets::launchGame()
{
#if (COCOS2D_DEBUG > 0) && (CC_CODE_IDE_DEBUG_SUPPORT > 0)
#else
	js_module_register();
	ScriptingCore* sc = ScriptingCore::getInstance();
	sc->start();
	sc->runScript("script/jsb_boot.js");
#if defined(COCOS2D_DEBUG) && (COCOS2D_DEBUG > 0)
	sc->enableDebugger();
#endif
	ScriptEngineProtocol *engine = ScriptingCore::getInstance();
	ScriptEngineManager::getInstance()->setScriptEngine(engine);
	ScriptingCore::getInstance()->runScript("main.js");
#endif
}
void ScreenUpdateAssets::startGame(float dt)
{
	ScreenUpdateAssets::launchGame();
}
void ScreenUpdateAssets::updateFinish()
{
	this->isFinishUpdate = false;
	if (_loadingBar)
		this->_loadingBar->setVisible(false);
	this->scheduleOnce(CC_SCHEDULE_SELECTOR(ScreenUpdateAssets::startGame), 0.0f);
}
void ScreenUpdateAssets::onUpdateError(const std::string& err, int errCode)
{
	AssetUpdate::onUpdateError(err, errCode);

	auto dialog = PopupDialog::create();
	
	if (dialog){
		std::string msg = StringUtils::format("err: 10%d", errCode);
		Size winSize = Director::getInstance()->getVisibleSize();
		Text* errText = Text::create(msg, "Arial", 20);
		errText->setAnchorPoint(Vec2(1, 0));
		errText->setPosition(Vec2(winSize.width - 10, 10));
		dialog->addChild(errText);

		addChild(dialog);
		dialog->showTwoButton(err, Localization::text("lang_btn_try_again"),
			Localization::text("lang_btn_continue"),
			[this](cocos2d::Node* sender){
			startUpdate();
			sender->removeFromParent();
		},
			[this](cocos2d::Node* sender){
			startGame();
		});
	}
	else
	{
		this->startGame();
	}
}
void ScreenUpdateAssets::update(float delta)
{
	if (this->_currentProcess.process >= 100)
	{
		this->curPercent += delta * 150;
	}
	else
	{
		this->curPercent += delta * 80;
	}

	if (this->curPercent >= this->_currentProcess.process) {
		this->curPercent = this->_currentProcess.process;
		if (this->isFinishUpdate)
		{
			this->updateFinish();
		}
	}
	if (this->curPercent == 100)
	{
		if (this->_currentProcess.fileIndex != this->_nextProcess.fileIndex || this->_nextProcess.process < 100){
			this->_currentProcess.process = this->_nextProcess.process;
			this->_currentProcess.fileIndex = this->_nextProcess.fileIndex;
			this->curPercent = 0;
		}
	}
	if (_loadingBar)
		this->_loadingBar->setPercent(this->curPercent);
}

std::string ScreenUpdateAssets::getPlatform()
{
	std::string platform = "other";
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	{
		platform = "ios";
	}
#elif( CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
	{
		platform = "android";
	}
#elif(CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
	{
		platform = "win32";
	}
#endif
	return platform;
}

void ScreenUpdateAssets::onProcess(float downloadProgress, int fileDownloaded, int totalToDownload)
{
	this->showAssetsLoading();
	char buff[100];
	int n = sprintf(buff, "%d/%d", fileDownloaded, totalToDownload);
	std::string textStatus = std::string(buff, n);
	if (_textStatus)
		_textStatus->setString(textStatus);
}
