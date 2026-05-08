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
}

// 對話場景
export interface TextScene extends BaseScene {
  type: 'text';
  speaker: string;
  content: string;
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
}

// 聯合型別：代表劇本中的任一項
export type GameScene = BgScene | TextScene | ChoiceScene;