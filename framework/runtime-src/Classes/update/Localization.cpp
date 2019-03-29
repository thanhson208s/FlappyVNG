#include "Localization.h"
#include "cocos2d.h"
#include "external/json/document.h"
#include "2d/CCFontAtlasCache.h"

USING_NS_CC;
using namespace std;


//File
#define CONFIG_LOCALIZE_FILE "res/portal/localize/config.json"
#define FILE_LANGUAGE_PATH "res/portal/localize/%s.txt"
#define PATH_TEXTURE_FOR_LANG "%s/%s"
//Config Json
#define DEFAULT_LANGUAGE_CODE_KEY "defaultLanguageCode"
#define LIST_LANGUAGE_KEY "list"
#define CODE_KEY "code"
#define NAME_KEY "name"
#define FOLDER_KEY "folder"
//default
#define DEFAULT_DEVICE_LANGUAGE_CODE "mm"
#define SAVE_LANGUAGE_KEY "lang_save"

Localization* Localization::_localization = NULL;
Localization::Localization()
{
}

Localization::~Localization()
{
}

Localization* Localization::getInstance()
{
	if (!_localization)
	{
		_localization = new Localization();
		_localization->loadConfig();
	}
	return _localization;
}


void Localization::loadConfig()
{

	std::string fullPath = FileUtils::getInstance()->fullPathForFilename(CONFIG_LOCALIZE_FILE);
	std::string contentStr = FileUtils::getInstance()->getStringFromFile(fullPath.c_str());

	rapidjson::Document doc;
	doc.Parse<0>(contentStr.c_str());
	if (doc.HasParseError())
	{
		CCLOG("ERROR: Localization::loadConfig: ParseError %d\n", doc.GetParseError());
		return;
	}

	const rapidjson::Value& a = doc[LIST_LANGUAGE_KEY];
	for (size_t i = 0; i < a.Size(); i++)
	{
		LanguageData* data = new LanguageData();

		const rapidjson::Value& listCode = a[i][CODE_KEY];
		for (size_t j = 0; j < listCode.Size(); j++)
		{
			data->code.push_back(listCode[j].GetString());
		}

		data->name = a[i][NAME_KEY].GetString();
		data->folder = a[i][FOLDER_KEY].GetString();
		_listLanguages.push_back(data);
	}

	std::string defaultLangID = doc[DEFAULT_LANGUAGE_CODE_KEY].GetString();

	if (defaultLangID.empty())
	{
		defaultLangID = Application::getInstance()->getCurrentLanguageCode();
		bool isExistLang = false;
		for (unsigned int i = 0; i < _listLanguages.size(); i++)
		{
			LanguageData* data = _listLanguages.at(i);
			if (strcmp(data->name.c_str(), defaultLangID.c_str()) == 0)
			{
				isExistLang = true;
				break;
			}
		}
		if (!isExistLang)
		{
			defaultLangID = DEFAULT_DEVICE_LANGUAGE_CODE;
		}
	}
	setCurrentLanguage(defaultLangID.c_str());
}


void Localization::setCurrentLanguage(const char* code)
{
	for (unsigned int i = 0; i < _listLanguages.size(); i++)
	{
		LanguageData* data = _listLanguages.at(i);
		for (unsigned int j = 0; j < data->code.size(); j++)
		{
			if (strcmp(data->code.at(j).c_str(), code) == 0)
			{
				if (_currentLang != data)
				{
					_currentLang = data;
					loadTextForCurrentLanguage();
				}
				return;
			}
		}
		
	}
	log("ERROR: Localization::setCurrentLanguage: %s FALL!", code);
}

void Localization::loadTextForCurrentLanguage()
{

	localizedStrings.clear();

	std::string fullPath = getFullPathFileLang(_currentLang->folder.c_str());
	string line, contents;

	// Get data of file
	contents = FileUtils::getInstance()->getStringFromFile(fullPath);

	// Create a string stream so that we can use getline( ) on it
	istringstream fileStringStream(contents);

	// Get file contents line by line
	while (std::getline(fileStringStream, line))
	{
		if (line.find("/*", 0) == string::npos &&
			line.find("//", 0) == string::npos &&
			line.find("*/", 0) == string::npos) //filter the valid string of one line
		{
			std::string::size_type validPos = line.find('=', 0);
			if (validPos != string::npos)
			{
				std::string keyStr = line.substr(0, validPos - 1);
				// get valid string
				std::string subStr = line.substr(validPos + 1, line.size() - 1); 

				//trim space
				keyStr.erase(0, keyStr.find_first_not_of(" \t"));
				keyStr.erase(keyStr.find_last_not_of(" \t") + 1);

				subStr.erase(0, subStr.find_first_not_of(" \t"));
				subStr.erase(subStr.find_last_not_of(" \t") + 1);

				//trim \" 
				keyStr.erase(0, keyStr.find_first_not_of("\""));
				int findPosition = subStr.find('\"', 0);
				keyStr.erase(keyStr.find_last_not_of("\"") + 1);

				subStr.erase(0, subStr.find_first_not_of("\""));

				//trim ; character and last \" character
				subStr.erase(subStr.find_last_not_of(";") + 1);
				int position = subStr.find_last_not_of("\"") + 1;
				findPosition = subStr.find('\"', 0);
				if (findPosition != string::npos)
					subStr.erase(findPosition);

				//replace line feed with \n
				string::size_type pos(0);
				string old_value("\\n");
				if ((pos = subStr.find(old_value)) != string::npos)
				{
					for (; pos != string::npos; pos += 1)
					{
						if ((pos = subStr.find(old_value, pos)) != string::npos)
						{
							subStr.erase(pos, 2);
							subStr.insert(pos, 1, '\n');
						}
						else
							break;
					}
				}

				localizedStrings.insert(std::pair<std::string, std::string>(keyStr, subStr));
			}
		}
	}

}
std::string Localization::text(const char * mKey, const std::string& defaultText)
{
	std::map<std::string, std::string>::iterator itr = getInstance()->localizedStrings.find(std::string(mKey));
	if (itr != getInstance()->localizedStrings.end()) {
		return (itr->second).c_str();
	}
	if (!defaultText.empty())
	{
		return defaultText;
	}
	return mKey;
}

std::string Localization::getCurrentLanguageName()
{
	return _currentLang->name;
}

std::string Localization::getCurrentLanguageCode()
{
	return _currentLang->folder;
}

unsigned char Localization::getCountOfLanguages()
{
	return _listLanguages.size();
}
std::string Localization::getLanguageNameAt(int index)
{
	return _listLanguages.at(index)->name;
}
std::vector<std::string> Localization::getLanguageCodeAt(int index)
{
	return _listLanguages.at(index)->code;
}

std::string Localization::getFullPathFileLang(const char* code)
{
	char buff[100];
	sprintf(buff, FILE_LANGUAGE_PATH, code);
	return FileUtils::getInstance()->fullPathForFilename(buff);
}

	