'use client';

import { useEffect, useState } from 'react';
import { GameHUD } from '@/src/ui/components/GameHUD';
import { BattleScreen } from '@/components/ui/BattleScreen';
import { Menu } from '@/src/ui/components/Menu';
import { GameState, loadGameState, saveGameState, createInitialState, getDefaultState } from '@/lib/gameState';
import { getRandomQuestion } from '@/lib/questions';
import { achievements } from '@/lib/achievements';
import { getPetBonus } from '@/lib/pets';
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
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Load game state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = loadGameState();
      if (savedState) {
        setGameState(savedState);
      } else {
        // Create new game state from localStorage or defaults
        const username = localStorage.getItem('username') || 'Player';
        const character = localStorage.getItem('character') || 'wizard';
        const newState = createInitialState(username, character);
        setGameState(newState);
        saveGameState(newState);
      }
    }
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);

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

  // Keyboard shortcuts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Don't trigger if battle or menu is open
      if (showBattle || showMenu) {
        return;
      }
      
      const key = event.key.toLowerCase();
      
      switch (key) {
        case 'b':
        case ' ': // Spacebar
          event.preventDefault();
          // Select random enemy
          const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
          setCurrentEnemy(randomEnemy);
          // Select random question
          const randomQuestion = getRandomQuestion();
          setCurrentQuestion({
            question: randomQuestion.question,
            codeBlock: randomQuestion.codeBlock,
            choices: randomQuestion.choices || [],
            correctAnswer: typeof randomQuestion.correctAnswer === 'number' ? randomQuestion.correctAnswer : 0,
            explanation: randomQuestion.explanation,
          });
          setShowBattle(true);
          break;
        case 's':
          event.preventDefault();
          window.location.href = '/shop';
          break;
        case 'i':
          event.preventDefault();
          window.location.href = '/inventory';
          break;
        case 'm':
          event.preventDefault();
          setShowMenu(true);
          break;
        case 'p':
        case 'n': // Map shortcut
          event.preventDefault();
          window.location.href = '/map';
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showBattle, showMenu]);

  if (!gameState) {
    return (
      <div className="app-container flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const handleStartBattle = () => {
    // Select random enemy
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    setCurrentEnemy(randomEnemy);
    // Select random question from new question bank
    const randomQuestion = getRandomQuestion();
    // Convert to battle format
    setCurrentQuestion({
      question: randomQuestion.question,
      codeBlock: randomQuestion.codeBlock,
      choices: randomQuestion.choices || [],
      correctAnswer: typeof randomQuestion.correctAnswer === 'number' ? randomQuestion.correctAnswer : 0,
      explanation: randomQuestion.explanation,
    });
    setShowBattle(true);
  };

  const checkAchievements = (state: GameState): GameState => {
    const newAchievements = [...state.achievements];
    
    achievements.forEach(achievement => {
      if (newAchievements.includes(achievement.id)) return;
      
      let unlocked = false;
      switch (achievement.requirement.type) {
        case 'level':
          unlocked = state.playerStats.level >= achievement.requirement.value;
          break;
        case 'battles_won':
          unlocked = state.stats.battlesWon >= achievement.requirement.value;
          break;
        case 'questions_correct':
          unlocked = state.stats.questionsCorrect >= achievement.requirement.value;
          break;
        case 'coins_earned':
          unlocked = state.stats.coinsEarned >= achievement.requirement.value;
          break;
        case 'quests_completed':
          unlocked = state.completedQuests.length >= achievement.requirement.value;
          break;
        case 'items_collected':
          unlocked = state.stats.itemsCollected >= achievement.requirement.value;
          break;
      }
      
      if (unlocked && !newAchievements.includes(achievement.id)) {
        newAchievements.push(achievement.id);
        if (achievement.reward) {
          state.playerStats.coins += achievement.reward.coins || 0;
          state.playerStats.experience += achievement.reward.experience || 0;
        }
        alert(`🏆 Achievement Unlocked: ${achievement.name}!`);
      }
    });
    
    return { ...state, achievements: newAchievements };
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      // Gain XP and coins on correct answer
      setGameState(prev => {
        if (!prev) return prev;
        const newState = {
          ...prev,
          playerStats: {
            ...prev.playerStats,
            experience: prev.playerStats.experience + 50,
            coins: prev.playerStats.coins + 10,
          },
          stats: {
            ...prev.stats,
            questionsCorrect: prev.stats.questionsCorrect + 1,
            coinsEarned: prev.stats.coinsEarned + 10,
          },
        };
        return checkAchievements(newState);
      });
    }
  };

  const handleBattleComplete = (won: boolean) => {
    setShowBattle(false);
    if (won) {
      // Reward player
      setGameState(prev => {
        if (!prev) return prev;
        const newXP = prev.playerStats.experience + 100;
        const newLevel = newXP >= 1000 ? prev.playerStats.level + 1 : prev.playerStats.level;
        
        const newState = {
          ...prev,
          playerStats: {
            ...prev.playerStats,
            experience: newXP,
            coins: prev.playerStats.coins + 25,
            level: newLevel,
            // Level up bonus
            maxHealth: newLevel > prev.playerStats.level ? prev.playerStats.maxHealth + 20 : prev.playerStats.maxHealth,
            maxMana: newLevel > prev.playerStats.level ? prev.playerStats.maxMana + 10 : prev.playerStats.maxMana,
            health: newLevel > prev.playerStats.level ? prev.playerStats.maxHealth + 20 : prev.playerStats.health,
            mana: newLevel > prev.playerStats.level ? prev.playerStats.maxMana + 10 : prev.playerStats.mana,
          },
          stats: {
            ...prev.stats,
            battlesWon: prev.stats.battlesWon + 1,
            coinsEarned: prev.stats.coinsEarned + 25,
          },
        };
        return checkAchievements(newState);
      });
      alert('Victory! You earned 100 XP and 25 coins!');
    } else {
      alert('Defeat! Try again!');
      // Reset health
      setGameState(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          playerStats: {
            ...prev.playerStats,
            health: prev.playerStats.maxHealth,
          },
        };
      });
    }
  };

  return (
    <div className="app-container">
      {/* Phaser game canvas container */}
      <div id="game-container"></div>

      {/* React UI Overlays */}
      {!showBattle && (
        <GameHUD
          playerStats={gameState.playerStats}
          onMenuClick={() => setShowMenu(true)}
          onChallengeClick={handleStartBattle}
        />
      )}

      {/* Battle Screen */}
      {showBattle && (
        <BattleScreen
          playerStats={gameState.playerStats}
          playerAttack={(gameState.equipped.weapon?.stats?.attack || 0) + (gameState.activePet ? getPetBonus(gameState.activePet).attack : 0)}
          playerDefense={(gameState.equipped.armor?.stats?.defense || 0) + (gameState.activePet ? getPetBonus(gameState.activePet).defense : 0)}
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
          playerStats={gameState.playerStats}
        />
      )}
    </div>
  );
}
