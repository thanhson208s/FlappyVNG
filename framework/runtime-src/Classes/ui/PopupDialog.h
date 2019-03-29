#ifndef PopupDialog_h__
#define PopupDialog_h__

#include "cocos2d.h"
#include "extensions/cocos-ext.h"
#include "ui/CocosGUI.h"
#include "cocostudio/CocoStudio.h"

typedef std::function<void(cocos2d::Node* node)> PopupDialogEventListener;
class CButton;
class PopupDialog:
	public cocos2d::Node
{
public:
	static PopupDialog* create();
	PopupDialog();
	~PopupDialog();
	bool init();
	void showTwoButton(const std::string& title,
		const std::string& leftButton, const std::string& rightButton,
		const PopupDialogEventListener& leftButtonCallback, const PopupDialogEventListener& rightButtonCallback);
	void showOneButton(const std::string& title, const std::string& buttonLabel,
		const PopupDialogEventListener& buttonCallback);
	void showWithEffect(cocos2d::Vec2 position, cocos2d::Vec2 anchor);
	void hideWithEffect();
	void callback1();
	void callback2();
	cocos2d::Size getDialogSize();
	void setClickBackgroundListener(const PopupDialogEventListener& pressBackgroundCallback);
private:
	void initOneButton();
	void initTwoButton();
	int getFontButtonSize();
private:
	PopupDialogEventListener _leftButtonCallback;
	PopupDialogEventListener _rightButtonCallback;
	PopupDialogEventListener _buttonCallback;
	PopupDialogEventListener _pressBackgroundCallback;
	cocos2d::ui::Text* _tileText;
	cocos2d::Node* _oneButtonNode;
	cocos2d::Node* _twoButtonNode;
	cocos2d::ui::Button* _one_button;
	cocos2d::ui::Button* _two_leftButton;
	cocos2d::ui::Button* _two_rightButton;
	cocos2d::ui::Layout* _bg;
	cocos2d::ui::Layout* _layout;
	bool _touchWillHide;
};


#endif // PopupDialog_h__
