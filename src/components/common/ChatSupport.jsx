import React, { useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Integrate with AI chatbot API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={toggleChat}
            className="bg-brand-primary hover:bg-brand-secondary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
            aria-label="Open chat support"
          >
            <FiMessageCircle size={24} />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-brand-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">Hỗ trợ AI</h3>
                  <p className="text-xs opacity-90">Luôn sẵn sàng hỗ trợ bạn</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="hover:bg-white/20 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {/* Welcome Message */}
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white font-bold">AI</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                    <p className="text-sm text-text-primary">
                      Xin chào! Tôi là trợ lý AI của Elysian Realm. Tôi có thể giúp bạn tìm chuyến đi phù hợp, trả lời câu hỏi về du lịch, hoặc hỗ trợ đặt tour/flight. Bạn cần giúp gì hôm nay?
                    </p>
                  </div>
                </div>

                {/* Placeholder for future messages */}
                <div className="text-center text-text-secondary text-xs mt-4">
                  Chatbot AI sẽ được tích hợp trong tương lai
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border-primary bg-white rounded-b-lg">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn của bạn..."
                  className="flex-1 px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-brand-primary hover:bg-brand-secondary disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleChat}
        />
      )}
    </>
  );
};

export default ChatSupport;
