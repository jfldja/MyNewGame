// src/App.tsx 範例
function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-500">
        背景圖片展示區 (PixiJS Layer)
      </div>

      
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-4xl mx-auto border-2 border-white/20 p-4 rounded-lg bg-black/40 backdrop-blur-md">
          <p className="text-yellow-400 font-bold mb-2">角色名稱</p>
          <p className="text-white text-lg">環境配置成功！下一步我們可以開始處理劇本邏輯了。</p>
        </div>
      </div>
    </div>
  )
}

export default App