import { create } from 'zustand';
import { Howl } from 'howler';
import type { GameScene } from '../types/game';
import storyDataRaw from '../data/chapter1.json';

// 強制轉型原始 JSON 為定義好的型別陣列
const storyData = storyDataRaw as GameScene[];

interface GameState {
  currentIndex: number;
  history: number[];
  currentBgmInstance: Howl | null;
  currentBgmUrl: string | null; // 新增：用來追蹤目前播放的音樂路徑
  nextStep: () => void;
  playBgm: (url: string) => void;
  makeChoice: (index: number) => void;
  getCurrentScene: () => GameScene | undefined;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentIndex: 0,
  currentBgmInstance: null,
  currentBgmUrl: null,
  history: [],
  
  getCurrentScene: () => storyData[get().currentIndex],

  playBgm: (url: string) => {
  const state = get();
  if (state.currentBgmUrl === url) return;

  // 1. 停止舊音樂
  if (state.currentBgmInstance) {
    state.currentBgmInstance.stop();
    state.currentBgmInstance.unload();
  }

  // 2. 建立新音樂
  const newBgm = new Howl({
    src: [url],
    loop: true,
    html5: true, 
    volume: 0.5,
    onplay: () => {
      // 💡 關鍵修正：確保 AudioContext 是開啟狀態
      if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().then(() => {
          console.log("音訊上下文已手動恢復（解鎖成功）");
        });
      }
    },
    onload: () => console.log("音樂加載成功:", url),
    onloaderror: (id, err) => console.error("加載失敗:", err)
  });

  newBgm.play();

  set({ 
    currentBgmInstance: newBgm,
    currentBgmUrl: url 
  });
},

  nextStep: () => {
    const scene = get().getCurrentScene();
    // 只有在文字場景點擊時才進入下一格，避免在分歧時因點擊背景而跳過
    if (scene && scene.type === 'text') {
      set((state) => ({ currentIndex: state.currentIndex + 1 }));
    }
  },

  makeChoice: (index: number) => {
    set({ currentIndex: index });
  }
}));