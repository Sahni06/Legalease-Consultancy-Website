class NotificationService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Set();
  }

  connect() {
    const token = localStorage.getItem('lawyer_token');
    this.ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/notifications?token=${token}`);

    this.ws.onopen = () => {
      console.log('Notification WebSocket Connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.notifyListeners(notification);
    };

    this.ws.onclose = () => {
      console.log('Notification WebSocket Disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect();
      }, 5000 * this.reconnectAttempts); // Exponential backoff
    }
  }

  addListener(callback) {
    this.listeners.add(callback);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners(notification) {
    this.listeners.forEach(listener => listener(notification));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const notificationService = new NotificationService(); 