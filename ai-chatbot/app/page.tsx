"use client";

import React, { useState, useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import WebSocketClient from "../websocket";
import ChatBox from "../components/ChatBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const socket = new WebSocketClient("ws://localhost:8000/ws/chat");

const Home: React.FC = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
  const [messages, setMessages] = useState<
    { sender: "User" | "AI"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

  useEffect(() => {
    const ws = socket.getWebSocket();
    ws.onmessage = (event) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "AI", text: event.data }]);
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "User", text: input }]);
    setIsTyping(true);
    socket.sendMessage(input);
    setInput("");
  };

//   if (status === "loading") {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 w-full">
      <div className="absolute top-5 right-5">
        {/* <Button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => signOut()}>
          Logout
        </Button> */}
      </div>
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        How can I help you?
      </h1>
      <ChatBox messages={messages} />
      {isTyping && <p className="text-gray-500 italic mt-2">AI is typing...</p>}
      <div className="flex w-full max-w-5xl mt-4">
        <Input
          className="flex-grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button className="ml-2" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Home;
