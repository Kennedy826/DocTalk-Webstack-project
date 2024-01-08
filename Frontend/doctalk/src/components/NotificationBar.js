import React, { useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';

const NotificationBar = () => {
  const [newChatNotification, setNewChatNotification] = useState(false);

  // Simulate a new chat arriving after some delay (e.g., 3 seconds)
  const simulateNewChat = () => {
    setNewChatNotification(true);

    // After 3 seconds, reset the notification
    setTimeout(() => {
      setNewChatNotification(false);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-end p-4">
      <button className="focus:outline-none" onClick={simulateNewChat}>
        <IoIosNotifications size={24} />
      </button>
      {newChatNotification && (
        <div className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2">
          New Chat!
        </div>
      )}
    </div>
  );
};

export default NotificationBar;