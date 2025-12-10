import { Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function Header() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <header className="text-center py-12 px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Shield className={`w-10 h-10 ${theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#007acc]'}`} strokeWidth={2} />
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'}`}>
          {t('title', language)}
        </h1>
      </div>
      <p className={`text-lg ${theme === 'dark' ? 'text-[#858585]' : 'text-[#666666]'}`}>
        {t('subtitle', language)}
      </p>
    </header>
  );
}

