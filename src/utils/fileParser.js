export const parseFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('파일이 선택되지 않았습니다.'));
      return;
    }

    // 파일 확장자 확인
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ['.txt', '.py', '.php', '.js', '.java', '.sql'].some(
      ext => fileName.endsWith(ext)
    );

    if (!hasValidExtension) {
      reject(new Error('지원하지 않는 파일 형식입니다. (.txt, .py, .php, .js, .java, .sql)'));
      return;
    }

    // 파일 크기 확인 (1MB)
    if (file.size > 1024 * 1024) {
      reject(new Error('파일 크기가 1MB를 초과합니다.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        resolve(content);
      } catch (error) {
        reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
    };
    reader.readAsText(file, 'UTF-8');
  });
};

