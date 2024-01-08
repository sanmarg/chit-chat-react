"use client";

import React, { useState, useEffect, useRef } from "react";
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

const ChatBot: React.FC<ChatBotProps> = ({
  initialMessage = "Hello! How Can I Assist You ?",
  chatbotTitle = "Chat bot",
  brandImage = "https://www.kindpng.com/picc/m/179-1798038_chatbots-builder-pricing-crozdesk-free-chatbot-hd-png.png",
  apiKey ,
  switchAPI = false,
  suggestions = [],
  rateLimitDuration = 5000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [suggest, setSuggestions] = useState(suggestions);

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    sendMessage();
    setSuggestions([]);
  };

  useEffect(() => {
    if (initialMessage) {
      setMessages([{ type: "bot", text: initialMessage }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function generateAnswares(userQuestion: string) {
    try {
      let chatAPIUrl = `https://chit-chatbot.up.railway.app/api/v1/QnARetrieval?key=${apiKey}`;

      if (switchAPI) {
        chatAPIUrl = `https://chit-chat.tech/api/v1/organization/generateCompletion?key=${apiKey}`;
      }

      const payloadBody = {
        prompt: userQuestion,
      };

      const response = await fetch(chatAPIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadBody),
      });

      const jsonData = await response.json();

      setMessages((prev) => [...prev, { type: "bot", text: jsonData.message }]);
      setIsBotTyping(false);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "OOPs! something went wrong" },
      ]);
      setIsBotTyping(false);
    }
  }

  const sendMessage = () => {
    if (inputValue.trim() && !rateLimited) {
      const userMessage = {
        type: "user",
        text: inputValue,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsBotTyping(true);
      setSuggestions([]); // clear the suggestions when user sends a message

      generateAnswares(inputValue);
      setRateLimited(true);
      setTimeout(() => setRateLimited(false), rateLimitDuration);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixture">
      {isOpen ? (
        <div className="main">
          <div className="main1">
            <div className="flexture">
              <img src={brandImage} alt="brand" className="image" />
              <span>{chatbotTitle}</span>
            </div>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="mainmsg">
            {messages.map((msg, index) => (
              // ... (rest of the code)
              <div key={index} className="messageContainer">
                {msg.type === "bot" && (
                  <div className="btmContainer">
                    <img src={brandImage} alt="Bot" className="customClass" />
                    <span className="msgText">{msg.text}</span>
                  </div>
                )}
                {msg.type === "user" && (
                  <div className="userContainer">
                    <span className="userLabel">You</span>
                    <span className="userMessage">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
            {isBotTyping && (
              <div className="botTypingText">Bot is typing...</div>
            )}
            <div ref={messagesEndRef}></div>
            {suggest.length > 0 && (
              <>
                <div className="flexContainer">
                  <img src={brandImage} alt="Bot" className="botImage" />
                  <div className="suggestionContainer">
                    <div className="suggestionText">
                      Here are Some Suggestions
                    </div>
                    {suggest.map((suggestion, index) => (
                      <div className="flex items-center mt-2" key={index}>
                        <button
                          className="suggestionButton"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="inputContainer">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleEnterPress}
              className="textInput"
            />
            <button
              onClick={sendMessage}
              disabled={isBotTyping || rateLimited}
              className="sendMessageButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
              >
                <path
                  fill="#d7d7d7"
                  d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)} className="chatIconContainer">
          <img src={brandImage} alt="Chat Icon" className="chatIconImage" />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
