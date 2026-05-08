import { create } from 'zustand';
import type { GameScene } from '../types/game';
import storyDataRaw from '../data/chapter1.json';

// 強制轉型原始 JSON 為定義好的型別陣列
const storyData = storyDataRaw as GameScene[];

interface GameState {
  currentIndex: number;
  history: number[];
  nextStep: () => void;
  makeChoice: (index: number) => void;
  getCurrentScene: () => GameScene | undefined;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentIndex: 0,
  history: [],
  
  getCurrentScene: () => storyData[get().currentIndex],

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