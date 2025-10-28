// src/components/Results.js
import React from 'react';

const Results = ({ results, allWordsTyped, initTest }) => {
  return (
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
  );
};

export default Results;