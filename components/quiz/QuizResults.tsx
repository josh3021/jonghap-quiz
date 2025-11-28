"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Answer, SubjectType } from "@/types/quiz";

type QuizResultsProps = {
  answers: Answer[];
  score: number;
  totalQuestions: number;
  percentage: number;
  onReset: () => void;
  getSubjectLabel: (type: SubjectType) => string;
};

const getPerformance = (percentage: number) => {
  if (percentage >= 90) return { text: "최고예요!", color: "text-green-600" };
  if (percentage >= 70) return { text: "잘했어요!", color: "text-primary" };
  if (percentage >= 50) return { text: "괜찮아요!", color: "text-yellow-600" };
  return { text: "다음에 더 잘할 수 있어요!", color: "text-destructive" };
};

export function QuizResults({
  answers,
  score,
  totalQuestions,
  percentage,
  onReset,
  getSubjectLabel,
}: QuizResultsProps) {
  const performance = getPerformance(percentage);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            퀴즈 완료!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4 p-6 bg-card rounded-lg shadow-sm border">
            <div className="text-6xl font-bold text-primary">
              {score} / {totalQuestions}
            </div>
            <div className="text-2xl font-semibold">정답률: {percentage}%</div>
            <div className={`text-xl font-semibold ${performance.color}`}>
              {performance.text}
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answer.correct
                    ? "bg-green-500/10 border-green-500/50"
                    : "bg-destructive/10 border-destructive/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold">Q{index + 1}.</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {getSubjectLabel(answer.question.type)}
                      </span>
                      <span
                        className={`font-semibold ${
                          answer.correct ? "text-green-600" : "text-destructive"
                        }`}
                      >
                        {answer.correct ? "✓ 정답" : "✗ 오답"}
                      </span>
                    </div>

                    {answer.question.type === "flag" &&
                      answer.question.flagCode && (
                        <img
                          src={`https://flagcdn.com/w80/${answer.question.flagCode.toLowerCase()}.png`}
                          alt="flag"
                          className="w-20 h-auto mb-2 rounded shadow object-contain"
                        />
                      )}

                    <p className="font-semibold mb-1">
                      {answer.question.question}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      내 답변:{" "}
                      <span className="font-medium text-foreground">
                        {answer.userAnswer || "(무응답)"}
                      </span>
                    </p>
                    {!answer.correct && (
                      <p className="text-sm text-green-600">
                        정답:{" "}
                        <span className="font-bold">
                          {answer.question.answer}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={onReset} className="w-full" size="lg">
            다시 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
