import { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import CodeInput from './components/CodeInput';
import ExampleQueries from './components/ExampleQueries';
import AnalysisResult from './components/AnalysisResult';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { Shield, Loader2 } from 'lucide-react';
import { useAnalysis } from './hooks/useAnalysis';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';
import { t } from './locales/translations';
import './styles/globals.css';

function App() {
  const [activeTab, setActiveTab] = useState('input');
  const [code, setCode] = useState('');
  const { loading, error, result, analyze, reset } = useAnalysis();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleFileLoad = (content) => {
    setCode(content);
  };

  const handleExampleSelect = (exampleCode) => {
    setCode(exampleCode);
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      // 다국어 알림은 간단하게 영어로 표시
      alert(language === 'ko' ? '분석할 코드를 입력해주세요.' : 
            language === 'en' ? 'Please enter code to analyze.' :
            language === 'zh' ? '请输入要分析的代码。' : '分析するコードを入力してください。');
      return;
    }
    await analyze(code, language);
    setActiveTab('result');
  };

  const handleNewAnalysis = () => {
    reset();
    setCode('');
    setActiveTab('input');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#1e1e1e]' 
        : 'bg-[#ffffff]'
    }`}>
      <ThemeToggle />
      <LanguageSelector />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        {/* Tab Navigation */}
        <div className={`flex gap-2 mb-6 p-1 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'bg-[#2d2d30]' 
            : 'bg-[#e8e8e8]'
        }`}>
          <button
            onClick={() => setActiveTab('input')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'input'
                ? theme === 'dark'
                  ? 'bg-[#0e639c] text-white'
                  : 'bg-[#007acc] text-white'
                : theme === 'dark'
                  ? 'text-[#cccccc] hover:text-white'
                  : 'text-[#333333] hover:text-[#000000]'
            }`}
          >
            {t('codeInput', language)}
          </button>
          <button
            onClick={() => setActiveTab('result')}
            disabled={!result && !loading}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'result'
                ? theme === 'dark'
                  ? 'bg-[#0e639c] text-white'
                  : 'bg-[#007acc] text-white'
                : result || loading
                  ? theme === 'dark'
                    ? 'text-[#cccccc] hover:text-white'
                    : 'text-[#333333] hover:text-[#000000]'
                  : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {t('analysisResult', language)}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'input' ? (
          <div className="space-y-6">
            <FileUploader onFileLoad={handleFileLoad} />
            <CodeInput
              value={code}
              onChange={setCode}
              placeholder="SELECT * FROM users WHERE username = '$username'"
            />
            <ExampleQueries onSelect={handleExampleSelect} />
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className={`w-full text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? 'bg-[#0e639c] hover:bg-[#1177bb]'
                  : 'bg-[#007acc] hover:bg-[#005a9e]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('analyzing', language)}</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>{t('analyzeButton', language)}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div>
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className={`w-16 h-16 mx-auto mb-4 animate-spin ${
                  theme === 'dark' ? 'text-[#4ec9b0]' : 'text-[#007acc]'
                }`} />
                <p className={`text-xl mb-2 ${
                  theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'
                }`}>{t('analyzing', language)}</p>
                <p className={theme === 'dark' ? 'text-[#858585]' : 'text-[#666666]'}>
                  {t('analyzingText', language)}
                </p>
              </div>
            ) : error ? (
              <div className={`border-l-4 rounded-lg p-6 ${
                theme === 'dark'
                  ? 'bg-[#3a1d1d] border-[#f48771]'
                  : 'bg-[#ffe5e5] border-[#a1260d]'
              }`}>
                <h3 className={`font-bold text-lg mb-2 ${
                  theme === 'dark' ? 'text-[#f48771]' : 'text-[#a1260d]'
                }`}>{t('errorOccurred', language)}</h3>
                <p className={theme === 'dark' ? 'text-[#d4d4d4]' : 'text-[#333333]'}>{error}</p>
                <button
                  onClick={handleNewAnalysis}
                  className={`mt-4 px-4 py-2 text-white rounded transition-colors ${
                    theme === 'dark'
                      ? 'bg-[#f48771] hover:bg-[#ff9d87]'
                      : 'bg-[#a1260d] hover:bg-[#c42d1a]'
                  }`}
                >
                  {t('retry', language)}
                </button>
              </div>
            ) : result ? (
              <div>
                <AnalysisResult result={result} />
                <button
                  onClick={handleNewAnalysis}
                  className={`mt-6 w-full text-white font-bold py-3 px-6 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-[#0e639c] hover:bg-[#1177bb]'
                      : 'bg-[#007acc] hover:bg-[#005a9e]'
                  }`}
                >
                  {t('newAnalysis', language)}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

