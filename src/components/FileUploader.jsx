import { Upload, File } from 'lucide-react';
import { useState } from 'react';
import { parseFile } from '../utils/fileParser';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../locales/translations';

export default function FileUploader({ onFileLoad }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleFile = async (file) => {
    setError(null);
    try {
      const content = await parseFile(file);
      onFileLoad(content);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full mb-6">
      <label className={`block text-sm font-semibold mb-2 ${
        theme === 'dark' ? 'text-[#cccccc]' : 'text-[#333333]'
      }`}>
        {t('fileUpload', language)}
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? theme === 'dark' 
              ? 'border-[#0e639c] bg-[#0e639c]/20' 
              : 'border-[#007acc] bg-[#007acc]/10'
            : theme === 'dark'
              ? 'border-[#3e3e42] hover:border-[#0e639c]'
              : 'border-[#d3d3d3] hover:border-[#007acc]'
          }
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".txt,.py,.php,.js,.java,.sql"
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#007acc]'
          }`} />
          <p className={`mb-2 ${
            theme === 'dark' ? 'text-[#cccccc]' : 'text-[#333333]'
          }`}>
            {t('dragDrop', language)}
          </p>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-[#858585]' : 'text-[#666666]'
          }`}>
            {t('supportedFormats', language)}
          </p>
        </label>
      </div>
      {error && (
        <div className={`mt-2 text-sm ${
          theme === 'dark' ? 'text-[#f48771]' : 'text-[#a1260d]'
        }`}>{error}</div>
      )}
    </div>
  );
}

