import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get('/api/messages', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(res.data);
        };
        fetchMessages();
    }, []);

    const handleSend = async () => {
        await axios.post('/api/messages', { message, receiver: 'some-user-id' }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessage('');
    };

    return (
        <div>
            <h1>Messages</h1>
            <div className="chat-window">
                {messages.map((msg) => (
                    <div key={msg._id}>
                        <p><strong>{msg.sender.name}:</strong> {msg.message}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;
