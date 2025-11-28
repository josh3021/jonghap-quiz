export type Difficulty = "easy" | "medium" | "hard";

export type SubjectType = "flag" | "sajaseongeo" | "sokdam" | "gugudan" | "sinjoeo";

export type Country = {
  nameKo: string;
  code: string;
  difficulty: Difficulty;
  altNames?: string[]; // 대체 이름 (호주/오스트레일리아 등)
};

export type SajaSokdam = {
  first: string;
  second: string;
  difficulty: Difficulty;
};

export type Sinjoeo = {
  word: string | string[];
  meaning: string;
  difficulty: Difficulty;
};

export type Question = {
  type: SubjectType;
  question: string;
  answer: string;
  hint?: string;
  flagCode?: string;
  altAnswers?: string[]; // 대체 정답 (국기 문제용)
};

export type Answer = {
  question: Question;
  userAnswer: string;
  correct: boolean;
};

export type GameState = "difficulty" | "quiz" | "results";
