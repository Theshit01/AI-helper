"use client";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input || loading) return;

    setLoading(true);
    setReply(""); // 清空旧回复

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setReply(data.reply || data.error);
    } catch (err) {
      setReply("网络请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center p-24 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">AI 助手 MVP</h1>

      <div className="w-full max-w-xl space-y-4">
        {/* 回复展示区 */}
        <div className="p-4 border rounded-lg bg-gray-50 min-h-37.5 whitespace-pre-wrap">
          {loading ? (
            <span className="text-gray-400">AI 正在思考...</span>
          ) : (
            reply || "等待输入..."
          )}
        </div>

        {/* 输入交互区 */}
        <div className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded outline-none focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入你的问题..."
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            发送
          </button>
        </div>
      </div>
    </main>
  );
}
