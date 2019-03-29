#include "AssetUpdate.h"
#include "baseframework/BaseFramework.h"
#include "Localization.h"
#include "network/HttpClient.h"
#include "json/document.h"
USING_NS_CC_EXT;
USING_NS_CC;
using namespace network;
const char* manifestFile = "project.manifest";
const int TIME_OUT = 3;

const int ERROR_NO_LOCAL_MANIFEST = 20;
const int ERROR_DOWLOAD_VERSION_MANIFEST_TIMEOUT = 21;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
	#include "plugin/protocols/include/PluginManager.h"
	using namespace cocos2d::plugin;
#endif
#include "baseframework/framework/FrameworkDelegate.h"
AssetUpdate::AssetUpdate() :_actionTimeOut(NULL)
{
	resetDownloadProcess();
    _am = NULL;
	_updateRetry = 0;
}
void AssetUpdate::resetDownloadProcess()
{
	curPercent = 0;
	_currentProcess.fileIndex = 0;
	_currentProcess.process = 0;
	_nextProcess.fileIndex = 0;
	_nextProcess.process = 0;

	isFinishUpdate = false;
}
void AssetUpdate::startUpdate()
{
	resetDownloadProcess();
	//Uu tien tai tu storagePath
	std::string storagePath = fr::NativeService::getFolderUpdateAssets();

	_am = AssetsManagerEx::create(manifestFile, storagePath);
	_am->retain();
	//timeout
	if (_actionTimeOut)
	{
		this->stopAction(_actionTimeOut);
	}
	_actionTimeOut = Sequence::create(DelayTime::create(TIME_OUT),
		CallFunc::create([this](){
				_actionTimeOut = NULL;
				this->_updateRetry++;
                if(_am){
                    _am->release();
                    _am = NULL;
                }
				if (this->_updateRetry >= 2){
					onUpdateError(Localization::text("lang_update_failed"), ERROR_DOWLOAD_VERSION_MANIFEST_TIMEOUT);
				}
				else
				{
					this->startUpdate();
				}
		}), nullptr
	);
	this->runAction(_actionTimeOut);
	//local manifest is loaded?
	if (!_am->getLocalManifest()->isLoaded())
	{
		if (_actionTimeOut)
		{
			this->stopAction(_actionTimeOut);
			_actionTimeOut = NULL;
		}
		cocos2d::log("Fail to update assets, step skipped.");
		onUpdateError(Localization::text("lang_local_manifest_file_found"), ERROR_NO_LOCAL_MANIFEST);
	}
	else
	{
		std::string version = _am->getLocalManifest()->getVersion();
		fr::FrameworkDelegate::getInstance()->setJSVersion(version);

		_amListener = cocos2d::extension::EventListenerAssetsManagerEx::create(_am, [this](EventAssetsManagerEx* event){
			if (_actionTimeOut)
			{
				this->stopAction(_actionTimeOut);
				_actionTimeOut = NULL;
			}
			static int failCount = 0;
			switch (event->getEventCode())
			{
			case EventAssetsManagerEx::EventCode::ERROR_NO_LOCAL_MANIFEST:
			{
				cocos2d::log("No local manifest file found, skip assets update.");
				onUpdateError(Localization::text("lang_local_manifest_file_found"), (int)event->getEventCode());
			}
			break;
			case EventAssetsManagerEx::EventCode::UPDATE_PROGRESSION:
			{
				std::string assetId = event->getAssetId();
				if (assetId == AssetsManagerEx::VERSION_ID)
				{

				}
				else if (assetId == AssetsManagerEx::MANIFEST_ID)
				{

				}
				else
				{
					float downloadFileProgress = event->getPercent();
					int fileDownloaded = event->getCountOfFileDownloaded();

					if (_currentProcess.fileIndex != fileDownloaded)
					{
						if (_currentProcess.fileIndex == 0)
						{
							_currentProcess.fileIndex = fileDownloaded;
							if (downloadFileProgress > _currentProcess.process)
							{
								_currentProcess.process = downloadFileProgress;

							}
						}
						else
						{
							_currentProcess.process = 100;
						}

					}
					else
					{
						if (downloadFileProgress > _currentProcess.process)
						{
							_currentProcess.process = downloadFileProgress;

						}
					}
					_nextProcess.fileIndex = fileDownloaded;
					_nextProcess.process = downloadFileProgress;

					onProcess(downloadFileProgress, fileDownloaded, _am->getTotalToDownload());
				}
			}
			break;
			case EventAssetsManagerEx::EventCode::ERROR_DOWNLOAD_MANIFEST:
			{
				onUpdateError(Localization::text("lang_error_download_manifest"), (int)event->getEventCode());
			}
			break;
			case EventAssetsManagerEx::EventCode::ERROR_PARSE_MANIFEST:
			{
				
				onUpdateError(Localization::text("lang_error_parse_manifest"), (int)event->getEventCode());
			}
			break;
			case EventAssetsManagerEx::EventCode::ALREADY_UP_TO_DATE:
			{
				cocos2d::log("Already up to date");
				_currentProcess.process = 0;
				_nextProcess.process = 0;
				this->onUpdateFinish();
			}
			break;
			case EventAssetsManagerEx::EventCode::UPDATE_FINISHED:
			{
				cocos2d::log("Update finished. %s", event->getMessage().c_str());
				_currentProcess.process = 100;
				_nextProcess.process = 100;

				this->onUpdateFinish();
			}
			break;
			case EventAssetsManagerEx::EventCode::UPDATE_FAILED:
			{
				cocos2d::log("Update failed. %s", event->getMessage().c_str());

				failCount++;
				if (failCount < 5)
				{
					_am->downloadFailedAssets();
				}
				else
				{
					cocos2d::log("Reach maximum fail count, exit update process");
					failCount = 0;
					onUpdateError(Localization::text("lang_update_failed"), (int)event->getEventCode());
				}
			}
			break;
			case EventAssetsManagerEx::EventCode::ERROR_UPDATING:
			{
				cocos2d::log("Asset %s : %s", event->getAssetId().c_str(), event->getMessage().c_str());
			}
			break;
			case EventAssetsManagerEx::EventCode::ERROR_DECOMPRESS:
			{
				cocos2d::log("%s", event->getMessage().c_str());
			}
			break;
			case EventAssetsManagerEx::EventCode::ERROR_LOST_CONNECTION:
			{
				cocos2d::log("Update failed. %s", event->getMessage().c_str());
				failCount = 0;
				onUpdateError(Localization::text("lang_update_failed"), (int)event->getEventCode());
			}
			break;
			default:
				break;
			}
		});
		Director::getInstance()->getEventDispatcher()->addEventListenerWithFixedPriority(_amListener, 1);

		_am->update();
	}
}


void AssetUpdate::finishUpdate()
{
	isFinishUpdate = true;
	_eventDispatcher->removeEventListener(_amListener);
    if(_am){
        _am->release();
        _am = NULL;
    }
}

void AssetUpdate::exitGame()
{
	cocos2d::Director::getInstance()->end();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}
void AssetUpdate::onUpdateFinish()
{ 
	if (_am){
		std::string version = _am->getLocalManifest()->getVersion();
		fr::FrameworkDelegate::getInstance()->setJSVersion(version);
	}

	this->finishUpdate(); 
}