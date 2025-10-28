import React from 'react';

const TypingTest = ({
  timeLeft,
  selectedTime,
  words,
  currentWordIndex,
  currentCharIndex,
  userInput,
  allWordsTyped,
  isTyping,
  handleInputChange,
  initTest
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
  );
};

export default TypingTest;