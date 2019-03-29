#ifndef Localization_h__
#define Localization_h__

#include <map>
#include <string>
#include <vector>
class LanguageData
{
public:
	std::vector<std::string> code;
	std::string name;
	std::string folder;
};
class Localization
{
public:
	Localization();
	~Localization();
	static Localization* getInstance();
	static Localization* _localization;
	static std::string text(const char * mKey, const std::string& defaultText = "");
public:
	void loadTextureAtlas(const char* path);
	void unloadTextureAtlas(const char* path);
	void unloadAllTextureAtlas();
	void setCurrentLanguage(const char* code);
	std::string getCurrentLanguageName();
	std::string getCurrentLanguageCode();
	unsigned char getCountOfLanguages();
	std::string getLanguageNameAt(int index);
	std::vector<std::string> getLanguageCodeAt(int index);

private:
	void loadConfig();
	void loadTextForCurrentLanguage();
	std::string getFullPathFileLang(const char* code);
private:
	std::map<std::string, std::string> localizedStrings;
	std::vector<LanguageData*> _listLanguages;
	LanguageData* _currentLang;
};

#endif // Localization_h__
