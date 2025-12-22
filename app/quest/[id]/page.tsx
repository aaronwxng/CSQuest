'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HUD } from '@/components/ui/HUD';
import { QuestionCard } from '@/components/ui/QuestionCard';

// Mock question data - in real app, this would come from an API or database
const mockQuestions = {
  'python-basics': [
    {
      question: 'What is the correct way to print "Hello, World!" in Python?',
      codeBlock: null,
      choices: [
        'print("Hello, World!")',
        'echo "Hello, World!"',
        'console.log("Hello, World!")',
        'System.out.println("Hello, World!")',
      ],
      correctAnswer: 0,
      explanation: 'In Python, we use the print() function to display output. The other options are from different programming languages.',
    },
    {
      question: 'What will be the output of this code?',
      codeBlock: `x = 5
y = 3
result = x + y
print(result)`,
      choices: ['8', '53', '5 + 3', 'Error'],
      correctAnswer: 0,
      explanation: 'The code adds x (5) and y (3) together, resulting in 8.',
    },
    {
      question: 'Which of the following is a valid variable name in Python?',
      codeBlock: null,
      choices: ['2variable', 'my-variable', 'my_variable', 'my variable'],
      correctAnswer: 2,
      explanation: 'Variable names in Python can contain letters, numbers, and underscores, but cannot start with a number or contain spaces or hyphens.',
    },
  ],
  'demo': [
    {
      question: 'What is the output of: print(2 ** 3)',
      codeBlock: null,
      choices: ['6', '8', '9', '23'],
      correctAnswer: 1,
      explanation: 'The ** operator is exponentiation. 2 ** 3 means 2 raised to the power of 3, which equals 8.',
    },
    {
      question: 'What does this code print?',
      codeBlock: `name = "Alice"
print(f"Hello, {name}!")`,
      choices: ['Hello, name!', 'Hello, Alice!', 'Hello, {name}!', 'Error'],
      correctAnswer: 1,
      explanation: 'f-strings allow you to embed expressions inside string literals. {name} is replaced with the value of the name variable.',
    },
  ],
};

type Props = {
  params: Promise<{ id: string }>;
};

export default function QuestPage({ params }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [isComplete, setIsComplete] = useState(false);
  const [questId, setQuestId] = useState<string | null>(null);
  const router = useRouter();

  // Handle async params
  useEffect(() => {
    params.then(({ id }) => {
      setQuestId(id);
    });
  }, [params]);

  if (!questId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const questions = mockQuestions[questId as keyof typeof mockQuestions] || mockQuestions.demo;
  const totalQuestions = questions.length;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
      // Navigate to results page - use ref to get current score
      router.push(`/quest/${questId}/results?score=${scoreRef.current}&total=${totalQuestions}`);
    }
  };

  if (isComplete) {
    return null; // Will redirect to results
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <HUD level={3} xp={250} xpToNext={500} coins={150} showBackButton backHref="/town" />
      
      <div className="pt-24 pb-12 px-4">
        <QuestionCard
          questionNumber={currentQuestion + 1}
          totalQuestions={totalQuestions}
          question={question.question}
          codeBlock={question.codeBlock || undefined}
          choices={question.choices}
          correctAnswer={question.correctAnswer}
          explanation={question.explanation}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
