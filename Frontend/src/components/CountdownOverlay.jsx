// src/components/CountdownOverlay.js
import React from 'react';

const CountdownOverlay = ({ countdownNumber }) => {
  return (
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
  );
};

export default CountdownOverlay;