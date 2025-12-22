'use client';

import { useEffect, useState } from 'react';
import { GameHUD } from '@/src/ui/components/GameHUD';
import { BattleScreen } from '@/components/ui/BattleScreen';
import { Menu } from '@/src/ui/components/Menu';
import '@/src/App.css';

// Mock enemies
const enemies = [
  { name: 'Bug Monster', emoji: '🐛', level: 1, health: 50, maxHealth: 50 },
  { name: 'Syntax Error', emoji: '👾', level: 2, health: 75, maxHealth: 75 },
  { name: 'Logic Bug', emoji: '🤖', level: 3, health: 100, maxHealth: 100 },
  { name: 'Code Demon', emoji: '😈', level: 4, health: 150, maxHealth: 150 },
];

// Mock questions for battles
const battleQuestions = [
  {
    question: 'What is the output of: print(2 + 3 * 4)',
    choices: ['20', '14', '24', 'Error'],
    correctAnswer: 1,
    explanation: 'Order of operations: multiplication (3*4=12) happens before addition (2+12=14)',
  },
  {
    question: 'What does this code print?',
    codeBlock: `x = "Hello"
y = "World"
print(x + " " + y)`,
    choices: ['HelloWorld', 'Hello World', 'Hello + World', 'Error'],
    correctAnswer: 1,
    explanation: 'String concatenation with + operator combines strings. Adding a space " " creates "Hello World"',
  },
  {
    question: 'What is the result of: len([1, 2, 3, 4, 5])',
    choices: ['5', '15', '4', 'Error'],
    correctAnswer: 0,
    explanation: 'The len() function returns the number of items in a list. This list has 5 items.',
  },
  {
    question: 'What will this code output?',
    codeBlock: `for i in range(3):
    print(i)`,
    choices: ['0, 1, 2', '1, 2, 3', '3', 'Error'],
    correctAnswer: 0,
    explanation: 'range(3) generates numbers from 0 to 2 (exclusive of 3), so it prints 0, 1, 2',
  },
];

export default function GamePage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showBattle, setShowBattle] = useState(false);
  const [currentEnemy, setCurrentEnemy] = useState(enemies[0]);
  const [currentQuestion, setCurrentQuestion] = useState(battleQuestions[0]);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    username: 'Player',
    coins: 150,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
  });

  // Load character data from localStorage
  useEffect(() => {
    const username = localStorage.getItem('username');
    const character = localStorage.getItem('character');
    if (username) {
      setPlayerStats(prev => ({ ...prev, username }));
    }
  }, []);

  // Initialize Phaser game when component mounts (client-side only)
  useEffect(() => {
    // Dynamically import Phaser only on client side
    import('@/src/phaser-init').then((module) => {
      module.initPhaserGame();
    });

    // Cleanup on unmount
    return () => {
      // Cleanup Phaser game if needed
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        gameContainer.innerHTML = '';
      }
    };
  }, []);

  const handleStartBattle = () => {
    // Select random enemy
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    setCurrentEnemy(randomEnemy);
    // Select random question
    const randomQuestion = battleQuestions[Math.floor(Math.random() * battleQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setShowBattle(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      // Gain XP and coins on correct answer
      setPlayerStats(prev => ({
        ...prev,
        experience: prev.experience + 50,
        coins: prev.coins + 10,
      }));
    }
  };

  const handleBattleComplete = (won: boolean) => {
    setShowBattle(false);
    if (won) {
      // Reward player
      setPlayerStats(prev => ({
        ...prev,
        experience: prev.experience + 100,
        coins: prev.coins + 25,
        // Level up check
        level: prev.experience + 100 >= 1000 ? prev.level + 1 : prev.level,
      }));
      alert('Victory! You earned 100 XP and 25 coins!');
    } else {
      alert('Defeat! Try again!');
      // Reset health
      setPlayerStats(prev => ({
        ...prev,
        health: prev.maxHealth,
      }));
    }
  };

  return (
    <div className="app-container">
      {/* Phaser game canvas container */}
      <div id="game-container"></div>

      {/* React UI Overlays */}
      {!showBattle && (
        <GameHUD
          playerStats={playerStats}
          onMenuClick={() => setShowMenu(true)}
          onChallengeClick={handleStartBattle}
        />
      )}

      {/* Battle Screen */}
      {showBattle && (
        <BattleScreen
          playerStats={playerStats}
          enemy={currentEnemy}
          question={currentQuestion}
          onAnswer={handleAnswer}
          onBattleComplete={handleBattleComplete}
        />
      )}

      {/* Menu */}
      {showMenu && (
        <Menu
          onClose={() => setShowMenu(false)}
          playerStats={playerStats}
        />
      )}
    </div>
  );
}
