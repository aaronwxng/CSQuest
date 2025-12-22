import React, { useState, useEffect, useRef } from 'react';
import { CodeEditor } from '../CodeEditor';
import { ChallengeManager } from '../../educational/ChallengeManager';
import type { CodingChallenge } from '../../types/GameTypes';
import './ChallengePanel.css';

interface ChallengePanelProps {
  onClose: () => void;
  onSubmit: (code: string) => void;
  challengeId?: string;
}

export const ChallengePanel: React.FC<ChallengePanelProps> = ({
  onClose,
  onSubmit,
  challengeId,
}) => {
  const [challenge, setChallenge] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeEditorRef = useRef<CodeEditor | null>(null);
  const challengeManager = new ChallengeManager();

  useEffect(() => {
    if (challengeId) {
      const selectedChallenge = challengeManager.getChallenge(challengeId);
      if (selectedChallenge) {
        setChallenge(selectedChallenge);
        setCode(selectedChallenge.templateCode);
      }
    } else {
      // Default to first challenge for now
      const challenges = challengeManager.getAllChallenges();
      if (challenges.length > 0) {
        setChallenge(challenges[0]);
        setCode(challenges[0].templateCode);
      }
    }
  }, [challengeId]);

  // Initialize Monaco Editor
  useEffect(() => {
    if (challenge && !codeEditorRef.current) {
      const editor = new CodeEditor('challenge-code-editor');
      editor.initialize(code);
      codeEditorRef.current = editor;

      // Update code when editor changes
      const model = editor.getEditor()?.getModel();
      if (model) {
        model.onDidChangeContent(() => {
          setCode(editor.getCode());
        });
      }
    }

    return () => {
      if (codeEditorRef.current) {
        codeEditorRef.current.destroy();
        codeEditorRef.current = null;
      }
    };
  }, [challenge]);

  const handleRunTests = () => {
    if (!challenge || !codeEditorRef.current) return;

    const currentCode = codeEditorRef.current.getCode();
    const results = challengeManager.runTests(currentCode, challenge);
    setTestResults(results.results);
  };

  const handleSubmit = () => {
    if (!codeEditorRef.current) return;
    
    setIsSubmitting(true);
    const currentCode = codeEditorRef.current.getCode();
    onSubmit(currentCode);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!challenge) {
    return (
      <div className="challenge-panel react-ui-overlay">
        <div className="panel-content">
          <h2>Loading challenge...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="challenge-panel react-ui-overlay">
      <div className="panel-content">
        <div className="panel-header">
          <div>
            <h2>{challenge.title}</h2>
            <p className="challenge-description">{challenge.description}</p>
            <span className={`difficulty-badge difficulty-${challenge.difficulty}`}>
              {challenge.difficulty}
            </span>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="panel-body">
          <div className="code-section">
            <div id="challenge-code-editor" style={{ height: '400px', width: '100%' }}></div>
          </div>

          <div className="test-results-section">
            <h3>Test Results</h3>
            {testResults.length > 0 ? (
              <div className="test-results">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                  >
                    <span className="test-icon">{result.passed ? '✓' : '✗'}</span>
                    <div className="test-details">
                      {result.description && <div>{result.description}</div>}
                      {result.error && <div className="test-error">{result.error}</div>}
                      {result.expected !== undefined && (
                        <div className="test-expected">
                          Expected: {JSON.stringify(result.expected)}
                        </div>
                      )}
                      {result.actual !== undefined && (
                        <div className="test-actual">
                          Got: {JSON.stringify(result.actual)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">Run tests to see results</p>
            )}
          </div>
        </div>

        <div className="panel-footer">
          <button className="action-button secondary" onClick={handleRunTests}>
            Run Tests
          </button>
          <button
            className="action-button primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Solution'}
          </button>
        </div>
      </div>
    </div>
  );
};

