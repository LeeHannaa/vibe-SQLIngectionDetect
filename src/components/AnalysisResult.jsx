import RiskBadge from './RiskBadge';
import VulnerabilityCard from './VulnerabilityCard';
import AttackScenario from './AttackScenario';
import SecureCodeBlock from './SecureCodeBlock';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function AnalysisResult({ result }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  if (!result) return null;

  return (
    <div className="space-y-6">
      <RiskBadge level={result.riskLevel} count={result.vulnerabilities?.length || 0} />

      {result.vulnerabilities && result.vulnerabilities.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
            theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
          }`}>
            {t('foundVulnerabilities', language)}
          </h2>
          {result.vulnerabilities.map((vuln, index) => (
            <VulnerabilityCard
              key={index}
              title={vuln.title}
              description={vuln.description}
              codeLocation={vuln.codeLocation}
            />
          ))}
        </div>
      )}

      {result.attackScenarios && result.attackScenarios.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
          }`}>{t('attackScenarios', language)}</h2>
          {result.attackScenarios.map((scenario, index) => (
            <AttackScenario key={index} scenario={scenario} />
          ))}
        </div>
      )}

      {result.secureCode && result.secureCode.trim().length > 0 && (
        <div>
          <SecureCodeBlock
            code={result.secureCode}
            language={result.language}
            title={true}
          />
        </div>
      )}

      {result.riskLevel === 'SAFE' && (
        <div className={`border-l-4 rounded-lg p-6 ${
          theme === 'dark'
            ? 'bg-[#1e3a1e] border-[#4ec9b0]'
            : 'bg-[#e8f5e9] border-[#098658]'
        }`}>
          <h3 className={`font-bold text-lg mb-2 ${
            theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#098658]'
          }`}>✅ {t('safeCodeMessage', language)}</h3>
          <p className={theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'}>
            {t('safeCodeDescription', language)}
          </p>
        </div>
      )}

      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
          }`}>{t('recommendations', language)}</h2>
          <ul className={`rounded-lg p-4 space-y-2 ${
            theme === 'dark' ? 'bg-[#2d2d30]' : 'bg-[#f3f3f3]'
          }`}>
            {result.recommendations.map((rec, index) => (
              <li key={index} className={`flex items-start gap-2 ${
                theme === 'dark' ? 'text-[#cccccc]' : 'text-[#333333]'
              }`}>
                <span className={`mt-1 ${
                  theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#007acc]'
                }`}>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

