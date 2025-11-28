"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Difficulty, SubjectType } from "@/types/quiz";

type QuestionCount = 10 | 20 | 25 | 50;

type DifficultySelectProps = {
  difficulty: Difficulty;
  selectedSubjects: SubjectType[];
  allSubjects: SubjectType[];
  questionCount: QuestionCount;
  questionCountOptions: readonly QuestionCount[];
  onDifficultyChange: (difficulty: Difficulty) => void;
  onToggleSubject: (subject: SubjectType) => void;
  onQuestionCountChange: (count: QuestionCount) => void;
  onStart: () => void;
  getSubjectLabel: (type: SubjectType) => string;
};

export function DifficultySelect({
  difficulty,
  selectedSubjects,
  allSubjects,
  questionCount,
  questionCountOptions,
  onDifficultyChange,
  onToggleSubject,
  onQuestionCountChange,
  onStart,
  getSubjectLabel,
}: DifficultySelectProps) {
  const canStart = selectedSubjects.length > 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            종합 퀴즈
          </CardTitle>
          <CardDescription className="text-center">
            원하는 주제를 선택하고 테스트하세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-lg font-semibold mb-3 block">
              주제 선택:
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {allSubjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors border"
                >
                  <Checkbox
                    id={subject}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => onToggleSubject(subject)}
                    disabled={
                      selectedSubjects.length === 1 &&
                      selectedSubjects.includes(subject)
                    }
                  />
                  <Label
                    htmlFor={subject}
                    className="flex-1 cursor-pointer text-sm font-medium"
                  >
                    {getSubjectLabel(subject)}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * 최소 1개 이상의 주제를 선택해야 합니다.
            </p>
          </div>

          <div>
            <Label className="text-lg font-semibold mb-3 block">
              문제 수:
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {questionCountOptions.map((count) => (
                <Button
                  key={count}
                  variant={questionCount === count ? "default" : "outline"}
                  onClick={() => onQuestionCountChange(count)}
                  className="w-full"
                >
                  {count}문제
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold mb-3 block">
              난이도 선택:
            </Label>
            <RadioGroup
              value={difficulty}
              onValueChange={(value) => onDifficultyChange(value as Difficulty)}
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy" className="flex-1 cursor-pointer">
                  <div className="font-semibold">쉬움</div>
                  <div className="text-sm text-muted-foreground">
                    기본 수준의 문제
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="flex-1 cursor-pointer">
                  <div className="font-semibold">보통</div>
                  <div className="text-sm text-muted-foreground">
                    중간 난이도의 문제
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard" className="flex-1 cursor-pointer">
                  <div className="font-semibold">어려움</div>
                  <div className="text-sm text-muted-foreground">
                    어려운 난이도의 문제
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={onStart}
            className="w-full"
            size="lg"
            disabled={!canStart}
          >
            퀴즈 시작 ({questionCount}문제)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
