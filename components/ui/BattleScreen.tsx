'use client';

import { useState, useEffect } from 'react';

interface BattleScreenProps {
  playerStats: {
    level: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    username: string;
  };
  enemy: {
    name: string;
    health: number;
    maxHealth: number;
    level: number;
    emoji: string;
  };
  question: {
    question: string;
    codeBlock?: string;
    choices: string[];
    correctAnswer: number;
    explanation?: string;
  };
  onAnswer: (isCorrect: boolean) => void;
  onBattleComplete: (won: boolean) => void;
}

export function BattleScreen({
  playerStats,
  enemy,
  question,
  onAnswer,
  onBattleComplete,
}: BattleScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(playerStats.health);
  const [enemyHealth, setEnemyHealth] = useState(enemy.health);
  const [playerMana, setPlayerMana] = useState(playerStats.mana);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const handleSelect = (index: number) => {
    if (showFeedback || !isPlayerTurn) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !isPlayerTurn) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      // Player attacks enemy
      const damage = Math.floor(Math.random() * 20) + 10;
      const newEnemyHealth = Math.max(0, enemyHealth - damage);
      setEnemyHealth(newEnemyHealth);
      setBattleLog([...battleLog, `${playerStats.username} dealt ${damage} damage!`]);
      
      // Gain mana
      setPlayerMana(Math.min(playerStats.maxMana, playerMana + 5));
      
      if (newEnemyHealth === 0) {
        setTimeout(() => {
          onBattleComplete(true);
        }, 1500);
      } else {
        // Enemy's turn
        setTimeout(() => {
          enemyAttack();
        }, 2000);
      }
    } else {
      // Enemy attacks player
      setTimeout(() => {
        enemyAttack();
      }, 1500);
    }
    
    onAnswer(correct);
  };

  const enemyAttack = () => {
    const damage = Math.floor(Math.random() * 15) + 5;
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    setPlayerHealth(newPlayerHealth);
    setBattleLog([...battleLog, `${enemy.name} dealt ${damage} damage!`]);
    setIsPlayerTurn(true);
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (newPlayerHealth === 0) {
      setTimeout(() => {
        onBattleComplete(false);
      }, 1500);
    }
  };

  const playerHealthPercentage = (playerHealth / playerStats.maxHealth) * 100;
  const enemyHealthPercentage = (enemyHealth / enemy.maxHealth) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 z-50 flex items-center justify-center p-4">
      {/* Battle Arena */}
      <div className="w-full max-w-6xl">
        {/* Enemy Side (Right) */}
        <div className="flex justify-end mb-8">
          <div className="bg-white/95 rounded-2xl shadow-2xl border-4 border-red-300 p-6 max-w-md">
            <div className="text-center mb-4">
              <div className="text-8xl mb-2">{enemy.emoji}</div>
              <h2 className="text-2xl font-bold text-gray-800">{enemy.name}</h2>
              <p className="text-gray-600">Level {enemy.level}</p>
            </div>
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden border-2 border-gray-400">
              <div 
                className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
                style={{ width: `${enemyHealthPercentage}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm font-bold text-red-600">
              {enemyHealth} / {enemy.maxHealth} HP
            </div>
          </div>
        </div>

        {/* Question Card (Center) */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{question.question}</h3>
            {question.codeBlock && (
              <div className="bg-gray-900 rounded-xl p-4 mb-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono">
                  <code>{question.codeBlock}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Choices */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {question.choices.map((choice, index) => {
              let buttonClass = "p-4 rounded-xl font-semibold text-lg transition-all duration-200 border-4 ";
              
              if (showFeedback) {
                if (index === question.correctAnswer) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (index === selectedAnswer && !isCorrect) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "bg-blue-100 border-blue-500 text-blue-800 scale-105";
                } else {
                  buttonClass += "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={buttonClass}
                  disabled={showFeedback || !isPlayerTurn}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                <span className={`font-bold text-xl ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct! You attack!' : 'Incorrect! Enemy attacks!'}
                </span>
              </div>
              {question.explanation && (
                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {question.explanation}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!showFeedback && isPlayerTurn && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl border-4 border-white/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
            >
              Attack!
            </button>
          )}

          {!isPlayerTurn && (
            <div className="text-center py-4">
              <p className="text-xl font-bold text-gray-600">Enemy's turn...</p>
            </div>
          )}
        </div>

        {/* Player Side (Left) */}
        <div className="flex justify-start">
          <div className="bg-white/95 rounded-2xl shadow-2xl border-4 border-blue-300 p-6 max-w-md">
            <div className="text-center mb-4">
              <div className="text-8xl mb-2">🧙</div>
              <h2 className="text-2xl font-bold text-gray-800">{playerStats.username}</h2>
              <p className="text-gray-600">Level {playerStats.level}</p>
            </div>
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden border-2 border-gray-400 mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                style={{ width: `${playerHealthPercentage}%` }}
              />
            </div>
            <div className="text-center mb-2 text-sm font-bold text-blue-600">
              {playerHealth} / {playerStats.maxHealth} HP
            </div>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-400">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                style={{ width: `${(playerMana / playerStats.maxMana) * 100}%` }}
              />
            </div>
            <div className="text-center mt-1 text-xs font-bold text-purple-600">
              {playerMana} / {playerStats.maxMana} Mana
            </div>
          </div>
        </div>

        {/* Battle Log */}
        {battleLog.length > 0 && (
          <div className="mt-4 bg-black/50 rounded-xl p-4 max-h-32 overflow-y-auto">
            {battleLog.map((log, index) => (
              <div key={index} className="text-white text-sm mb-1">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

