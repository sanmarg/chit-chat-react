import React from "react";
import "./ChatBot.css";
interface ChatBotProps {
    initialMessage?: string;
    chatbotTitle?: string;
    brandImage?: string;
    apiKey?: string;
    switchAPI?: boolean;
    suggestions?: string[];
    rateLimitDuration?: number;
}
declare const ChatBot: React.FC<ChatBotProps>;
export default ChatBot;
