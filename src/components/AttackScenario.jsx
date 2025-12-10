import { AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function AttackScenario({ scenario }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <div className={`border-l-4 rounded-lg p-4 mb-4 ${
      theme === 'dark'
        ? 'bg-[#3a2d1d] border-[#dcdcaa]'
        : 'bg-[#fff4e5] border-[#795e26]'
    }`}>
      <h3 className={`font-bold mb-3 flex items-center gap-2 ${
        theme === 'dark' ? 'text-[#dcdcaa]' : 'text-[#795e26]'
      }`}>
        <AlertCircle className="w-5 h-5" />
        {t('attackScenarios', language)}
      </h3>
      
      <div className="space-y-3">
        <div>
          <div className={`text-sm font-semibold mb-1 ${
            theme === 'dark' ? 'text-[#dcdcaa]' : 'text-[#795e26]'
          }`}>{t('attackInput', language)}</div>
          <div className="attack-input">
            {scenario.attackInput}
          </div>
        </div>
        
        <div>
          <div className={`text-sm font-semibold mb-1 ${
            theme === 'dark' ? 'text-[#dcdcaa]' : 'text-[#795e26]'
          }`}>{t('executedQuery', language)}</div>
          <div className="attack-query">
            {scenario.executedQuery}
          </div>
        </div>
        
        <div className={`border rounded p-3 ${
          theme === 'dark'
            ? 'bg-[#3a2d1d] border-[#dcdcaa]/30'
            : 'bg-[#fff4e5] border-[#795e26]/30'
        }`}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              theme === 'dark' ? 'text-[#dcdcaa]' : 'text-[#795e26]'
            }`} />
            <div>
              <div className={`text-sm font-semibold mb-1 ${
                theme === 'dark' ? 'text-[#dcdcaa]' : 'text-[#795e26]'
              }`}>{t('expectedDamage', language)}</div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
              }`}>{scenario.expectedDamage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

