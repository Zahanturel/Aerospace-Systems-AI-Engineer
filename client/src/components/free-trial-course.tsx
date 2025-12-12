import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Lock, 
  CheckCircle2, 
  ChevronRight,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  BookOpen,
  Puzzle,
  Code,
  HelpCircle,
  Layers
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { freeTrialLessons } from "@/lib/course-data";
import type { Lesson, FlashcardContent, QuizContent, PuzzleContent, ExplainerContent, CodeContent } from "@shared/schema";

interface FreeTrialCourseProps {
  onComplete: (lessonId: number) => void;
  completedLessons: number[];
}

export function FreeTrialCourse({ onComplete, completedLessons }: FreeTrialCourseProps) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const totalLessons = freeTrialLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = (completedCount / totalLessons) * 100;

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "flashcard": return <Layers className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "puzzle": return <Puzzle className="w-4 h-4" />;
      case "explainer": return <BookOpen className="w-4 h-4" />;
      case "code": return <Code className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      setActiveLesson(lesson);
    }
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
    setIsAudioPlaying(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-card" id="free-trial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Free Trial
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Experience the Learning
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Try 5 interactive lessons for free. Flashcards, puzzles, quizzes, and real code - 
            see how we make complex aerospace concepts easy to understand.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>{completedCount} of {totalLessons} lessons completed</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {freeTrialLessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = lesson.isLocked;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isLocked 
                      ? "opacity-50" 
                      : "hover-elevate"
                  } ${isCompleted ? "border-green-500/30 bg-green-500/5" : ""}`}
                  onClick={() => handleLessonClick(lesson)}
                  data-testid={`card-lesson-${lesson.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`p-2 rounded-lg ${
                        isCompleted 
                          ? "bg-green-500/20" 
                          : isLocked 
                          ? "bg-muted" 
                          : "bg-primary/10"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <span className="text-primary">{getLessonIcon(lesson.type)}</span>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {lesson.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-foreground mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {lesson.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className="capitalize text-xs"
                      >
                        {lesson.type}
                      </Badge>
                      {!isLocked && !isCompleted && (
                        <Button variant="ghost" size="sm" className="text-primary">
                          Start <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {activeLesson && (
            <LessonModal
              lesson={activeLesson}
              isCompleted={completedLessons.includes(activeLesson.id)}
              isAudioPlaying={isAudioPlaying}
              setIsAudioPlaying={setIsAudioPlaying}
              onClose={handleCloseLesson}
              onComplete={() => {
                onComplete(activeLesson.id);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface LessonModalProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  onClose: () => void;
  onComplete: () => void;
}

function LessonModal({ 
  lesson, 
  isCompleted,
  isAudioPlaying, 
  setIsAudioPlaying, 
  onClose, 
  onComplete 
}: LessonModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-background rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {lesson.type}
            </Badge>
            <h3 className="font-semibold text-white">{lesson.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {lesson.type === "explainer" && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                data-testid="button-toggle-audio"
              >
                {isAudioPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white"
              onClick={onClose}
              data-testid="button-close-lesson"
            >
              Close
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <LessonContent 
            lesson={lesson} 
            isCompleted={isCompleted}
            onComplete={onComplete} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

function LessonContent({ lesson, isCompleted, onComplete }: LessonContentProps) {
  switch (lesson.type) {
    case "explainer":
      return <ExplainerLesson content={lesson.content as ExplainerContent} isCompleted={isCompleted} onComplete={onComplete} />;
    case "flashcard":
      return <FlashcardLesson content={lesson.content as FlashcardContent} isCompleted={isCompleted} onComplete={onComplete} />;
    case "quiz":
      return <QuizLesson content={lesson.content as QuizContent} isCompleted={isCompleted} onComplete={onComplete} />;
    case "puzzle":
      return <PuzzleLesson content={lesson.content as PuzzleContent} isCompleted={isCompleted} onComplete={onComplete} />;
    case "code":
      return <CodeLesson content={lesson.content as CodeContent} isCompleted={isCompleted} onComplete={onComplete} />;
    default:
      return <div>Unknown lesson type</div>;
  }
}

function ExplainerLesson({ content, isCompleted, onComplete }: { content: ExplainerContent; isCompleted: boolean; onComplete: () => void }) {
  return (
    <div className="space-y-6">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-foreground leading-relaxed">{content.text}</p>
      </div>
      
      {content.audioText && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Audio Narration</p>
                <p className="text-sm text-muted-foreground">{content.audioText}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        {isCompleted ? (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        ) : (
          <Button onClick={onComplete} data-testid="button-complete-lesson">
            Mark as Complete <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function FlashcardLesson({ content, isCompleted, onComplete }: { content: FlashcardContent; isCompleted: boolean; onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<number>>(new Set());

  const currentCard = content.cards[currentIndex];
  const allViewed = viewedCards.size === content.cards.length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setViewedCards(prev => new Set(prev).add(currentIndex));
    }
  };

  const handleNext = () => {
    if (currentIndex < content.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {content.cards.length}
        </span>
        <Progress value={((currentIndex + 1) / content.cards.length) * 100} className="w-32 h-2" />
      </div>

      <div 
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={handleFlip}
        data-testid="flashcard-container"
      >
        <motion.div
          className="w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div 
            className="absolute inset-0 rounded-xl border-2 flex items-center justify-center p-6 text-center bg-card backface-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              borderColor: "hsl(var(--primary) / 0.3)"
            }}
          >
            <div>
              <p className="text-lg font-medium text-foreground">{currentCard.front}</p>
              <p className="text-sm text-muted-foreground mt-4">Click to reveal answer</p>
            </div>
          </div>
          
          <div 
            className="absolute inset-0 bg-primary rounded-xl flex items-center justify-center p-6 text-center backface-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div>
              <p className="text-lg font-medium text-primary-foreground">{currentCard.back}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          data-testid="button-prev-card"
        >
          Previous
        </Button>
        
        {currentIndex === content.cards.length - 1 ? (
          isCompleted ? (
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Completed
            </Badge>
          ) : (
            <Button 
              onClick={onComplete} 
              disabled={!allViewed}
              data-testid="button-complete-flashcards"
            >
              Complete <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )
        ) : (
          <Button onClick={handleNext} data-testid="button-next-card">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

function QuizLesson({ content, isCompleted, onComplete }: { content: QuizContent; isCompleted: boolean; onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = content.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctIndex) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < content.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const score = Math.round((correctAnswers / content.questions.length) * 100);
    return (
      <div className="text-center space-y-6">
        <div className="p-8 bg-card rounded-xl border">
          <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
          <p className="text-4xl font-bold text-primary mb-4">{score}%</p>
          <p className="text-muted-foreground">
            You got {correctAnswers} out of {content.questions.length} questions correct
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          {!isCompleted && (
            <Button onClick={onComplete} data-testid="button-complete-quiz">
              Complete <CheckCircle2 className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {content.questions.length}
        </span>
        <Progress value={((currentQuestion + 1) / content.questions.length) * 100} className="w-32 h-2" />
      </div>

      <div className="p-6 bg-card rounded-xl border">
        <h3 className="text-lg font-semibold text-foreground mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
            
            if (selectedAnswer !== null) {
              if (index === question.correctIndex) {
                buttonClass += "border-green-500 bg-green-500/10 text-foreground";
              } else if (index === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-500/10 text-foreground";
              } else {
                buttonClass += "border-border bg-background text-muted-foreground";
              }
            } else {
              buttonClass += "border-border bg-background hover-elevate text-foreground";
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleSelectAnswer(index)}
                disabled={selectedAnswer !== null}
                data-testid={`button-answer-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                    selectedAnswer === index 
                      ? index === question.correctIndex 
                        ? "border-green-500 bg-green-500 text-white" 
                        : "border-red-500 bg-red-500 text-white"
                      : index === question.correctIndex && selectedAnswer !== null
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-border"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-4 rounded-lg border ${
              isCorrect 
                ? "bg-green-500/10 border-green-500/30" 
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <p className={`font-semibold mb-1 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {isCorrect ? "Correct!" : "Not quite right"}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedAnswer !== null && (
        <div className="flex justify-end">
          <Button onClick={handleNext} data-testid="button-next-question">
            {currentQuestion === content.questions.length - 1 ? "See Results" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

function PuzzleLesson({ content, isCompleted, onComplete }: { content: PuzzleContent; isCompleted: boolean; onComplete: () => void }) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const allMatched = Object.keys(matches).length === content.items.length;
  const allCorrect = content.items.every(item => matches[item.left] === item.right);

  const handleLeftClick = (left: string) => {
    if (matches[left]) return;
    setSelectedLeft(selectedLeft === left ? null : left);
  };

  const handleRightClick = (right: string) => {
    if (!selectedLeft) return;
    if (Object.values(matches).includes(right)) return;
    
    setMatches(prev => ({ ...prev, [selectedLeft]: right }));
    setSelectedLeft(null);

    if (Object.keys(matches).length + 1 === content.items.length) {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
    setIsComplete(false);
  };

  const getMatchColor = (left: string) => {
    if (!matches[left]) return "";
    const correctRight = content.items.find(i => i.left === left)?.right;
    return matches[left] === correctRight 
      ? "border-green-500 bg-green-500/10" 
      : "border-red-500 bg-red-500/10";
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">{content.instruction}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-2">AI Technique</p>
          {content.items.map((item, index) => (
            <button
              key={index}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                matches[item.left]
                  ? getMatchColor(item.left)
                  : selectedLeft === item.left
                  ? "border-primary bg-primary/10"
                  : "border-border hover-elevate"
              }`}
              onClick={() => handleLeftClick(item.left)}
              disabled={!!matches[item.left]}
              data-testid={`button-left-${index}`}
            >
              <span className="text-foreground font-medium">{item.left}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-2">Application</p>
          {content.items.map((item, index) => {
            const isMatched = Object.values(matches).includes(item.right);
            return (
              <button
                key={index}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  isMatched
                    ? "border-muted bg-muted/50 text-muted-foreground"
                    : selectedLeft
                    ? "border-primary/50 hover-elevate"
                    : "border-border"
                }`}
                onClick={() => handleRightClick(item.right)}
                disabled={isMatched || !selectedLeft}
                data-testid={`button-right-${index}`}
              >
                <span className={isMatched ? "text-muted-foreground" : "text-foreground"}>{item.right}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border text-center ${
            allCorrect 
              ? "bg-green-500/10 border-green-500/30" 
              : "bg-yellow-500/10 border-yellow-500/30"
          }`}
        >
          <p className="font-semibold mb-1">
            {allCorrect ? "Perfect Match!" : "Good try! Some matches are incorrect."}
          </p>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        {isCompleted ? (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        ) : allMatched && (
          <Button onClick={onComplete} data-testid="button-complete-puzzle">
            Complete <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function CodeLesson({ content, isCompleted, onComplete }: { content: CodeContent; isCompleted: boolean; onComplete: () => void }) {
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-mono">
            {content.language}
          </Badge>
        </div>
        
        <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-6 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed">
          <code>{content.code}</code>
        </pre>
      </div>

      {content.runnable && (
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowOutput(!showOutput)}
            variant="outline"
            data-testid="button-run-code"
          >
            <Play className="w-4 h-4 mr-2" />
            {showOutput ? "Hide Output" : "Run Code"}
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-zinc-800 text-green-400 p-4 rounded-lg font-mono text-sm"
          >
            <p className="text-zinc-500 mb-1">&gt; Output:</p>
            <p>Thrust adjustment: 36.50</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-2">What's happening here?</h4>
          <p className="text-sm text-muted-foreground">{content.explanation}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        {isCompleted ? (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        ) : (
          <Button onClick={onComplete} data-testid="button-complete-code">
            Mark as Complete <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
