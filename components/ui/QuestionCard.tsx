'use client';

import { useState } from 'react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  codeBlock?: string;
  choices: string[];
  correctAnswer: number;
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  codeBlock,
  choices,
  correctAnswer,
  explanation,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    onAnswer(correct);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{question}</h2>
        
        {codeBlock && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono">
              <code>{codeBlock}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="space-y-3 mb-6">
        {choices.map((choice, index) => {
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-semibold ";
          
          if (showFeedback) {
            if (index === correctAnswer) {
              buttonClass += "bg-green-100 border-green-500 text-green-800";
            } else if (index === selectedAnswer && !isCorrect) {
              buttonClass += "bg-red-100 border-red-500 text-red-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
            }
          } else {
            if (selectedAnswer === index) {
              buttonClass += "bg-purple-100 border-purple-500 text-purple-800";
            } else {
              buttonClass += "bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:bg-purple-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={buttonClass}
              disabled={showFeedback}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
              {choice}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`mb-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
            <span className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {explanation && (
            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {explanation}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {questionNumber < totalQuestions ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
}

