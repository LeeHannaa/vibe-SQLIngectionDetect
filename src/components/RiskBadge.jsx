import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { RISK_LEVELS } from '../utils/constants';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

const iconMap = {
  AlertCircle: AlertCircle,
  AlertTriangle: AlertTriangle,
  Info: Info,
  CheckCircle: CheckCircle,
};

export default function RiskBadge({ level, count }) {
  const { language } = useLanguage();
  const riskConfig = RISK_LEVELS[level] || RISK_LEVELS.SAFE;
  const Icon = iconMap[riskConfig.icon] || AlertCircle;

  return (
    <div className={`${riskConfig.bgColor} ${riskConfig.textColor} px-6 py-4 rounded-lg border-l-4 ${riskConfig.borderColor} flex items-center gap-3`}>
      <Icon className="w-6 h-6" />
      <div>
        <div className="font-bold text-lg">
          {t('riskLevel', language)}: {t(level.toLowerCase(), language)}
        </div>
        {count !== undefined && (
          <div className="text-sm opacity-90">
            {t('vulnerabilitiesFound', language, { count })}
          </div>
        )}
      </div>
    </div>
  );
}

