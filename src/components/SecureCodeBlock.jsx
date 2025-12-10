import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function SecureCodeBlock({ code, language, title }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const { language: currentLanguage } = useLanguage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="mb-6">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-bold text-lg ${
            theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
          }`}>{t('secureCode', currentLanguage)}</h3>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1 text-white rounded text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-[#0e639c] hover:bg-[#1177bb]'
                : 'bg-[#007acc] hover:bg-[#005a9e]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('copied', currentLanguage)}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t('copy', currentLanguage)}</span>
              </>
            )}
          </button>
        </div>
      )}
      {language && (
        <div className={`text-sm mb-2 ${
          theme === 'dark' ? 'text-[#858585]' : 'text-[#666666]'
        }`}># {language}</div>
      )}
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
}

