import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationService } from '../../services/websocket/NotificationService';
import { addNotification } from '../../store/slices/notificationSlice';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to WebSocket
    notificationService.connect();

    // Add notification listener
    const handleNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show toast notification
      dispatch(addNotification({
        type: notification.type,
        message: notification.message,
        title: notification.title
      }));
    };

    notificationService.addListener(handleNotification);

    // Fetch existing notifications
    fetchNotifications();

    return () => {
      notificationService.removeListener(handleNotification);
      notificationService.disconnect();
    };
  }, [dispatch]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/lawyer/notifications');
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`/api/lawyer/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read"
                onClick={async () => {
                  try {
                    await fetch('/api/lawyer/notifications/read-all', {
                      method: 'PUT'
                    });
                    setNotifications(prev =>
                      prev.map(n => ({ ...n, read: true }))
                    );
                    setUnreadCount(0);
                  } catch (error) {
                    console.error('Error marking all as read:', error);
                  }
                }}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    // Handle notification click (e.g., navigation)
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="notification-icon">
                    <i className={`fas fa-${notification.icon || 'bell'}`}></i>
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.createdAt).toRelative()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notifications">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 