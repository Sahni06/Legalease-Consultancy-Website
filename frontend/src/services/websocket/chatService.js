class ChatService {
  constructor() {
    this.ws = null;
    this.handlers = {
      message: [],
      typing: [],
      status: []
    };
  }

  connect(lawyerId) {
    const token = localStorage.getItem('lawyer_token');
    this.ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/chat?token=${token}&lawyerId=${lawyerId}`);

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.handlers.status.forEach(handler => handler('connected'));
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'message':
          this.handlers.message.forEach(handler => handler(data));
          break;
        case 'typing':
          this.handlers.typing.forEach(handler => handler(data));
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.handlers.status.forEach(handler => handler('disconnected'));
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(lawyerId), 5000);
    };
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'message',
        content: message
      }));
    }
  }

  sendTypingStatus(isTyping) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'typing',
        isTyping
      }));
    }
  }

  onMessage(handler) {
    this.handlers.message.push(handler);
  }

  onTyping(handler) {
    this.handlers.typing.push(handler);
  }

  onStatusChange(handler) {
    this.handlers.status.push(handler);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const chatService = new ChatService(); 