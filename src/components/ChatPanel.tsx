import React, { useState } from "react";
import axios from "axios";

const ChatPanel = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post('/api/ask-gpt', {
        message: userInput
      });

      setMessages([...messages, `You: ${userInput}`, `AI: ${response.data.reply}`]);
      setUserInput("");
    } catch (error) {
      console.error(error);
      alert("Failed to get response from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="border rounded p-4 h-96 overflow-y-scroll mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">{msg}</div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="border p-2 flex-1 rounded-l"
          placeholder="Describe your design goal..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
