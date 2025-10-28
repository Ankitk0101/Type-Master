// src/pages/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import TypingTest from '../components/TypingTest';
import TestConfiguration from '../components/TestConfiguration';
import Results from '../components/Results';
import CountdownOverlay from '../components/CountdownOverlay';

const Dashboard = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testStarted, setTestStarted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(5);
  const [allWordsTyped, setAllWordsTyped] = useState(false);

  // Sample texts for typing test
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the English alphabet making it perfect for typing practice.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
    "React is a JavaScript library for building user interfaces. It lets you create reusable UI components and manage state efficiently in web applications.",
    "Typing speed and accuracy are important skills for programmers and writers in the digital age. Regular practice can significantly improve your performance.",
    "The future belongs to those who believe in the beauty of their dreams. Never stop learning and always strive for personal growth and development."
  ];

  // Initialize typing test
  const initTest = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsTyping(false);
    setTestStarted(false);
    setAllWordsTyped(false);
    setWords(randomText.split(' ').map(word => ({
      text: word,
      correct: null,
      typed: ''
    })));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTimeLeft(selectedTime * 60);
  }, [selectedTime]);

  // Initialize on component mount and when selectedTime changes
  useEffect(() => {
    initTest();
  }, [initTest]);

  // Countdown timer for test start
  useEffect(() => {
    let countdownInterval;
    if (showCountdown) {
      countdownInterval = setInterval(() => {
        setCountdownNumber(prev => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setShowCountdown(false);
            startTest();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [showCountdown]);

  // Test timer
  useEffect(() => {
    let timer;
    if (testStarted && isTyping && timeLeft > 0 && !allWordsTyped) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, isTyping, timeLeft, allWordsTyped]);

  const startTest = () => {
    setTestStarted(true);
    setIsTyping(true);
    setStartTime(Date.now());
    setAllWordsTyped(false);
  };

  const endTest = () => {
    setEndTime(Date.now());
    setIsTyping(false);
  };

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdownNumber(5);
  };

  // Check if all words are typed
  useEffect(() => {
    if (testStarted && isTyping && currentWordIndex === words.length - 1) {
      const currentWord = words[currentWordIndex];
      if (currentWord && userInput === currentWord.text) {
        setAllWordsTyped(true);
        endTest();
      }
    }
  }, [currentWordIndex, userInput, words, testStarted, isTyping]);

  // Handle user input
  const handleInputChange = (e) => {
    if (!testStarted || !isTyping || allWordsTyped) return;

    const input = e.target.value;
    
    if (input.endsWith(' ') || currentCharIndex >= words[currentWordIndex]?.text.length) {
      // Move to next word
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setUserInput('');
      } else {
        // Last word completed
        setUserInput(input.trim());
        setCurrentCharIndex(input.length);
      }
    } else {
      setUserInput(input);
      setCurrentCharIndex(input.length);
      
      // Update word correctness
      const currentWord = words[currentWordIndex];
      if (currentWord) {
        const newWords = [...words];
        const typedWord = input.trim();
        newWords[currentWordIndex] = {
          ...currentWord,
          typed: typedWord,
          correct: typedWord === currentWord.text
        };
        setWords(newWords);
      }
    }
  };

  // Calculate results
  const calculateResults = () => {
    if (!startTime || !endTime) return null;

    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    const totalWordsTyped = allWordsTyped ? words.length : currentWordIndex + 1;
    const wordsPerMinute = Math.round(totalWordsTyped / timeInMinutes);

    const correctChars = words.reduce((acc, word) => {
      const typed = word.typed || '';
      const actual = word.text;
      const correctCount = typed
        .split('')
        .filter((char, i) => char === actual[i])
        .length;
      return acc + correctCount;
    }, 0);

    const totalCharsTyped = words.reduce((acc, word) => acc + (word.typed?.length || 0), 0);

    const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0;

    return { 
      wordsPerMinute, 
      accuracy, 
      timeInMinutes: timeInMinutes.toFixed(2),
      timeInSeconds: timeInSeconds.toFixed(1),
      totalWords: totalWordsTyped,
      correctChars,
      totalChars: totalCharsTyped,
      allWordsTyped
    };
  };

  const results = calculateResults();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Typing Test
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test and improve your typing speed with our interactive typing test. 
          Choose your time limit and start typing!
        </p>
      </div>

      {/* Test Configuration */}
      {!testStarted && !showCountdown && (
        <TestConfiguration
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          startCountdown={startCountdown}
        />
      )}

      {/* Countdown Overlay */}
      {showCountdown && (
        <CountdownOverlay countdownNumber={countdownNumber} />
      )}

      {/* Test Interface */}
      {testStarted && (
        <TypingTest
          timeLeft={timeLeft}
          selectedTime={selectedTime}
          words={words}
          currentWordIndex={currentWordIndex}
          currentCharIndex={currentCharIndex}
          userInput={userInput}
          allWordsTyped={allWordsTyped}
          isTyping={isTyping}
          handleInputChange={handleInputChange}
          initTest={initTest}
        />
      )}

      {/* Results Section */}
      {(results || allWordsTyped) && (
        <Results 
          results={results} 
          allWordsTyped={allWordsTyped}
          initTest={initTest}
        />
      )}
    </div>
  );
};

export default Dashboard;