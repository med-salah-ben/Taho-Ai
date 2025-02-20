import React from "react";

interface MessageProps {
    sender: "User" | "AI";
    text: string;
}

const MessageBubble: React.FC<MessageProps> = ({ sender, text }) => {
    return (
        <div className={`flex ${sender === "User" ? "justify-end" : "justify-start"} mb-2`}>
            <div
                className={`p-3 max-w-lg rounded-2xl shadow-md ${
                    sender === "User"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                }`}
            >
                <p>{text}</p>
            </div>
        </div>
    );
};

export default MessageBubble;
