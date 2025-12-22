import { CodingChallenge, TestCase } from '../types/GameTypes';

export class ChallengeManager {
  private challenges: Map<string, CodingChallenge> = new Map();

  constructor() {
    this.initializeDefaultChallenges();
  }

  private initializeDefaultChallenges() {
    // Example challenge: Hello World
    this.addChallenge({
      id: 'challenge-1',
      title: 'Hello, Code!',
      description: 'Write a function that returns "Hello, World!"',
      difficulty: 'easy',
      templateCode: `function hello() {
  // Write your code here
  return "";
}`,
      testCases: [
        {
          input: null,
          expectedOutput: 'Hello, World!',
          description: 'Function should return "Hello, World!"',
        },
      ],
      reward: {
        experience: 100,
      },
    });

    // Example challenge: Sum Two Numbers
    this.addChallenge({
      id: 'challenge-2',
      title: 'Sum Two Numbers',
      description: 'Write a function that takes two numbers and returns their sum',
      difficulty: 'easy',
      templateCode: `function sum(a, b) {
  // Write your code here
  return 0;
}`,
      testCases: [
        {
          input: [2, 3],
          expectedOutput: 5,
          description: 'sum(2, 3) should return 5',
        },
        {
          input: [10, 20],
          expectedOutput: 30,
          description: 'sum(10, 20) should return 30',
        },
      ],
      reward: {
        experience: 150,
      },
    });
  }

  addChallenge(challenge: CodingChallenge) {
    this.challenges.set(challenge.id, challenge);
  }

  getChallenge(id: string): CodingChallenge | undefined {
    return this.challenges.get(id);
  }

  getAllChallenges(): CodingChallenge[] {
    return Array.from(this.challenges.values());
  }

  runTests(code: string, challenge: CodingChallenge): { passed: boolean; results: any[] } {
    const results: any[] = [];
    let allPassed = true;

    try {
      // Create a safe execution context
      const func = new Function('return ' + code)();

      for (const testCase of challenge.testCases) {
        let result: any;
        let passed = false;

        try {
          if (Array.isArray(testCase.input)) {
            result = func(...testCase.input);
          } else if (testCase.input !== null && testCase.input !== undefined) {
            result = func(testCase.input);
          } else {
            result = func();
          }

          // Deep equality check
          passed = this.deepEqual(result, testCase.expectedOutput);

          results.push({
            passed,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: result,
            description: testCase.description,
          });

          if (!passed) {
            allPassed = false;
          }
        } catch (error: any) {
          results.push({
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: null,
            error: error.message,
            description: testCase.description,
          });
          allPassed = false;
        }
      }
    } catch (error: any) {
      return {
        passed: false,
        results: [
          {
            passed: false,
            error: `Code execution error: ${error.message}`,
          },
        ],
      };
    }

    return { passed: allPassed, results };
  }

  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (a == null || b == null) return false;

    if (typeof a !== typeof b) return false;

    if (typeof a !== 'object') return a === b;

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!this.deepEqual(a[key], b[key])) return false;
    }

    return true;
  }
}

