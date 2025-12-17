import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfdfd] overflow-hidden">
      
      {/* 1. Animated Radial Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(255,230,230,0.5)_0%,_transparent_70%)] animate-pulse"></div>
      </div>

      {/* 2. Central Master Component */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* The Liquid Sphere (Container) */}
        <div className="relative w-40 h-40 flex items-center justify-center backdrop-blur-sm bg-white/30 rounded-full border border-white shadow-[inset_0_0_20px_rgba(220,38,38,0.05),0_20px_40px_rgba(0,0,0,0.05)]">
          
          {/* Rotating "Life-Ring" */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="80" cy="80" r="75"
              fill="none"
              stroke="#fee2e2"
              strokeWidth="2"
            />
            <circle
              cx="80" cy="80" r="75"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              strokeDasharray="100 400"
              strokeLinecap="round"
              className="animate-[spin_2s_linear_infinite]"
            />
          </svg>

          {/* Inner Abstract Blood Drop */}
          <div className="relative w-20 h-20 bg-gradient-to-tr from-red-600 to-red-400 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_10px_25px_rgba(220,38,38,0.4)] animate-[organic_4s_ease-in-out_infinite] flex items-center justify-center">
            
            {/* Minimal Heart Icon */}
            <svg
              className="w-10 h-10 text-white/90 animate-[heartbeat_1.5s_infinite]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* Reflection Shine */}
            <div className="absolute top-2 left-4 w-4 h-6 bg-white/20 rounded-full blur-[1px] rotate-[15deg]"></div>
          </div>
        </div>

        {/* 3. Text & Progress System */}
        <div className="mt-12 text-center">
          <div className="relative">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 tracking-tighter">
              SAVING<span className="text-red-600">.</span>LIFE
            </h2>
            {/* Animated Underline */}
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gray-100 overflow-hidden">
               <div className="w-1/2 h-full bg-red-500 animate-[slide_1.5s_infinite_ease-in-out]"></div>
            </div>
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.5em] font-bold text-gray-400">
             Connecting Humanity
          </p>
        </div>
      </div>

      {/* 4. Bottom Fluid Particles */}
      <div className="absolute bottom-10 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="w-1.5 h-1.5 bg-red-200 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes organic {
          0%, 100% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform: scale(1) rotate(0deg); }
          33% { border-radius: 40% 60% 40% 60% / 50% 50% 50% 50%; transform: scale(1.05) rotate(5deg); }
          66% { border-radius: 60% 40% 60% 40% / 45% 45% 55% 55%; transform: scale(0.95) rotate(-5deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          15% { transform: scale(1.2); opacity: 1; }
          30% { transform: scale(1); opacity: 0.9; }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default Loading;