
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock quiz data
const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Number", "Boolean", "Float", "String"],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "Which method is used to remove the last element from an array in JavaScript?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 3,
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: ["The window object", "The current function", "The object the function is a method of", "All of the above depending on context"],
    correctAnswer: 3,
    difficulty: 'hard'
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const { toast } = useToast();
  
  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizData.length) * 100;
  
  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
  };
  
  const handleNextQuestion = () => {
    if (selectedOptionIndex === null) {
      toast({
        title: "Selection required",
        description: "Please select an answer before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, isCorrect]);
    
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsQuizComplete(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsQuizComplete(false);
    setAnswers([]);
  };
  
  return (
    <div className="container mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Adaptive Quiz System</h2>
        <p className="text-white/70">Test your knowledge with our adaptive questions</p>
      </div>
      
      {!isQuizComplete ? (
        <>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">Question {currentQuestionIndex + 1} of {quizData.length}</span>
            <Badge className={`
              ${currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                'bg-red-500/20 text-red-400 border-red-500/50'}
              border
            `}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-1 bg-white/10" indicatorClassName="bg-neo-blue" />
          
          <Card className="neo-card">
            <CardHeader>
              <CardTitle className="text-white text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start text-left py-6 border ${
                    selectedOptionIndex === index ? 
                      'border-neo-purple bg-neo-purple/10' : 
                      'border-white/10 bg-white/5'
                  } hover:bg-white/10 hover:border-white/20`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                    selectedOptionIndex === index ? 
                      'bg-neo-purple' : 
                      'bg-white/10'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </Button>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleNextQuestion} 
                className="w-full bg-neo-blue hover:bg-neo-blue/80"
              >
                {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white text-xl text-center">Quiz Complete!</CardTitle>
            <CardDescription className="text-white/70 text-center">
              You scored {score} out of {quizData.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-6 text-center">
              <div className="text-6xl font-bold mb-6">
                <span className={`text-gradient ${
                  score / quizData.length >= 0.7 ? 'text-neo-green' : 
                  score / quizData.length >= 0.4 ? 'text-yellow-400' : 
                  'text-red-400'
                }`}>
                  {Math.round((score / quizData.length) * 100)}%
                </span>
              </div>
              
              <div className="space-y-4 text-left">
                {quizData.map((question, index) => (
                  <div key={question.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      answers[index] ? 'bg-neo-green/20 text-neo-green' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {answers[index] ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90">Question {index + 1}: {question.question}</p>
                      <p className="text-white/50 text-sm">
                        {answers[index] ? 
                          'Correct' : 
                          `Correct answer: ${question.options[question.correctAnswer]}`
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleRestartQuiz} 
              className="w-full bg-neo-blue hover:bg-neo-blue/80"
            >
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Quiz;
