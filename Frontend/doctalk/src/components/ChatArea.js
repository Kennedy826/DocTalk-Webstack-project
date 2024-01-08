import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatArea = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 2, sender: 'Mahbub', text: 'Hi there!' },

  ]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up on unmount
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        // Handle received messages and update state
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && socket) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You', // Assuming the sender is the current user
        text: inputMessage.trim(),
      };

      socket.emit('message', newMessage); // Emit the message to the server

      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
        <div className="flex  items-center justify-center flex-1 h-screen  overflow-y-auto bg-gray-100 p-4">
      <div className="flex flex-col space-y-5">
        {messages.map(message => (
          <div key={message.id} className="flex flex-col">
            <span className="text-gray-500 text-sm">{message.sender}</span>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className='h-150 '>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;