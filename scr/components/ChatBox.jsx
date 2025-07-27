import React, { useState } from 'react';
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1391749380884664361/7_8_pR_pxoQaqCe-blfAoSkvqYE3JmLuRn6zNuya-iXdRJAf0vacc_Vt0w1XyTeAxF7k";

const sendToDiscord = async (message, time = '', user = 'Khách') => {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `💬 Tin nhắn từ ${user} lúc ${time}:\n${message}`
      })
    });
  } catch (err) {
    // Có thể xử lý lỗi ở đây nếu muốn
  }
};

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const time = new Date().toLocaleTimeString();
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Gửi về Discord webhook
      await sendToDiscord(inputMessage, time);

      // Auto reply
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
          sender: 'bot',
          time: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const connectFacebook = () => {
    window.open('https://m.me/your-facebook-page', '_blank');
  };

  return (
    <div className="chat-widget">
      <div className={`chat-box ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h4>Hỗ trợ trực tuyến</h4>
          <div className="chat-actions">
            <button onClick={connectFacebook} className="fb-btn">
              <i className="fab fa-facebook-messenger"></i>
            </button>
            <button onClick={toggleChat} className="close-btn">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <button className="chat-toggle" onClick={toggleChat}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>
    </div>
  );
};

export default ChatBox;
