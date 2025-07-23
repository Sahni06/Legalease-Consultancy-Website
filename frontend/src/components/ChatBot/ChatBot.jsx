import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatBot.css';
import { findRelevantInfo, generateFollowUpSuggestions } from '../../utils/legalKnowledgeBase';
import { loadLegalData, updateKnowledgeBase } from '../../utils/dataLoader';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatBot = () => {
  console.log('ChatBot component rendered');

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your LegalEase AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load additional legal data
    const loadAdditionalData = async () => {
      try {
        const data = await loadLegalData('/api/legal-data');
        //  checking if we have data in localStorage
        const cachedData = localStorage.getItem('legalKnowledgeBase');
        if (cachedData) {
          return JSON.parse(cachedData);
        }

        // If no cached data, load from server
        if (data && data.success !== false) {
          // Cache the data
          localStorage.setItem('legalKnowledgeBase', JSON.stringify(data));
          return data;
        } else {
          // If loading failed, use fallback data
          return {
            general: {
              // Add some default responses
              greeting: "Hello! I'm your legal assistant. How can I help you today?",
              // ... more default responses
            }
          };
        }
      } catch (error) {
        console.error('Error in loadAdditionalData:', error);
        return null;
      }
    };

    loadAdditionalData();
  }, []);

  // Initialize chat when component mounts
  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      const newChat = await model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Hello! I'm your LegalEase AI assistant. How can I help you today?" }],
          },
        ],
      });
      setChat(newChat);
    } catch (error) {
      console.error('Chat initialization error:', error);
    }
  };

  const generateAIResponse = async (userQuery) => {
    setIsTyping(true);
    try {
      if (!chat) {
        await initializeChat();
      }

      const legalContext = findRelevantInfo(userQuery);
      const suggestions = generateFollowUpSuggestions(userQuery);

      // Send message with context
      const prompt = `Context: ${legalContext}\n\nUser Question: ${userQuery}`;
      const result = await chat.sendMessage(prompt);
      const response = result.response.text();

      return `${response}\n\nYou can also ask:\n• ${suggestions.join('\n• ')}`;
    } catch (error) {
      console.error('Detailed Error:', error);
      return "I apologize, but I'm having trouble processing your request. Please try asking in a different way or choose from the suggested questions.";
    } finally {
      setIsTyping(false);
    }
  };

  // Add suggested queries component
  const SuggestedQueries = () => {
    const suggestions = [
      "What are the grounds for divorce in India?",
      "How do I file a consumer complaint?",
      "What are my rights if I'm arrested?",
      "How to register a property?",
      "What are basic employee rights?"
    ];

    return (
      <div className="suggested-queries">
        <p>Common Legal Questions:</p>
        <div className="suggestion-buttons">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setInputMessage(suggestion);
                handleSubmit({ preventDefault: () => {} });
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate and add AI response
    const aiResponse = await generateAIResponse(inputMessage);
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="chatbot-container">
      {console.log('ChatBot container rendered')}
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {console.log('ChatBot button rendered')}
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
        {!isOpen && <span className="chat-label">Legal Assistant</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-title">
              <i className="fas fa-balance-scale"></i>
              <span>LegalEase AI Assistant</span>
            </div>
          </div>

          <div className="messages-container">
            {messages.length === 1 && <SuggestedQueries />}
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
              >
                {message.type === 'bot' && (
                  <div className="bot-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="message-content">
                  {message.content}
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <div className="bot-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your legal question..."
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !inputMessage.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;