import React, { useState } from "react";
import axios from "axios";

function ChatbotInterface() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);
  const useMockAPI = true; // Toggle this to switch between mock and real API

  const handleSendMessage = async () => {
    if (!query) return;

    // Add the user's query to the chat
    const userMessage = { role: "user", content: query };
    const updatedResponses = [...responses, userMessage];
    setResponses(updatedResponses);

    try {
      let botMessage;

      if (useMockAPI) {
        // Mock API response logic
        const mockResponse = `This is a mock response to: "${query}"`;
        botMessage = { role: "assistant", content: mockResponse };

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        // Make the real API request to OpenAI
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo", 
            messages: updatedResponses,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Extract response from OpenAI API
        botMessage = { role: "assistant", content: response.data.choices[0].message.content };
      }

      // Add the bot's response to the chat
      setResponses([...updatedResponses, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);

      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again later.",
      };
      setResponses([...updatedResponses, errorMessage]);
    }

    // Clear the input field
    setQuery("");
  };

  return (
    <div className="mb-4">
      <h2>Job Query Chatbot</h2>
      <div className="border p-3 mb-3" style={{ height: "300px", overflowY: "auto" }}>
        {responses.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === "user" ? "text-end" : ""}`}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatbotInterface;
