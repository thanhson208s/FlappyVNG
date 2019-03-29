#include "PopupDialog.h"
#include "update/Localization.h"

USING_NS_CC;

USING_NS_CC_EXT;
using namespace cocos2d::ui;

#define LAYOUT_OPACITY 180
#define TIME_TRANSFORM 0.2f
PopupDialog::PopupDialog()
{
}

PopupDialog::~PopupDialog()
{
}

PopupDialog* PopupDialog::create()
{
	PopupDialog* popup = new PopupDialog();
	if (popup && popup->init())
	{
		popup->autorelease();
			return popup;
	}
	CC_SAFE_DELETE(popup);
	return NULL;
}
bool PopupDialog::init()
{
	Node::init();

	Size winSize = Director::getInstance()->getVisibleSize();

	Size drSize = Director::getInstance()->getOpenGLView()->getDesignResolutionSize();
	float minDimension = drSize.width < drSize.height ? drSize.width : drSize.height;
	float scaleFactor = Director::getInstance()->getContentScaleFactor();

	Layout* layout = Layout::create();
	layout->setBackGroundColorType(Layout::BackGroundColorType::SOLID);
	layout->setBackGroundColor(Color3B(0, 0, 0));
	layout->setOpacity(LAYOUT_OPACITY);
	layout->setContentSize(winSize);
	layout->setTouchEnabled(true);
	this->addChild(layout);
	this->_layout = layout;
	layout->addClickEventListener([this](Ref* sender)
	{
		if (_pressBackgroundCallback)
			_pressBackgroundCallback(this);
	});
	
	float bgW = winSize.width*0.8;
	float bgH = winSize.height*0.8;

	auto bg = Layout::create();
	layout->setBackGroundColorType(Layout::BackGroundColorType::SOLID);
	bg->setBackGroundColor(Color3B(225, 225, 225));
	bg->setOpacity(220);
	bg->setContentSize(cocos2d::Size(bgW, bgH));
	this->addChild(bg);
	bg->setPosition(Vec2(winSize.width / 2, winSize.height / 2));
	bg->setAnchorPoint(Vec2(0.5, 0.5));
	bg->setTouchEnabled(true);
	this->_bg = bg;
	
	//one button
	_oneButtonNode = Node::create();
	bg->addChild(_oneButtonNode);
	_oneButtonNode->setPosition(bgW / 2, bgH * 0.31f);
	//two buttons
	 _twoButtonNode = Node::create();
	 bg->addChild(_twoButtonNode);
	 _twoButtonNode->setPosition(bgW / 2, bgH * 0.31f);

	 _tileText = Text::create("Text", "Arial", 28 / scaleFactor);
	 _tileText->setColor(Color3B(115, 115, 115));
	 _tileText->setPosition(Vec2(bgW / 2, bgH * 0.82f));
	 bg->addChild(_tileText);

	initOneButton();
	initTwoButton();
	return true;
}
void PopupDialog::initOneButton()
{
	float scaleFactor = Director::getInstance()->getContentScaleFactor();
	_one_button = Button::create("");
	_one_button->setPressedActionEnabled(true);
	_one_button->setTitleFontName("Arial");
	_one_button->setTitleColor(Color3B(252, 252, 252));
	_one_button->setTitleFontSize(getFontButtonSize() / scaleFactor);
	_oneButtonNode->addChild(_one_button);
	_one_button->addClickEventListener([this](Ref* sender)
	{
		this->_buttonCallback(this);
	});
}

void PopupDialog::initTwoButton()
{
	float bgW = _bg->getContentSize().width;
	float bgH = _bg->getContentSize().height;

	float scaleFactor = Director::getInstance()->getContentScaleFactor();
	_two_leftButton = Button::create("");
	_two_leftButton->setPressedActionEnabled(true);
	_two_leftButton->setPosition(Vec2(bgW * -0.21f, 0));
	_two_leftButton->setTitleFontName("Arial");
	_two_leftButton->setTitleColor(Color3B(241, 90, 35));
	_two_leftButton->setTitleFontSize(getFontButtonSize() / scaleFactor);
	_twoButtonNode->addChild(_two_leftButton);

	_two_rightButton = Button::create("");
	_two_rightButton->setPressedActionEnabled(true);
	_two_rightButton->setPosition(Vec2(bgW * 0.21f, 0));
	_two_rightButton->setTitleFontName("Arial");
	_two_rightButton->setTitleColor(Color3B(252, 252, 252));
	_two_rightButton->setTitleFontSize(getFontButtonSize() / scaleFactor);
	_twoButtonNode->addChild(_two_rightButton);

	_two_leftButton->addClickEventListener([this](Ref* sender)
	{
		this->_leftButtonCallback(this);
	});
	_two_rightButton->addClickEventListener([this](Ref* sender)
	{
		this->_rightButtonCallback(this);
	});

}
int PopupDialog::getFontButtonSize()
{
	return 32;
}
void PopupDialog::showTwoButton(const std::string& title, 
	const std::string& leftButton, const std::string& rightButton,
	const PopupDialogEventListener& leftButtonCallback, const PopupDialogEventListener& rightButtonCallback)
{
	this->_leftButtonCallback = leftButtonCallback;
	this->_rightButtonCallback = rightButtonCallback;
	
	_twoButtonNode->setVisible(true);
	_oneButtonNode->setVisible(false);
	//display
	_tileText->setString(title);

	_two_leftButton->setTitleText(leftButton);
	_two_rightButton->setTitleText(rightButton);

	this->setVisible(true);
}

void PopupDialog::showOneButton(const std::string& title, const std::string& buttonLabel, const PopupDialogEventListener& buttonCallback)
{
	this->_buttonCallback = buttonCallback;

	_twoButtonNode->setVisible(false);
	_oneButtonNode->setVisible(true);
	//display
	_tileText->setString(title);
	_one_button->setTitleText(buttonLabel);

	this->setVisible(true);
}
void PopupDialog::showWithEffect(cocos2d::Vec2 position, cocos2d::Vec2 anchor)
{

	this->_bg->setPosition(position);
	this->_bg->setAnchorPoint(anchor);
	this->_bg->setOpacity(255);

	auto actionScaleTo = ScaleTo::create(TIME_TRANSFORM, 1, 1);
	auto actionScaleToInout = EaseBackOut::create(actionScaleTo);
	this->_bg->runAction(Sequence::create(actionScaleToInout, CallFunc::create(CC_CALLBACK_0(PopupDialog::callback1, this)), nullptr));

	this->_layout->setVisible(false);
}
void PopupDialog::hideWithEffect()
{
	auto actionScaleTo = ScaleTo::create(TIME_TRANSFORM, 0.1f, 0.1f);
	auto actionScaleToInout = EaseBackIn::create(actionScaleTo);
	this->_bg->runAction(Sequence::create(actionScaleToInout, CallFunc::create(CC_CALLBACK_0(PopupDialog::callback2, this)), nullptr));
	this->_bg->runAction(FadeOut::create(TIME_TRANSFORM));
}
void PopupDialog::callback1()
{
	this->_layout->setVisible(true);
}
void PopupDialog::callback2()
{
	this->removeFromParent();
}
cocos2d::Size PopupDialog::getDialogSize()
{
	return this->_bg->getContentSize();
}

void PopupDialog::setClickBackgroundListener(const PopupDialogEventListener& pressBackgroundCallback)
{
	_pressBackgroundCallback = pressBackgroundCallback;
}
