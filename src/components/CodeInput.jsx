import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function CodeInput({ value, onChange, placeholder }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <div className="w-full">
      <label className={`block text-sm font-semibold mb-2 ${
        theme === 'dark' ? 'text-[#cccccc]' : 'text-[#333333]'
      }`}>
        {t('codeInputLabel', language)}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "SELECT * FROM users WHERE username = '$username'"}
        className={`w-full h-64 px-4 py-3 font-mono text-sm rounded-lg border-2 focus:outline-none resize-none transition-colors ${
          theme === 'dark'
            ? 'bg-[#252526] text-[#4ec9b0] border-[#3e3e42] focus:border-[#0e639c]'
            : 'bg-[#f3f3f3] text-[#098658] border-[#d3d3d3] focus:border-[#007acc]'
        }`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      />
    </div>
  );
}

