# Chit-Chat

Easily integrate your chatbot into your website within a few minutes.

## Overview

Chit-Chat allows you to quickly integrate a chatbot into your application by simply uploading a configuration file. This bot uses the power of OpenAI's API to generate responses. By using our provided CDN and API endpoint, you can get started in just a few minutes.


## Project Demo
[![Alt text](https://img.youtube.com/vi/MnmEB7ZGAXU/0.jpg)](https://www.youtube.com/watch?v=MnmEB7ZGAXU)


## Installation

### CDN Integration

1. **Add CSS and JS CDN to your project:**
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/apurvjha123/Chit-Chat-Server/js-interface/style.css">
    ```

2. **Embed the chatbot interface into your HTML body:**
    ```html
    <div id="chatbot"></div>
    ```

3. **Add JavaScript CDN before the closing `</body>` tag:**
    ```html
    <script src="https://cdn.jsdelivr.net/gh/apurvjha123/Chit-Chat-Server/js-interface/script.js"></script>
    ```

4. **Configure the chatbot using the following code:**
    ```javascript
    chatbot.setChatBotConfiguration({
        apiKey: "Your API Key",
        chatbotTitle: "Chat Bot",
        initialMessage: "Hello! How can I assist You?",
        brandImage: "https://www.kindpng.com/picc/m/179-1798038_chatbots-builder-pricing-crozdesk-free-chatbot-hd-png.png",
    });
    ```

### API Integration

After uploading your file and providing the OpenAI API key, you can make use of our `generateAnswer` function to retrieve the chatbot's responses.

```javascript
async function generateAnswer(userQuestion, apiKey) {
    const chatAPIUrl = `https://chit-chat.tech/api/v1/QnARetrieval?key=${apiKey}`;

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
    return jsonData.answer;
}
API Reference
Retrieve a Chatbot Answer
Endpoint: POST https://chit-chat.tech/api/v1/QnARetrieval?key=${apiKey}

Parameters:

apiKey (string) - Your Chit-Chat API key
prompt (string) - The user's question
Request Example:

json
Copy code
{
  "prompt": "What is Chit-Chat?"
}
Response Example:

json
Copy code
{
  "answer": "Chit-Chat is a service that allows you to integrate a chatbot into your application using OpenAI's API."
}
Prerequisites
Active OpenAI API Key
Configuration file uploaded to Chit-Chat
Support
If you encounter any issues or require further assistance, please reach out to our support team at apurvjha123@gmail.com.

Thank you for choosing Chit-Chat for your chatbot needs. We hope to make your integration process as smooth as possible.
