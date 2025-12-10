const API_URL = import.meta.env.VITE_API_URL || '/api';

export const analyzeCode = async (code, language = 'ko') => {
  if (!code || code.trim().length === 0) {
    throw new Error('분석할 코드를 입력해주세요.');
  }

  if (code.length > 10000) {
    throw new Error('코드는 10,000자를 초과할 수 없습니다.');
  }

  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `서버 오류: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

