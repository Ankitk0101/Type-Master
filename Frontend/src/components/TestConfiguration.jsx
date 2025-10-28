// src/components/TestConfiguration.js
import React from 'react';

const TestConfiguration = ({ selectedTime, setSelectedTime, startCountdown }) => {
  return (
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
  );
};

export default TestConfiguration;