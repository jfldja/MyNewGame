// 定義場景類型
export type SceneType = 'bg' | 'text' | 'choice';

// 基礎場景介面
interface BaseScene {
  type: SceneType;
}

// 背景切換場景
export interface BgScene extends BaseScene {
  type: 'bg';
  content: string; // 圖片 URL
  description?: string;
  background?: string; // 新增可選屬性
  bgm?: string; // 新增：背景音樂的 URL 或路徑
}

// 對話場景
export interface TextScene extends BaseScene {
  type: 'text';
  speaker: string;
  content: string;
  background?: string; // 新增可選屬性
  bgm?: string; // 新增：背景音樂的 URL 或路徑
}

// 分歧選項
export interface ChoiceOption {
  text: string;
  nextIndex: number;
}

// 分歧場景
export interface ChoiceScene extends BaseScene {
  type: 'choice';
  content: string; // 選擇題的題目
  options: ChoiceOption[];
  background?: string; // 新增可選屬性
  bgm?: string; // 新增：背景音樂的 URL 或路徑
}

// 聯合型別：代表劇本中的任一項
export type GameScene = BgScene | TextScene | ChoiceScene;