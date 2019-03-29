#ifndef AssetUpdate_h__
#define AssetUpdate_h__

#include "cocos2d.h"
#include "extensions/cocos-ext.h"
#include "network/HttpRequest.h"

struct DownloadProccess{
	int process;
	int fileIndex;
};
class AssetUpdate:
	public cocos2d::Layer
{
public:
	AssetUpdate();
	void startUpdate();
protected:
	//
	virtual void onUpdateFinish();
	virtual void onUpdateError(const std::string& err, int errorCode){ this->finishUpdate(); isFinishUpdate = false; };
	virtual void onProcess(float currentFileProgress, int fileDownloaded, int totalToDownload){};

	cocos2d::extension::AssetsManagerEx* _am;
	cocos2d::extension::EventListenerAssetsManagerEx* _amListener;
	void updateTimeout();
	void exitGame();

	float curPercent;
	bool isFinishUpdate;
	DownloadProccess _currentProcess;
	DownloadProccess _nextProcess;
private:
	void finishUpdate();
	void resetDownloadProcess();
	cocos2d::Action* _actionTimeOut;
	int _updateRetry;
	cocos2d::network::HttpRequest *cRequest;
	
};
#endif // AssetUpdate_h__
