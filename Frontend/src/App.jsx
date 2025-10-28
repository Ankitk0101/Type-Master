import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1); // Default 1 minute
  const [timeLeft, setTimeLeft] = useState(60); // seconds
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

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Render text with highlighting
  const renderText = () => {
    return words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        className={`
          inline-block mx-1 px-1 rounded cursor-default
          ${wordIndex === currentWordIndex ? 'bg-yellow-200 border-2 border-yellow-400' : ''}
          ${wordIndex < currentWordIndex ? (word.correct ? 'text-green-600' : 'text-red-600') : 'text-gray-700'}
          ${allWordsTyped && wordIndex === words.length - 1 ? 'text-green-600' : ''}
        `}
      >
        {word.text.split('').map((char, charIndex) => {
          let className = 'inline-block';
          if (wordIndex < currentWordIndex) {
            className += word.typed[charIndex] === char ? ' text-green-600' : ' text-red-600 underline';
          } else if (wordIndex === currentWordIndex && charIndex < currentCharIndex) {
            className += userInput[charIndex] === char ? ' text-green-600' : ' text-red-600 underline';
          } else if (allWordsTyped && wordIndex === words.length - 1) {
            className += ' text-green-600';
          }
          return (
            <span key={charIndex} className={className}>
              {char}
            </span>
          );
        })}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            TypeMaster
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test and improve your typing speed with our interactive typing test. 
            Choose your time limit and start typing!
          </p>
        </div>

        {/* Test Configuration */}
        {!testStarted && !showCountdown && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Test Settings</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Duration (Minutes)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 10].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 How it works:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Choose your test duration</li>
                    <li>• Type the text as fast and accurately as possible</li>
                    <li>• Test ends when time runs out or you finish typing</li>
                    <li>• Results show your WPM and accuracy</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <div className="text-5xl font-bold mb-2">{selectedTime}</div>
                  <div className="text-lg">Minutes</div>
                  <div className="text-sm opacity-90 mt-2">Selected Duration</div>
                </div>
                
                <div className="mt-6 text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-800 font-semibold">Ready to test your skills?</div>
                  <div className="text-green-600 text-sm mt-1">
                    Click start and type the displayed text
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={startCountdown}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Start Typing Test
              </button>
            </div>
          </div>
        )}

        {/* Countdown Overlay */}
        {showCountdown && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="text-white text-8xl font-bold animate-pulse-slow mb-4">
                {countdownNumber}
              </div>
              <div className="text-white text-2xl animate-pulse">
                {countdownNumber === 1 ? 'Start Typing!' : 'Get Ready...'}
              </div>
            </div>
          </div>
        )}

        {/* Test Interface */}
        {testStarted && (
          <div className="space-y-6">
            {/* Timer Display */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-mono font-bold text-gray-800">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Time Remaining
                  {allWordsTyped && (
                    <span className="text-green-600 font-semibold ml-2">• All words typed!</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    allWordsTyped 
                      ? 'bg-gradient-to-r from-green-400 to-green-500' 
                      : 'bg-gradient-to-r from-green-400 to-blue-500'
                  }`}
                  style={{ width: `${(timeLeft / (selectedTime * 60)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Text Display */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="text-lg md:text-xl leading-relaxed font-mono min-h-[120px] bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                {renderText()}
                {allWordsTyped && (
                  <div className="text-center mt-4">
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      🎉 All words completed! Well done!
                    </span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="mt-6">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder={
                    allWordsTyped 
                      ? "Test completed! Check your results below." 
                      : isTyping 
                      ? "Start typing here..." 
                      : "Test completed!"
                  }
                  disabled={!isTyping || timeLeft === 0 || allWordsTyped}
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
                  autoFocus
                />
              </div>

              {/* Restart Button */}
              <div className="text-center mt-6">
                <button
                  onClick={initTest}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  🔄 Restart Test
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {(results || allWordsTyped) && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {allWordsTyped ? '🎉 Congratulations!' : '📊 Test Results'}
            </h2>
            
            {allWordsTyped && (
              <div className="text-center mb-6">
                <div className="bg-green-100 border border-green-200 rounded-lg p-4 inline-block">
                  <p className="text-green-800 font-semibold">
                    ✅ You completed the entire text in {results?.timeInSeconds} seconds!
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">{results?.wordsPerMinute || 0}</div>
                <div className="text-sm text-gray-600">WPM</div>
                <div className="text-xs text-blue-500 mt-1">Words Per Minute</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600">{results?.accuracy || 0}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
                <div className="text-xs text-green-500 mt-1">Typing Precision</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600">{results?.totalWords || 0}</div>
                <div className="text-sm text-gray-600">Words Typed</div>
                <div className="text-xs text-purple-500 mt-1">Total Completed</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="text-3xl font-bold text-orange-600">{results?.timeInMinutes || 0}</div>
                <div className="text-sm text-gray-600">Minutes</div>
                <div className="text-xs text-orange-500 mt-1">Time Taken</div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={initTest}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;