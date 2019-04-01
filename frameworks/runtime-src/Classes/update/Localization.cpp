#include "Localization.h"
#include "cocos2d.h"
#include "external/json/document.h"
#include "2d/CCFontAtlasCache.h"

USING_NS_CC;
using namespace std;

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
		_localization->loadText();
	}
	return _localization;
}


void Localization::loadText()
{

	localizedStrings.clear();

	string line, contents;

	// Get data of file
	contents = FileUtils::getInstance()->getStringFromFile("res/localize/vi");

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

	