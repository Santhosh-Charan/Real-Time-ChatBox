// client/src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => console.log('✅ Connected to WebSocket server');
    ws.onmessage = async (e) => {
      const msg = typeof e.data === 'string' ? e.data : await e.data.text();
      setChat((prev) => [...prev, msg]);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.send(message);
      setMessage('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="chat-container">
      <h2>💬 Real-Time Chat</h2>
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <div key={idx} className="chat-message">{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
