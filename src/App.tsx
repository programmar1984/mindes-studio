import React from "react";
import ChatPanel from "./components/ChatPanel";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center pt-8">Agentic Design Assistant</h1>
      <ChatPanel />
    </div>
  );
}

export default App;