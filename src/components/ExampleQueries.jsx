import { FileCode } from 'lucide-react';
import { EXAMPLE_QUERIES } from '../utils/constants';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function ExampleQueries({ onSelect }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <div className="w-full mb-6">
      <label className={`block text-sm font-semibold mb-3 ${
        theme === 'dark' ? 'text-[#cccccc]' : 'text-[#333333]'
      }`}>
        {t('exampleQueries', language)}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelect(example.code)}
            className={`p-4 border-2 rounded-lg transition-all text-left group ${
              theme === 'dark'
                ? 'bg-[#2d2d30] border-[#3e3e42] hover:border-[#0e639c] hover:bg-[#252526]'
                : 'bg-[#f3f3f3] border-[#d3d3d3] hover:border-[#007acc] hover:bg-[#e8e8e8] shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileCode className={`w-5 h-5 ${
                theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#007acc]'
              }`} />
              <h3 className={`font-semibold text-base ${
                theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
              }`}>{t(`example${example.id}`, language)}</h3>
            </div>
            <p className={`text-sm mb-3 ${
              theme === 'dark' ? 'text-[#858585]' : 'text-[#666666]'
            }`}>{t(`example${example.id}Desc`, language)}</p>
            <div className={`text-xs font-mono p-2 rounded overflow-hidden line-clamp-2 ${
              theme === 'dark'
                ? 'text-[#4ec9b0] bg-[#1e1e1e]'
                : 'text-[#098658] bg-[#e8e8e8]'
            }`}>
              {example.code.split('\n')[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

