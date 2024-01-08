"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
const ChatBot = ({ initialMessage = "Hello! How Can I Assist You ?", chatbotTitle = "Chat bot", brandImage = "https://www.kindpng.com/picc/m/179-1798038_chatbots-builder-pricing-crozdesk-free-chatbot-hd-png.png", apiKey, switchAPI = false, suggestions = [], rateLimitDuration = 5000, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [rateLimited, setRateLimited] = useState(false);
    const [suggest, setSuggestions] = useState(suggestions);
    const handleSuggestionClick = (suggestion) => {
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
        var _a;
        if (isOpen) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [isOpen]);
    useEffect(() => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    function generateAnswares(userQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chatAPIUrl = `https://chit-chatbot.up.railway.app/api/v1/QnARetrieval?key=${apiKey}`;
                if (switchAPI) {
                    chatAPIUrl = `https://chit-chat.tech/api/v1/organization/generateCompletion?key=${apiKey}`;
                }
                const payloadBody = {
                    prompt: userQuestion,
                };
                const response = yield fetch(chatAPIUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payloadBody),
                });
                const jsonData = yield response.json();
                setMessages((prev) => [...prev, { type: "bot", text: jsonData.message }]);
                setIsBotTyping(false);
            }
            catch (e) {
                console.error(e);
                setMessages((prev) => [
                    ...prev,
                    { type: "bot", text: "OOPs! something went wrong" },
                ]);
                setIsBotTyping(false);
            }
        });
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
    const handleEnterPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    return (React.createElement("div", { className: "fixture" }, isOpen ? (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "main1" },
            React.createElement("div", { className: "flexture" },
                React.createElement("img", { src: brandImage, alt: "brand", className: "image" }),
                React.createElement("span", null, chatbotTitle)),
            React.createElement("button", { onClick: () => setIsOpen(false) }, "X")),
        React.createElement("div", { className: "mainmsg" },
            messages.map((msg, index) => (
            // ... (rest of the code)
            React.createElement("div", { key: index, className: "messageContainer" },
                msg.type === "bot" && (React.createElement("div", { className: "btmContainer" },
                    React.createElement("img", { src: brandImage, alt: "Bot", className: "customClass" }),
                    React.createElement("span", { className: "msgText" }, msg.text))),
                msg.type === "user" && (React.createElement("div", { className: "userContainer" },
                    React.createElement("span", { className: "userLabel" }, "You"),
                    React.createElement("span", { className: "userMessage" }, msg.text)))))),
            isBotTyping && (React.createElement("div", { className: "botTypingText" }, "Bot is typing...")),
            React.createElement("div", { ref: messagesEndRef }),
            suggest.length > 0 && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "flexContainer" },
                    React.createElement("img", { src: brandImage, alt: "Bot", className: "botImage" }),
                    React.createElement("div", { className: "suggestionContainer" },
                        React.createElement("div", { className: "suggestionText" }, "Here are Some Suggestions"),
                        suggest.map((suggestion, index) => (React.createElement("div", { className: "flex items-center mt-2", key: index },
                            React.createElement("button", { className: "suggestionButton", onClick: () => handleSuggestionClick(suggestion) }, suggestion))))))))),
        React.createElement("div", { className: "inputContainer" },
            React.createElement("input", { ref: inputRef, type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleEnterPress, className: "textInput" }),
            React.createElement("button", { onClick: sendMessage, disabled: isBotTyping || rateLimited, className: "sendMessageButton" },
                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", height: "30px", width: "30px" },
                    React.createElement("path", { fill: "#d7d7d7", d: "M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z" })))))) : (React.createElement("div", { onClick: () => setIsOpen(true), className: "chatIconContainer" },
        React.createElement("img", { src: brandImage, alt: "Chat Icon", className: "chatIconImage" })))));
};
export default ChatBot;
