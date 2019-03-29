#ifndef ScreenUpdateAssets_h__
#define ScreenUpdateAssets_h__

#include "ui/CocosGUI.h"
#include "AssetUpdate.h"

#include "cocostudio/CocoStudio.h"

enum class LoadingState{
	CHECK_UPDATE = 1,
	UPDATING
};

class ScreenUpdateAssets:
	public AssetUpdate
{
	
public:
	ScreenUpdateAssets();
	~ScreenUpdateAssets();
	CREATE_FUNC(ScreenUpdateAssets);
	bool init();
	static void launchGame();
private:
	void initSplash();
	void showAssetsLoading();
	void start(float dt);
	void startGame(float dt = 0);

	void updateFinish();
	void onUpdateError(const std::string& err, int errCode);
	void onProcess(float downloadProgress, int fileDownloaded, int totalToDownload);

	void update(float delta);
	std::string getPlatform();
private:
	cocos2d::Node* _nodeAssetLoading;
	cocos2d::ui::Text* _textStatus;
	cocos2d::ui::Text* _loadingText;
	cocos2d::ui::LoadingBar* _loadingBar;
	std::string storeUrl;
	long long _timeStart;
	LoadingState _state;
};


#endif // ScreenUpdateAssets_h__
