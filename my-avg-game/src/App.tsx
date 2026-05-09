import React,{useEffect} from 'react';
import { useGameStore } from './store/useGameStore';
import type { ChoiceOption } from './types/game'; // 使用 type-only import

const App: React.FC = () => {
  const { getCurrentScene, nextStep, makeChoice, playBgm, currentIndex } = useGameStore();
  const scene = getCurrentScene();

  console.log("App 重新渲染了，目前 Index:", currentIndex);

  useEffect(() => {
    console.log("useEffect 啟動了");  
    const currentScene = getCurrentScene(); // 不要先轉型，先拿原始資料
  
    console.log("當前場景物件:", currentScene); // 檢查這行有沒有印出東西

    if (currentScene && 'bgm' in currentScene && currentScene.bgm) {
      console.log("偵測到音樂標籤:", currentScene.bgm);
      playBgm(currentScene.bgm as string);
    }
  }, [currentIndex, playBgm, getCurrentScene]); 
// 💡 注意：這裡改為監聽 currentIndex，只要索引一變，就重新檢查一次音樂

  if (!scene) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl">劇本已結束</h1>
      </div>
    );
  }
  // 判斷背景樣式
  const renderBackground = () => {
    if (!scene.background) return <div className="absolute inset-0 bg-black" />;
    
    if (scene.background.startsWith('#')) {
      return <div className="absolute inset-0" style={{ backgroundColor: scene.background }} />;
    }
    
    return (
      <img 
        src={scene.background} 
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" 
        alt="background"
      />
    );
  };

  return (
  <div 
    className="relative w-full h-screen overflow-hidden cursor-pointer select-none bg-black" 
    onClick={() => {
      console.log("畫面被點擊了，當前索引：", currentIndex); // 除錯用
      nextStep();
    }}
  >
      {/* 背景層：使用 Type Guard */}
      {renderBackground()}
      
      {/* 2. 對話層 (只有 text 類型才顯示) */}
      {scene.type === 'text' && (
        <div className="absolute bottom-10 w-full px-4 z-10">
          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
            <p className="text-yellow-400 font-bold text-xl mb-2">{scene.speaker}</p>
            <p className="text-white text-2xl">{scene.content}</p>
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