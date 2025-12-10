import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-3 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-[#0e639c] hover:bg-[#1177bb]'
          : 'bg-[#007acc] hover:bg-[#005a9e]'
      }`}
      aria-label={t('switchToLight', language)}
      title={theme === 'dark' ? t('switchToLight', language) : t('switchToDark', language)}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

