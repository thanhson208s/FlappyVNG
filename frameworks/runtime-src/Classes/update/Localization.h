#ifndef Localization_h__
#define Localization_h__

#include <map>
#include <string>

class Localization
{
public:
	Localization();
	~Localization();
	static Localization* getInstance();
	static Localization* _localization;
	static std::string text(const char * mKey, const std::string& defaultText = "");
private:
	void loadText();
private:
	std::map<std::string, std::string> localizedStrings;
};

#endif // Localization_h__
