"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Answer,
  Country,
  Difficulty,
  GameState,
  Question,
  SajaSokdam,
  Sinjoeo,
  SubjectType,
} from "@/types/quiz";
import { COUNTRIES, SAJASEONGEO, SINJOEO, SOKDAM } from "@/data";
import { isSimilarAnswer } from "@/utils/text";

const TIME_PER_QUESTION = 10;
const FEEDBACK_DURATION = 2000;

const ALL_SUBJECTS: SubjectType[] = [
  "flag",
  "sajaseongeo",
  "sokdam",
  "gugudan",
  "sinjoeo",
];

const QUESTION_COUNT_OPTIONS = [10, 20, 25, 50] as const;
type QuestionCount = (typeof QUESTION_COUNT_OPTIONS)[number];

// 난이도별 문제 출제 비율 (일반)
// 쉬움: 100% easy
// 보통: 20% easy, 80% medium
// 어려움: 10% easy, 30% medium, 60% hard
const getDifficultyPool = (gameDifficulty: Difficulty): Difficulty => {
  const random = Math.random();

  switch (gameDifficulty) {
    case "easy":
      return "easy";
    case "medium":
      // 20% easy, 80% medium
      return random < 0.2 ? "easy" : "medium";
    case "hard":
      // 10% easy, 30% medium, 60% hard
      if (random < 0.1) return "easy";
      if (random < 0.4) return "medium";
      return "hard";
  }
};

// 구구단 전용 난이도 비율
// 쉬움: 100% easy (2-9단)
// 보통: 100% medium (6-13단, 10단 제외)
// 어려움: 30% medium, 70% hard (11-19단)
const getGugudanDifficultyPool = (gameDifficulty: Difficulty): Difficulty => {
  const random = Math.random();

  switch (gameDifficulty) {
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    case "hard":
      // 30% medium, 70% hard
      return random < 0.3 ? "medium" : "hard";
  }
};

export function useQuiz() {
  const [gameState, setGameState] = useState<GameState>("difficulty");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectType[]>([...ALL_SUBJECTS]);
  const [questionCount, setQuestionCount] = useState<QuestionCount>(25);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isTimeout, setIsTimeout] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 타이머 효과
  useEffect(() => {
    if (gameState === "quiz" && !showFeedback) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsTimeout(true);
        submitAnswer(true);
      }
    }
  }, [timeLeft, gameState, showFeedback]);

  // 피드백 후 자동 진행
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        proceedToNext();
      }, FEEDBACK_DURATION);

      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  // 입력 필드 자동 포커스
  useEffect(() => {
    if (gameState === "quiz" && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion, gameState, showFeedback]);

  // 특정 난이도의 국가만 필터링
  const getCountriesByExactDifficulty = (targetDifficulty: Difficulty): Country[] => {
    return COUNTRIES.filter((c) => c.difficulty === targetDifficulty);
  };

  // 특정 난이도의 사자성어만 필터링
  const getSajaseongeoByExactDifficulty = (targetDifficulty: Difficulty): SajaSokdam[] => {
    return SAJASEONGEO.filter((s) => s.difficulty === targetDifficulty);
  };

  // 특정 난이도의 속담만 필터링
  const getSokdamByExactDifficulty = (targetDifficulty: Difficulty): SajaSokdam[] => {
    return SOKDAM.filter((s) => s.difficulty === targetDifficulty);
  };

  // 특정 난이도의 신조어만 필터링
  const getSinjoeoByExactDifficulty = (targetDifficulty: Difficulty): Sinjoeo[] => {
    return SINJOEO.filter((s) => s.difficulty === targetDifficulty);
  };

  const getGugudanNumbers = (questionDifficulty: Difficulty): { num1: number; num2: number } => {
    switch (questionDifficulty) {
      case "easy": {
        // 쉬움: 2단-9단
        const num1 = Math.floor(Math.random() * 8) + 2; // 2-9
        const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
        return { num1, num2 };
      }
      case "medium": {
        // 보통: 6단-13단 (10단 제외)
        const validNums = [6, 7, 8, 9, 11, 12, 13];
        const num1 = validNums[Math.floor(Math.random() * validNums.length)];
        const num2 = validNums[Math.floor(Math.random() * validNums.length)];
        return { num1, num2 };
      }
      case "hard": {
        // 어려움: 11단-19단
        const num1 = Math.floor(Math.random() * 9) + 11; // 11-19
        const num2 = Math.floor(Math.random() * 9) + 11; // 11-19
        return { num1, num2 };
      }
    }
  };

  const generateQuestionByType = (
    type: SubjectType,
    usedSet: Set<string>
  ): Question => {
    const MAX_ATTEMPTS = 100;
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      let question: Question;
      let questionKey: string;

      // 게임 난이도에 따른 문제 난이도 결정 (비율 적용)
      const questionDifficulty = getDifficultyPool(difficulty);

      switch (type) {
        case "flag": {
          const availableCountries = getCountriesByExactDifficulty(questionDifficulty);
          if (availableCountries.length === 0) {
            attempts++;
            continue;
          }
          const country =
            availableCountries[
              Math.floor(Math.random() * availableCountries.length)
            ];
          questionKey = `flag-${country.code}`;
          question = {
            type: "flag",
            question: "이 국기는 어느 나라의 국기인가요?",
            answer: country.nameKo,
            flagCode: country.code,
            altAnswers: country.altNames,
          };
          break;
        }
        case "sajaseongeo": {
          const availableSajaseongeo = getSajaseongeoByExactDifficulty(questionDifficulty);
          if (availableSajaseongeo.length === 0) {
            attempts++;
            continue;
          }
          const item =
            availableSajaseongeo[Math.floor(Math.random() * availableSajaseongeo.length)];
          questionKey = `sajaseongeo-${item.first}`;
          question = {
            type: "sajaseongeo",
            question: item.first,
            answer: item.second,
            hint: `${item.first}${item.second}`,
          };
          break;
        }
        case "sokdam": {
          const availableSokdam = getSokdamByExactDifficulty(questionDifficulty);
          if (availableSokdam.length === 0) {
            attempts++;
            continue;
          }
          const item = availableSokdam[Math.floor(Math.random() * availableSokdam.length)];
          questionKey = `sokdam-${item.first}`;
          question = {
            type: "sokdam",
            question: item.first,
            answer: item.second,
            hint: `${item.first} ${item.second}`,
          };
          break;
        }
        case "gugudan": {
          // 구구단은 별도의 난이도 비율 적용
          const gugudanDifficulty = getGugudanDifficultyPool(difficulty);
          const { num1, num2 } = getGugudanNumbers(gugudanDifficulty);
          questionKey = `gugudan-${num1}-${num2}`;
          question = {
            type: "gugudan",
            question: `${num1} × ${num2} = ?`,
            answer: String(num1 * num2),
          };
          break;
        }
        case "sinjoeo": {
          const availableSinjoeo = getSinjoeoByExactDifficulty(questionDifficulty);
          if (availableSinjoeo.length === 0) {
            attempts++;
            continue;
          }
          const item = availableSinjoeo[Math.floor(Math.random() * availableSinjoeo.length)];
          // word가 배열인 경우 복수 정답 처리
          const primaryWord = Array.isArray(item.word) ? item.word[0] : item.word;
          const altWords = Array.isArray(item.word) ? item.word.slice(1) : undefined;
          questionKey = `sinjoeo-${primaryWord}`;
          question = {
            type: "sinjoeo",
            question: `"${item.meaning}"을 뜻하는 신조어는?`,
            answer: primaryWord,
            altAnswers: altWords,
          };
          break;
        }
      }

      if (!usedSet.has(questionKey)) {
        usedSet.add(questionKey);
        return question;
      }

      attempts++;
    }

    // 폴백: 구구단 문제 생성 (구구단 전용 난이도 비율 적용)
    const fallbackDifficulty = getGugudanDifficultyPool(difficulty);
    const { num1, num2 } = getGugudanNumbers(fallbackDifficulty);
    return {
      type: "gugudan",
      question: `${num1} × ${num2} = ?`,
      answer: String(num1 * num2),
    };
  };

  const generateQuestions = (): Question[] => {
    const questions: Question[] = [];
    const localUsedQuestions = new Set<string>();

    const guaranteedQuestions: Question[] = [];

    // 각 선택된 유형별 최소 1문제 보장
    selectedSubjects.forEach((type) => {
      const question = generateQuestionByType(type, localUsedQuestions);
      guaranteedQuestions.push(question);
    });

    // 나머지 문제 랜덤 생성 (선택한 문제 수에서 보장된 문제 수를 뺀 만큼)
    const remainingCount = Math.max(0, questionCount - selectedSubjects.length);
    for (let i = 0; i < remainingCount; i++) {
      const randomType =
        selectedSubjects[Math.floor(Math.random() * selectedSubjects.length)];
      const question = generateQuestionByType(randomType, localUsedQuestions);
      questions.push(question);
    }

    const allQuestions = [...guaranteedQuestions, ...questions];
    return allQuestions.sort(() => Math.random() - 0.5);
  };

  const startQuiz = () => {
    const questions = generateQuestions();
    setQuizQuestions(questions);
    setGameState("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setUserAnswer("");
    setShowFeedback(false);
    setTimeLeft(TIME_PER_QUESTION);
    setIsTimeout(false);
  };

  // 공백 제거 후 비교 (국기 문제용)
  const normalizeForComparison = (str: string): string => {
    return str.replace(/\s+/g, "").toLowerCase();
  };

  // 국기 문제 정답 체크 (공백 제거 + 복수 정답)
  const checkFlagAnswer = (userAns: string, correctAns: string, altAnswers?: string[]): boolean => {
    const normalizedUser = normalizeForComparison(userAns);
    const normalizedCorrect = normalizeForComparison(correctAns);

    // 기본 정답 체크
    if (normalizedUser === normalizedCorrect) return true;

    // 대체 정답 체크
    if (altAnswers) {
      return altAnswers.some(alt => normalizeForComparison(alt) === normalizedUser);
    }

    return false;
  };

  const submitAnswer = (timeout = false) => {
    if (showFeedback) return;

    const current = quizQuestions[currentQuestion];
    const answer = timeout ? "" : userAnswer.trim();

    // 문제 유형별로 다른 정답 판정 로직 적용
    let correct = false;

    if (current.type === "sajaseongeo" || current.type === "sokdam") {
      // 사자성어, 속담: 유사도 검사 (문맥이 비슷하면 정답)
      correct = isSimilarAnswer(answer, current.answer);
    } else if (current.type === "flag" || current.type === "sinjoeo") {
      // 국기, 신조어: 공백 제거 후 비교 + 복수 정답 지원
      correct = checkFlagAnswer(answer, current.answer, current.altAnswers);
    } else {
      // 구구단: 정확한 일치만 정답으로 인정
      correct = answer.toLowerCase() === current.answer.toLowerCase();
    }

    setAnswers([
      ...answers,
      { question: current, userAnswer: answer, correct },
    ]);
    setLastAnswerCorrect(correct);
    setShowFeedback(true);
  };

  const proceedToNext = () => {
    setShowFeedback(false);
    setIsTimeout(false);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setGameState("results");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showFeedback) {
      submitAnswer();
    }
  };

  const resetQuiz = () => {
    setGameState("difficulty");
    setDifficulty("medium");
    setSelectedSubjects([...ALL_SUBJECTS]);
    setQuestionCount(25);
    setCurrentQuestion(0);
    setUserAnswer("");
    setAnswers([]);
    setShowFeedback(false);
    setTimeLeft(TIME_PER_QUESTION);
    setIsTimeout(false);
  };

  const toggleSubject = (subject: SubjectType) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        // 최소 1개는 선택되어 있어야 함
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== subject);
      }
      return [...prev, subject];
    });
  };

  const getSubjectLabel = (type: SubjectType): string => {
    switch (type) {
      case "flag":
        return "국기";
      case "sajaseongeo":
        return "사자성어";
      case "sokdam":
        return "한국어 속담";
      case "gugudan":
        return "구구단";
      case "sinjoeo":
        return "신조어";
    }
  };

  const currentQuizQuestion = quizQuestions[currentQuestion];
  const progress = quizQuestions.length
    ? ((currentQuestion + 1) / quizQuestions.length) * 100
    : 0;
  const score = answers.filter((a) => a.correct).length;
  const percentage = quizQuestions.length
    ? Math.round((score / quizQuestions.length) * 100)
    : 0;

  return {
    gameState,

    // 설정 화면용
    setup: {
      difficulty,
      selectedSubjects,
      allSubjects: ALL_SUBJECTS,
      questionCount,
      questionCountOptions: QUESTION_COUNT_OPTIONS,
      setDifficulty,
      setQuestionCount,
      toggleSubject,
      startQuiz,
    },

    // 퀴즈 화면용
    quiz: {
      question: currentQuizQuestion,
      currentIndex: currentQuestion,
      totalQuestions: questionCount,
      progress,
      timeLeft,
      userAnswer,
      showFeedback,
      lastAnswerCorrect,
      isTimeout,
      inputRef,
      setUserAnswer,
      handleKeyPress,
      submitAnswer,
    },

    // 결과 화면용
    results: {
      answers,
      score,
      totalQuestions: questionCount,
      percentage,
      resetQuiz,
    },

    // 공통
    getSubjectLabel,
  };
}
