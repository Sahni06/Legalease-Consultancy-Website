import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../store/slices/notificationSlice';
import './Notification.css';

const Notification = () => {
  const notifications = useSelector(state => state.notifications.list);
  const dispatch = useDispatch();

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          <div className="notification-content">
            {notification.title && (
              <h4>{notification.title}</h4>
            )}
            <p>{notification.message}</p>
          </div>
          <button
            className="close-btn"
            onClick={() => dispatch(removeNotification(notification.id))}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification; 