"use client";

import { useQuiz } from "@/hooks/useQuiz";
import {
  DifficultySelect,
  QuizQuestion,
  QuizResults,
} from "@/components/quiz";

export default function MultiSubjectQuiz() {
  const { gameState, setup, quiz, results, getSubjectLabel } = useQuiz();

  if (gameState === "difficulty") {
    return (
      <DifficultySelect
        difficulty={setup.difficulty}
        selectedSubjects={setup.selectedSubjects}
        allSubjects={setup.allSubjects}
        questionCount={setup.questionCount}
        questionCountOptions={setup.questionCountOptions}
        onDifficultyChange={setup.setDifficulty}
        onToggleSubject={setup.toggleSubject}
        onQuestionCountChange={setup.setQuestionCount}
        onStart={setup.startQuiz}
        getSubjectLabel={getSubjectLabel}
      />
    );
  }

  if (gameState === "quiz" && quiz.question) {
    return (
      <QuizQuestion
        question={quiz.question}
        currentIndex={quiz.currentIndex}
        totalQuestions={quiz.totalQuestions}
        progress={quiz.progress}
        timeLeft={quiz.timeLeft}
        userAnswer={quiz.userAnswer}
        showFeedback={quiz.showFeedback}
        lastAnswerCorrect={quiz.lastAnswerCorrect}
        isTimeout={quiz.isTimeout}
        inputRef={quiz.inputRef}
        onAnswerChange={quiz.setUserAnswer}
        onKeyPress={quiz.handleKeyPress}
        onSubmit={() => quiz.submitAnswer()}
        getSubjectLabel={getSubjectLabel}
      />
    );
  }

  if (gameState === "results") {
    return (
      <QuizResults
        answers={results.answers}
        score={results.score}
        totalQuestions={results.totalQuestions}
        percentage={results.percentage}
        onReset={results.resetQuiz}
        getSubjectLabel={getSubjectLabel}
      />
    );
  }

  return null;
}
