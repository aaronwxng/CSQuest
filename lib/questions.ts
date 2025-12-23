// Extended question types for battles

export interface Question {
  id: string;
  type: 'multiple-choice' | 'code-execution' | 'fill-blank' | 'trace';
  question: string;
  codeBlock?: string;
  choices?: string[];
  correctAnswer?: number | string;
  explanation?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  topic: string;
}

export const questionBank: Question[] = [
  // Multiple Choice
  {
    id: 'mc-1',
    type: 'multiple-choice',
    question: 'What is the output of: print(2 + 3 * 4)',
    choices: ['20', '14', '24', 'Error'],
    correctAnswer: 1,
    explanation: 'Order of operations: multiplication (3*4=12) happens before addition (2+12=14)',
    difficulty: 1,
    topic: 'Operators',
  },
  {
    id: 'mc-2',
    type: 'multiple-choice',
    question: 'What does this code print?',
    codeBlock: `x = "Hello"
y = "World"
print(x + " " + y)`,
    choices: ['HelloWorld', 'Hello World', 'Hello + World', 'Error'],
    correctAnswer: 1,
    explanation: 'String concatenation with + operator combines strings.',
    difficulty: 1,
    topic: 'Strings',
  },
  {
    id: 'mc-3',
    type: 'multiple-choice',
    question: 'What is the result of: len([1, 2, 3, 4, 5])',
    choices: ['5', '15', '4', 'Error'],
    correctAnswer: 0,
    explanation: 'The len() function returns the number of items in a list.',
    difficulty: 1,
    topic: 'Lists',
  },
  
  // Fill in the Blank
  {
    id: 'fill-1',
    type: 'fill-blank',
    question: 'Complete the code to print "Hello World":',
    codeBlock: `___("Hello World")`,
    correctAnswer: 'print',
    explanation: 'The print() function is used to display output in Python.',
    difficulty: 1,
    topic: 'Basics',
  },
  {
    id: 'fill-2',
    type: 'fill-blank',
    question: 'Complete the code to create a list:',
    codeBlock: `numbers = [1, 2, 3, ___]`,
    correctAnswer: '4',
    explanation: 'Lists can contain multiple values separated by commas.',
    difficulty: 1,
    topic: 'Lists',
  },
  
  // Trace (What does this code do?)
  {
    id: 'trace-1',
    type: 'trace',
    question: 'What will this code output?',
    codeBlock: `for i in range(3):
    print(i)`,
    choices: ['0, 1, 2', '1, 2, 3', '3', 'Error'],
    correctAnswer: 0,
    explanation: 'range(3) generates numbers from 0 to 2 (exclusive of 3).',
    difficulty: 2,
    topic: 'Loops',
  },
  {
    id: 'trace-2',
    type: 'trace',
    question: 'What is the final value of x?',
    codeBlock: `x = 5
x = x + 3
x = x * 2`,
    choices: ['16', '13', '10', '8'],
    correctAnswer: 0,
    explanation: 'x starts at 5, becomes 8 (5+3), then 16 (8*2).',
    difficulty: 2,
    topic: 'Variables',
  },
  
  // Code Execution (simplified - would need actual Python execution in production)
  {
    id: 'exec-1',
    type: 'code-execution',
    question: 'What does this function return when called with add(3, 4)?',
    codeBlock: `def add(a, b):
    return a + b`,
    choices: ['7', '3', '4', 'Error'],
    correctAnswer: 0,
    explanation: 'The function adds the two parameters: 3 + 4 = 7',
    difficulty: 2,
    topic: 'Functions',
  },
];

export function getRandomQuestion(difficulty?: number): Question {
  const filtered = difficulty 
    ? questionBank.filter(q => q.difficulty === difficulty)
    : questionBank;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

