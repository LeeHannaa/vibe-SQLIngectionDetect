import { useState } from 'react';
import { analyzeCode } from '../utils/apiClient';

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyze = async (code, language = 'ko') => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeCode(code, language);
      setResult(analysisResult);
    } catch (err) {
      setError(err.message || '분석 중 오류가 발생했습니다.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    loading,
    error,
    result,
    analyze,
    reset,
  };
};

