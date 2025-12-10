import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all ${
          theme === 'dark'
            ? 'bg-[#2d2d30] hover:bg-[#3e3e42] text-[#cccccc]'
            : 'bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#333333]'
        }`}
        aria-label="언어 선택"
      >
        <Globe className="w-5 h-5" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 rounded-lg shadow-xl overflow-hidden min-w-[180px] ${
          theme === 'dark' ? 'bg-[#2d2d30]' : 'bg-[#ffffff]'
        }`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                language === lang.code
                  ? theme === 'dark'
                    ? 'bg-[#0e639c] text-white'
                    : 'bg-[#007acc] text-white'
                  : theme === 'dark'
                    ? 'text-[#cccccc] hover:bg-[#3e3e42]'
                    : 'text-[#333333] hover:bg-[#f3f3f3]'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="ml-auto">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

