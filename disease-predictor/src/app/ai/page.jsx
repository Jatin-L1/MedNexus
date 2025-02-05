"use client";

import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { Send, Brain, UserRound } from "lucide-react";

function ConversationDisplayArea({ data, streamdiv, answer }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="flex-1 rounded-3xl border border-gray-600 bg-gray-800 overflow-y-auto p-6 space-y-4 sm:mx-52">
      {data.map((msg, index) => (
        <div
          key={index}
          className={`flex items-end gap-x-3 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.role === "model" && (
            <Brain className="w-8 h-8 text-gray-300 rounded-full p-1 bg-gray-700" />
          )}
          <div
            className={`max-w-[75%] p-4 rounded-2xl shadow-lg text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-200"
            }`}
            dangerouslySetInnerHTML={{
              __html: msg.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>"),
            }}
          />
          {msg.role === "user" && (
            <UserRound className="w-8 h-8 text-indigo-300 rounded-full p-1 bg-gray-700" />
          )}
        </div>
      ))}
      {streamdiv && (
        <div className="flex items-end gap-x-3 justify-start">
          <Brain className="w-8 h-8 text-gray-300" />
          <div
            className="max-w-[75%] p-4 rounded-2xl bg-gray-800 text-gray-200 shadow-lg"
            dangerouslySetInnerHTML={{
              __html: answer
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>"),
            }}
          />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

function MessageInput({ inputRef, waiting, handleClick }) {
  return (
    <div className="p-4 bg-gray-900 sm:mx-52">
      <div className="flex items-center space-x-3 max-w-4xl mx-auto bg-gray-800 p-3 rounded-full shadow-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white outline-none px-3 placeholder-gray-400"
          disabled={waiting}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleClick())}
        />
        <button
          onClick={handleClick}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition duration-200 disabled:opacity-50"
          disabled={waiting}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const inputRef = useRef();
  const host = "http://localhost:3004/api/ai";
  const streamUrl = `${host}/stream`;
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [streamdiv, showStreamdiv] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleClick = () => {
    if (!inputRef.current.value.trim()) return;
    handleStreamingChat();
  };

  const handleStreamingChat = async () => {
    const chatData = { chat: inputRef.current.value, history: data };
    const ndata = [...data, { role: "user", parts: [{ text: inputRef.current.value }] }];
    flushSync(() => {
      setData(ndata);
      inputRef.current.value = "";
      inputRef.current.placeholder = "Waiting for response...";
      setWaiting(true);
    });
    try {
      setAnswer("");
      const response = await fetch(streamUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      });
      if (!response.ok || !response.body) throw response.statusText;
      const reader = response.body.getReader();
      const txtdecoder = new TextDecoder();
      showStreamdiv(true);
      let modelResponse = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedTxt = txtdecoder.decode(value, { stream: true });
        setAnswer((prev) => prev + decodedTxt);
        modelResponse += decodedTxt;
      }
      setData([...ndata, { role: "model", parts: [{ text: modelResponse }] }]);
    } catch {
      setData([...ndata, { role: "model", parts: [{ text: "Error occurred" }] }]);
    } finally {
      setAnswer("");
      showStreamdiv(false);
      inputRef.current.placeholder = "Type your message...";
      setWaiting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white pt-24">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
          AI Assistance
        </h1>
        <p className="text-gray-400 text-lg font-medium tracking-wider">
          GEMINI-POWERED MEDICAL AI ASSISTANT • VERSION 1.0
        </p>
      </div>
      <ConversationDisplayArea data={data} streamdiv={streamdiv} answer={answer} />
      <MessageInput inputRef={inputRef} waiting={waiting} handleClick={handleClick} />
    </div>
  );
}
