import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useState } from "react";

const ChatInput: React.FC<{ onSend: (message: string) => void }> = ({
  onSend,
}) => {
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
        onSend(input);
        setInput("");
    }
};


  return (
    <form
      onSubmit={handleSend}
      className="flex w-full mx-auto items-center bg-white shadow-md p-3 rounded-full mt-4"
    >
      <Input
        className="flex-grow border-0 bg-transparent outline-none text-gray-700 text-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <Button
        type="submit"
        className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
