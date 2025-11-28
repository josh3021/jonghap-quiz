/**
 * 텍스트 정규화 함수 (공백, 특수문자 제거)
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "") // 공백 제거
    .replace(/[.,!?~\-_]/g, ""); // 특수문자 제거
};

/**
 * Levenshtein distance 계산 함수
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

/**
 * 유사도 검사 함수 (사자성어, 속담용)
 */
export const isSimilarAnswer = (
  userAnswer: string,
  correctAnswer: string
): boolean => {
  const normalized1 = normalizeText(userAnswer);
  const normalized2 = normalizeText(correctAnswer);

  // 정확히 일치하는 경우
  if (normalized1 === normalized2) {
    return true;
  }

  // 한쪽이 다른 쪽을 포함하는 경우
  if (
    normalized1.includes(normalized2) ||
    normalized2.includes(normalized1)
  ) {
    return true;
  }

  // 접두사 매칭: 정답의 주요 부분(80%)이 일치하면 정답으로 인정
  const minLength = Math.min(normalized1.length, normalized2.length);
  const maxLength = Math.max(normalized1.length, normalized2.length);

  // 두 문자열의 길이 차이가 너무 크지 않은 경우 (최대 30% 차이)
  if (minLength / maxLength >= 0.7) {
    // 짧은 문자열의 80% 이상이 긴 문자열의 시작 부분과 일치하면 정답
    const prefixLength = Math.floor(minLength * 0.8);
    const prefix1 = normalized1.substring(0, prefixLength);
    const prefix2 = normalized2.substring(0, prefixLength);

    if (prefix1 === prefix2) {
      return true;
    }
  }

  const distance = levenshteinDistance(normalized1, normalized2);
  const similarity = 1 - distance / maxLength;

  // 70% 이상 유사하면 정답으로 인정
  return similarity >= 0.7;
};
