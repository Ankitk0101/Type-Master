// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">TypeMaster</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Improve your typing speed and accuracy with our interactive typing tests. 
          Track your progress and become a typing master!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer text-center"
          >
            🚀 Start Typing Test
          </Link>
          
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Speed Testing</h3>
          <p className="text-gray-600">
            Test your typing speed with various time limits and track your words per minute (WPM).
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Accuracy Focus</h3>
          <p className="text-gray-600">
            Improve your accuracy with real-time feedback and detailed performance analysis.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your improvement over time with detailed statistics and progress charts.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">1</div>
            <h4 className="font-semibold text-gray-800 mb-2">Choose Duration</h4>
            <p className="text-sm text-gray-600">Select your test time from 1 to 10 minutes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">2</div>
            <h4 className="font-semibold text-gray-800 mb-2">Start Typing</h4>
            <p className="text-sm text-gray-600">Type the displayed text as fast as you can</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">3</div>
            <h4 className="font-semibold text-gray-800 mb-2">Get Results</h4>
            <p className="text-sm text-gray-600">Receive instant WPM and accuracy scores</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">4</div>
            <h4 className="font-semibold text-gray-800 mb-2">Improve</h4>
            <p className="text-sm text-gray-600">Practice regularly to enhance your skills</p>
          </div>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ready to Test Your Skills?</h2>
        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
        >
          Start Your Typing Journey
        </Link>
      </div>
    </div>
  );
};

export default Home;