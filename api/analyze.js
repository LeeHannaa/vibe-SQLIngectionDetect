export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel Functions는 req.body를 자동으로 파싱하지만, 안전하게 처리
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
  }

  const { code, language = 'ko' } = body;

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: '코드를 입력해주세요.' });
  }

  if (code.length > 10000) {
    return res.status(400).json({ error: '코드는 10,000자를 초과할 수 없습니다.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
  }

  try {
    // 언어별 프롬프트 템플릿
    const languagePrompts = {
      ko: {
        instruction: '다음 SQL 쿼리 코드를 분석하여 SQL Injection 취약점을 탐지하고, 공격 시나리오와 안전한 대체 코드를 제공해주세요.',
        jsonFormat: {
          title: '취약점 제목',
          description: '취약점 상세 설명',
          codeLocation: '취약한 코드 위치',
          attackInput: '공격자가 입력할 값',
          executedQuery: '실제 실행될 쿼리',
          expectedDamage: '예상되는 피해 설명',
          secureCode: '안전한 코드 예시',
          recommendations: '권장 사항 1',
        },
        analysisCriteria: '분석 기준 (정확하게 평가하세요)',
        riskClassification: '위험도 분류 (정확하게 판단하세요)',
        importantRules: '중요 규칙 (반드시 지켜야 합니다)',
        responseLanguage: '모든 설명, 취약점 설명, 예상 피해, 권장 사항은 반드시 한국어로 작성해야 합니다.',
      },
      en: {
        instruction: 'Analyze the following SQL query code to detect SQL Injection vulnerabilities and provide attack scenarios and secure alternative code.',
        jsonFormat: {
          title: 'Vulnerability Title',
          description: 'Detailed vulnerability description',
          codeLocation: 'Vulnerable code location',
          attackInput: 'Attacker input value',
          executedQuery: 'Query that will be executed',
          expectedDamage: 'Expected damage description',
          secureCode: 'Secure code example',
          recommendations: 'Recommendation 1',
        },
        analysisCriteria: 'Analysis Criteria (evaluate accurately)',
        riskClassification: 'Risk Classification (judge accurately)',
        importantRules: 'Important Rules (must be followed)',
        responseLanguage: 'All descriptions, vulnerability descriptions, expected damage, and recommendations must be written in English.',
      },
      zh: {
        instruction: '分析以下SQL查询代码以检测SQL注入漏洞，并提供攻击场景和安全替代代码。',
        jsonFormat: {
          title: '漏洞标题',
          description: '漏洞详细描述',
          codeLocation: '漏洞代码位置',
          attackInput: '攻击者输入值',
          executedQuery: '将执行的查询',
          expectedDamage: '预期损害描述',
          secureCode: '安全代码示例',
          recommendations: '建议 1',
        },
        analysisCriteria: '分析标准（准确评估）',
        riskClassification: '风险分类（准确判断）',
        importantRules: '重要规则（必须遵守）',
        responseLanguage: '所有说明、漏洞说明、预期损害和建议必须用中文编写。',
      },
      ja: {
        instruction: '次のSQLクエリコードを分析してSQLインジェクションの脆弱性を検出し、攻撃シナリオと安全な代替コードを提供してください。',
        jsonFormat: {
          title: '脆弱性タイトル',
          description: '脆弱性の詳細説明',
          codeLocation: '脆弱なコードの位置',
          attackInput: '攻撃者が入力する値',
          executedQuery: '実行されるクエリ',
          expectedDamage: '予想される損害の説明',
          secureCode: '安全なコード例',
          recommendations: '推奨事項 1',
        },
        analysisCriteria: '分析基準（正確に評価してください）',
        riskClassification: 'リスク分類（正確に判断してください）',
        importantRules: '重要な規則（必ず守ってください）',
        responseLanguage: 'すべての説明、脆弱性の説明、予想される損害、推奨事項は必ず日本語で記述してください。',
      },
    };

    const lang = languagePrompts[language] || languagePrompts.ko;
    
    const prompt = `${lang.instruction}

코드:
\`\`\`
${code}
\`\`\`

다음 JSON 형식으로 응답해주세요:
{
  "riskLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "SAFE",
  "vulnerabilities": [
    {
      "title": "${lang.jsonFormat.title}",
      "description": "${lang.jsonFormat.description}",
      "codeLocation": "${lang.jsonFormat.codeLocation}"
    }
  ],
  "attackScenarios": [
    {
      "attackInput": "${lang.jsonFormat.attackInput}",
      "executedQuery": "${lang.jsonFormat.executedQuery}",
      "expectedDamage": "${lang.jsonFormat.expectedDamage}"
    }
  ],
  "secureCode": "${lang.jsonFormat.secureCode}",
  "language": "코드 언어 (python, php, javascript 등)",
  "recommendations": [
    "${lang.jsonFormat.recommendations}",
    "${lang.jsonFormat.recommendations.replace('1', '2')}"
  ]
}

${lang.analysisCriteria}:
1. 사용자 입력이 직접 쿼리에 삽입되는지 확인 (문자열 연결, 템플릿 리터럴 등)
2. Prepared Statement나 Parameterized Query 사용 여부
3. 입력값 검증 및 이스케이프 처리 여부
4. 동적 쿼리 구성 방식
5. SQL Injection 패턴 ('--', UNION, OR 1=1, '; DROP 등) 존재 여부
6. ORM 사용 여부 및 안전한 사용 여부

${lang.riskClassification}:
- CRITICAL: 사용자 입력이 직접 쿼리에 삽입되어 데이터 유출/삭제/수정이 가능한 경우
- HIGH: 인증 우회나 중요한 데이터 접근이 가능한 경우
- MEDIUM: 제한적인 정보 노출이나 조건부 공격이 가능한 경우
- LOW: 매우 제한적인 정보 노출이나 낮은 확률의 공격 가능성
- SAFE: Prepared Statement, Parameterized Query, ORM을 올바르게 사용하여 SQL Injection 취약점이 전혀 없는 경우

${lang.importantRules}:
1. riskLevel이 "SAFE"인 경우:
   - vulnerabilities는 반드시 빈 배열 []이어야 합니다
   - attackScenarios는 반드시 빈 배열 []이어야 합니다
   - secureCode는 빈 문자열 ""이어야 합니다 (이미 안전하므로 대체 코드 불필요)
   - recommendations는 빈 배열 []이어야 합니다 (추가 권장 사항 불필요)
   - language는 코드 언어를 명시하세요

2. riskLevel이 "SAFE"가 아닌 경우 (CRITICAL, HIGH, MEDIUM, LOW):
   - vulnerabilities는 최소 1개 이상 있어야 합니다
   - attackScenarios는 최소 1개 이상 있어야 합니다
   - secureCode는 반드시 안전한 대체 코드를 제공해야 합니다
   - recommendations는 최소 1개 이상 있어야 합니다

3. ${lang.responseLanguage}

4. 코드를 정확하게 분석하여 위험도가 SAFE인데 취약점 정보를 제공하거나, 위험도가 SAFE가 아닌데 취약점 정보가 없는 경우는 절대 없어야 합니다.

5. JSON 형식으로만 응답하고, 다른 설명은 포함하지 마세요.`;

    // OpenAI GPT API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 4000,
        messages: [
          {
            role: 'system',
            content: `You are a security expert specializing in SQL Injection vulnerability detection. Always respond with valid JSON only, no additional text. All descriptions, explanations, and recommendations must be written in ${language === 'ko' ? 'Korean (한국어)' : language === 'en' ? 'English' : language === 'zh' ? 'Chinese (中文)' : 'Japanese (日本語)'}.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      return res.status(500).json({ 
        error: 'AI 분석 중 오류가 발생했습니다.',
        details: errorText 
      });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // JSON 추출 (마크다운 코드 블록 제거)
    let jsonText = content.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      const analysisResult = JSON.parse(jsonText);
      
      // 기본값 설정
      if (!analysisResult.riskLevel) analysisResult.riskLevel = 'SAFE';
      if (!analysisResult.vulnerabilities) analysisResult.vulnerabilities = [];
      if (!analysisResult.attackScenarios) analysisResult.attackScenarios = [];
      if (!analysisResult.recommendations) analysisResult.recommendations = [];

      return res.status(200).json(analysisResult);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content:', content);
      return res.status(500).json({ 
        error: 'AI 응답을 파싱하는 중 오류가 발생했습니다.',
        details: content.substring(0, 500)
      });
    }
  } catch (error) {
    console.error('Analysis Error:', error);
    return res.status(500).json({ 
      error: '분석 중 오류가 발생했습니다.',
      details: error.message 
    });
  }
}

