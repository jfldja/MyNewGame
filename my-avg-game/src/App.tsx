import React from 'react';
import { useGameStore } from './store/useGameStore';
import type { ChoiceOption } from './types/game'; // 使用 type-only import

const App: React.FC = () => {
  const { getCurrentScene, nextStep, makeChoice } = useGameStore();
  const scene = getCurrentScene();

  if (!scene) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl">劇本已結束</h1>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden select-none" 
      onClick={nextStep}
    >
      {/* 背景層：使用 Type Guard */}
      {scene.type === 'bg' && (
        <img 
          src={scene.content} 
          alt={scene.description || "background"} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* 對話層 */}
      {scene.type === 'text' && (
        <div className="absolute bottom-10 w-full px-4">
          <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
            <p className="text-yellow-400 font-bold text-xl mb-3 tracking-wider">
              {scene.speaker}
            </p>
            <p className="text-white text-2xl leading-relaxed">
              {scene.content}
            </p>
          </div>
        </div>
      )}

      {/* 選項層 */}
      {scene.type === 'choice' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md px-6">
            <p className="text-center text-white text-2xl mb-8 font-medium">
              {scene.content}
            </p>
            <div className="flex flex-col gap-4">
              {scene.options.map((opt: ChoiceOption, i: number) => (
                <button 
                  key={`${scene.content}-${i}`}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation(); // 防止觸發全域的 nextStep
                    makeChoice(opt.nextIndex);
                  }}
                  className="w-full py-4 bg-white/5 hover:bg-white/20 border border-white/20 text-white text-lg rounded-xl transition-all duration-200 active:scale-95"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;