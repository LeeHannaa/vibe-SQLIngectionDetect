# SQL Injection 탐지기

AI 기반 SQL Injection 취약점 자동 탐지 및 보안 코드 제안 웹 애플리케이션

## 🚀 기능

- **자동 취약점 탐지**: AI가 SQL Injection 취약점을 자동으로 분석
- **위험도 분류**: CRITICAL, HIGH, MEDIUM, LOW, SAFE 5단계 위험도 평가
- **공격 시나리오 제시**: 실제 공격 방법과 예상 피해 설명
- **안전한 코드 제안**: Prepared Statement 기반 안전한 코드 예시 제공
- **파일 업로드 지원**: .txt, .py, .php, .js, .java, .sql 파일 업로드

## 🛠 기술 스택

- **Frontend**: React 18.x + Vite 5.x
- **스타일링**: Tailwind CSS 3.x
- **아이콘**: Lucide React
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT API (gpt-4o)

## 📦 설치

```bash
npm install
```

## 🔧 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
OPENAI_API_KEY=your_api_key_here
```

Vercel에 배포할 경우, Vercel 대시보드에서 환경 변수를 설정하세요.

## 🚀 개발 서버 실행

### 로컬 개발 (Vercel Functions 사용)

로컬에서 Vercel Functions를 테스트하려면 Vercel CLI를 사용하세요:

```bash
# Vercel CLI 설치 (처음 한 번만)
npm i -g vercel

# 개발 서버 실행 (Vercel Functions 포함)
npm run dev:vercel
```

또는 일반 Vite 개발 서버 (프론트엔드만):

```bash
npm run dev
```

**참고**: `npm run dev`를 사용할 경우 API 엔드포인트가 작동하지 않을 수 있습니다. Vercel Functions를 테스트하려면 `npm run dev:vercel`을 사용하세요.

## 📦 빌드

```bash
npm run build
```

## 🌐 배포

### Vercel 배포

1. GitHub에 프로젝트를 푸시합니다
2. [Vercel](https://vercel.com)에 로그인하고 새 프로젝트를 생성합니다
3. GitHub 저장소를 연결합니다
4. 환경 변수 `OPENAI_API_KEY`를 설정합니다
5. 배포를 완료합니다

**중요**: 프로덕션 배포 시 모든 API 요청은 `api/analyze.js` Vercel Function을 통해 처리됩니다.

### 환경 변수 설정 (Vercel)

Vercel 대시보드 → Settings → Environment Variables에서:
- `OPENAI_API_KEY`: OpenAI GPT API 키 (Production, Preview, Development 모두 설정 권장)

## 📁 프로젝트 구조

```
sql-injection-detector/
├── api/
│   └── analyze.js          # Vercel Serverless Function
├── src/
│   ├── components/         # React 컴포넌트
│   ├── hooks/              # Custom Hooks
│   ├── utils/              # 유틸리티 함수
│   ├── styles/             # 전역 스타일
│   ├── App.jsx             # 메인 앱
│   └── main.jsx            # 엔트리 포인트
├── public/                 # 정적 파일
└── package.json
```

## 🔒 보안 고려사항

- API 키는 서버 사이드에서만 사용되며 클라이언트에 노출되지 않습니다
- 파일 업로드 시 크기 및 형식 검증을 수행합니다
- 입력 코드는 최대 10,000자로 제한됩니다

## 📝 라이선스

MIT

