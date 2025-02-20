import React from "react";

type ChatBoxProps = {
  messages: { sender: string; text: string }[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  console.log("🚀 ~ messages:", messages)
  return (
    <>
      {messages?.length > 0 && (
        <div className="w-4/6  mx-auto p-16 h-[70vh] overflow-y-auto">
          {messages.map((msg, index) => {
            const textParts = msg.text.split("</think>");
            const filteredText = textParts.length > 1 ? textParts[1] : msg.text;
            
            const formattedText = filteredText .replace(/\*\*/g, "").split("\n").map((line, i) => {
                if (line.startsWith("###")) {
                    return <h2 key={i} className="text-2xl font-bold text-gray-800">{line.replace("###", "").trim()}</h2>;
                } else if (/^\d+\./.test(line.trim())) {
                    const [title, ...rest] = line.split(":");
                    return (
                        <p key={i} className="text-lg text-gray-700">
                            <span className="font-bold">{title.trim()}</span>{rest.length ? ":" + rest.join(":") : ""}
                        </p>
                    );
                } else if (line.startsWith("```")) {
                    return (
                        <pre key={i} className="bg-white text-gray-900 font-bold p-2 rounded-lg shadow-sm overflow-x-auto">
                            {line.replace(/```/g, "").trim()}
                        </pre>
                    );
                }
                return <p key={i} className="text-gray-900">{line.trim()}</p>;
            });
            return (
              <div
                key={index}
                className={`p-6 my-2 rounded-lg ${
                  msg.sender === "User"
                    ? "bg-gray-300 text-white font-semibold self-end text-right"
                    : "bg-gray-100 text-black self-start"
                }`}
              >
                 {formattedText}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChatBox;
