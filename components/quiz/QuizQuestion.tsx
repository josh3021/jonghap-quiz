"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Question, SubjectType } from "@/types/quiz";
import type React from "react";

// ============================================================================
// Constants
// ============================================================================

const TIMER_WARNING_THRESHOLD = 3;
const FLAG_CDN_BASE_URL = "https://flagcdn.com/w320";

// ============================================================================
// Types
// ============================================================================

type QuizQuestionProps = {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  timeLeft: number;
  userAnswer: string;
  showFeedback: boolean;
  lastAnswerCorrect: boolean;
  isTimeout: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAnswerChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  getSubjectLabel: (type: SubjectType) => string;
};

// ============================================================================
// Sub Components
// ============================================================================

function Timer({ timeLeft }: { timeLeft: number }) {
  const isWarning = timeLeft <= TIMER_WARNING_THRESHOLD;
  const timerClassName = isWarning
    ? "text-destructive animate-pulse"
    : "text-primary";

  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${timerClassName}`}>{timeLeft}초</div>
    </div>
  );
}

function FlagImage({ flagCode }: { flagCode: string }) {
  const imageUrl = `${FLAG_CDN_BASE_URL}/${flagCode.toLowerCase()}.png`;

  return (
    <div className="flex justify-center items-center bg-muted rounded-lg p-8">
      <img
        src={imageUrl}
        alt="Country flag"
        className="max-w-full max-h-48 object-contain rounded shadow-lg"
      />
    </div>
  );
}

function FeedbackMessage({
  isCorrect,
  isTimeout,
  correctAnswer,
}: {
  isCorrect: boolean;
  isTimeout: boolean;
  correctAnswer: string;
}) {
  const isSuccess = isCorrect && !isTimeout;

  const containerClassName = isSuccess
    ? "bg-green-500/10 border-2 border-green-500"
    : "bg-destructive/10 border-2 border-destructive";

  const textClassName = isSuccess ? "text-green-600" : "text-destructive";

  const message = isTimeout ? "시간 초과!" : isCorrect ? "정답!" : "땡!";
  const showCorrectAnswer = !isCorrect || isTimeout;

  return (
    <div className={`p-4 rounded-lg ${containerClassName}`}>
      <p className={`text-center font-bold text-lg ${textClassName}`}>
        {message}
      </p>
      {showCorrectAnswer && (
        <p className="text-center mt-2 text-muted-foreground">
          정답: <span className="font-bold text-foreground">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
}

function AnswerInput({
  inputRef,
  value,
  onChange,
  onKeyDown,
  disabled,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean;
}) {
  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="답을 입력하세요."
      disabled={disabled}
      className="text-lg p-6"
    />
  );
}

function QuestionHeader({
  subjectLabel,
  currentIndex,
  totalQuestions,
  progress,
}: {
  subjectLabel: string;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
}) {
  return (
    <CardHeader>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-primary">{subjectLabel}</span>
        <span className="text-lg font-bold">
          문제 {currentIndex + 1} / {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </CardHeader>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  progress,
  timeLeft,
  userAnswer,
  showFeedback,
  lastAnswerCorrect,
  isTimeout,
  inputRef,
  onAnswerChange,
  onKeyPress,
  onSubmit,
  getSubjectLabel,
}: QuizQuestionProps) {
  const isFlagQuestion = question.type === "flag" && question.flagCode;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-2xl">
        <QuestionHeader
          subjectLabel={getSubjectLabel(question.type)}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          progress={progress}
        />

        <CardContent className="space-y-6">
          <Timer timeLeft={timeLeft} />

          {isFlagQuestion && <FlagImage flagCode={question.flagCode!} />}

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{question.question}</h2>
          </div>

          <div className="space-y-4">
            <AnswerInput
              inputRef={inputRef}
              value={userAnswer}
              onChange={onAnswerChange}
              onKeyDown={onKeyPress}
              disabled={showFeedback}
            />

            {showFeedback && (
              <FeedbackMessage
                isCorrect={lastAnswerCorrect}
                isTimeout={isTimeout}
                correctAnswer={question.answer}
              />
            )}

            {!showFeedback && (
              <Button onClick={onSubmit} className="w-full" size="lg">
                확인
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
