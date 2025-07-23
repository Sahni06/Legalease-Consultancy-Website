import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { encrypt, decrypt } from '../../../utils/encryption';
import './LiveChat.css';

const LiveChat = () => {
  const { clientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [client, setClient] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Fetch client details and chat history
    fetchClientDetails();
    fetchChatHistory();

    // Initialize WebSocket connection
    const ws = new W3CWebSocket(`ws://your-backend-url/chat/${clientId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'message') {
        const decryptedMessage = decrypt(data.content);
        addMessage({
          content: decryptedMessage,
          sender: 'client',
          timestamp: new Date()
        });
      } else if (data.type === 'typing') {
        setIsTyping(data.isTyping);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [clientId]);

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`/api/lawyer/clients/${clientId}`);
      const data = await response.json();
      setClient(data);
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`/api/lawyer/chat-history/${clientId}`);
      const data = await response.json();
      setMessages(data.map(msg => ({
        ...msg,
        content: decrypt(msg.content)
      })));
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const encryptedMessage = encrypt(newMessage);
    const messageData = {
      type: 'message',
      content: encryptedMessage,
      clientId,
      timestamp: new Date()
    };

    wsRef.current.send(JSON.stringify(messageData));
    addMessage({
      content: newMessage,
      sender: 'lawyer',
      timestamp: new Date()
    });
    setNewMessage('');
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="live-chat">
      <div className="chat-header">
        <div className="client-info">
          <img src={client?.profilePic || '/default-avatar.png'} alt="Client" />
          <div>
            <h3>{client?.name}</h3>
            <span className="online-status">
              {client?.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'lawyer' ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            Client is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            wsRef.current.send(JSON.stringify({
              type: 'typing',
              isTyping: true,
              clientId
            }));
          }}
          placeholder="Type your message..."
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default LiveChat; 