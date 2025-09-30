import { useState } from 'react';
import './Chat.css';

const initialMessages = [
  { id: 1, user: 'Alice', text: 'Hey everyone!' },
  { id: 2, user: 'Bob', text: 'Hello! Glad to be here.' },
  { id: 3, user: 'You', text: 'Hi Alice and Bob!' },
];

const users = ['Alice', 'Bob', 'Charlie'];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      user: 'You',
      text: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      {/* User List Sidebar */}
      <div className="user-list-sidebar">
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {/* Message Display */}
        <div className="message-display">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.user === 'You' ? 'text-right' : ''}`}>
              <div className={`message-bubble ${msg.user === 'You' ? 'user-message' : 'other-message'}`}>
                <div className="user-name">{msg.user}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="message-input-container">
          <form onSubmit={handleSendMessage} className="message-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input"
              placeholder="Type a message..."
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}