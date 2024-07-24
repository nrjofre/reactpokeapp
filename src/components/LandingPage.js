import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  const handleStartClick = () => {
    setIsAnimationVisible(true);
  };

  useEffect(() => {
    if (isAnimationVisible) {
      const videoElement = document.getElementById('pokeball-animation');
      videoElement.play();
      setTimeout(() => {
        document.getElementById('message-container').classList.add('hidden');
      }, 500);
      videoElement.onended = () => {
        navigate('/pokegrid');
      };
    }
  }, [isAnimationVisible, navigate]);

  const videoSource = document.documentElement.classList.contains('dark') ? '/vid-2.mp4' : '/vid-1.mp4';

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random')] bg-cover bg-center opacity-30"></div>
      <div
        id="message-container"
        className={`relative z-30 text-center p-4 bg-white bg-opacity-80 dark:bg-opacity-60 dark:bg-gray-800 rounded-lg shadow-lg max-w-sm ${isAnimationVisible ? 'animate-fadeOut' : 'block'}`}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Welcome to PokeApp</h1>
        <p className="text-base mb-4 text-gray-700 dark:text-gray-300">Discover and explore your favorite Pokémon.</p>
        <button
          onClick={handleStartClick}
          className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 font-bold"
        >
          START
        </button>
      </div>
      {isAnimationVisible && (
        <video
          id="pokeball-animation"
          src={videoSource}
          className="absolute inset-0 w-full h-full object-cover z-20 transform scale-100 opacity-80"
          style={{ display: isAnimationVisible ? 'block' : 'none' }}
        />
      )}
    </div>
  );
}

export default LandingPage;
