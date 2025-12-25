// src/components/provider/CustomerCommunication.jsx
import { useState, useEffect } from 'react';

const CustomerCommunication = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      customerId: 'CUST001',
      customerName: 'Rahul Sharma',
      lastMessage: 'What time will my order be delivered?',
      unreadCount: 2,
      lastActive: '10 min ago',
      orderId: 'ORD001',
      status: 'online'
    },
    {
      id: 2,
      customerId: 'CUST002',
      customerName: 'Priya Patel',
      lastMessage: 'Can you add extra fabric softener?',
      unreadCount: 0,
      lastActive: '1 hour ago',
      orderId: 'ORD002',
      status: 'offline'
    },
    {
      id: 3,
      customerId: 'CUST003',
      customerName: 'Amit Kumar',
      lastMessage: 'Thanks for the quick service!',
      unreadCount: 0,
      lastActive: 'Yesterday',
      orderId: 'ORD003',
      status: 'offline'
    },
    {
      id: 4,
      customerId: 'CUST004',
      customerName: 'Sneha Gupta',
      lastMessage: 'I have some special instructions...',
      unreadCount: 1,
      lastActive: 'Just now',
      orderId: 'ORD004',
      status: 'online'
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // Mock messages for the conversation
      setMessages([
        {
          id: 1,
          sender: 'customer',
          text: 'Hello, I have a question about my order.',
          time: '10:30 AM',
          orderRef: selectedConversation.orderId
        },
        {
          id: 2,
          sender: 'provider',
          text: 'Hi! How can I help you with your order?',
          time: '10:32 AM'
        },
        {
          id: 3,
          sender: 'customer',
          text: 'Can you use gentle detergent for my silk saree?',
          time: '10:33 AM'
        },
        {
          id: 4,
          sender: 'provider',
          text: 'Yes, we use special detergent for delicate fabrics. Your saree will be handled with care.',
          time: '10:35 AM'
        },
        {
          id: 5,
          sender: 'customer',
          text: 'Great! Also, I uploaded photos showing some stains.',
          time: '10:36 AM'
        },
        {
          id: 6,
          sender: 'provider',
          text: 'We noticed the photos. Our stain removal specialist will work on those stains.',
          time: '10:38 AM'
        }
      ]);

      // Mark as read
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  }, [selectedConversation]);

  const sendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'provider',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: message, lastActive: 'Just now' }
          : conv
      )
    );
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col lg:flex-row gap-6">
      {/* Left: Conversations List */}
      <div className="lg:w-1/3 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Customer Messages</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers or orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-3 top-3.5 text-white/50">🔍</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                selectedConversation?.id === conversation.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {conversation.customerName.charAt(0)}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                    conversation.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-white truncate">
                      {conversation.customerName}
                    </div>
                    <div className="flex items-center gap-2">
                      {conversation.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                      <span className="text-xs text-white/50">
                        {conversation.lastActive}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-white/70 truncate mb-1">
                    {conversation.lastMessage}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      Order #{conversation.orderId}
                    </span>
                    <span className="text-xs text-white/50">
                      Click to view photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Chat Area */}
      <div className="lg:w-2/3 flex flex-col bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 bg-linear-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {selectedConversation.customerName.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-900 ${
                      selectedConversation.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedConversation.customerName}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70">
                      <span>Customer ID: {selectedConversation.customerId}</span>
                      <span className="text-white/30">•</span>
                      <span>Order: #{selectedConversation.orderId}</span>
                      <span className="text-white/30">•</span>
                      <span className={`${selectedConversation.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                        {selectedConversation.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2">
                    📸 View Photos
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors">
                    Call Customer
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-2xl p-4 ${
                    msg.sender === 'provider'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 rounded-br-none'
                      : 'bg-white/10 rounded-bl-none'
                  }`}>
                    <div className="text-white">{msg.text}</div>
                    <div className={`text-xs mt-2 ${
                      msg.sender === 'provider' ? 'text-blue-200' : 'text-white/50'
                    }`}>
                      {msg.time}
                      {msg.sender === 'provider' && ' • You'}
                      {msg.orderRef && ` • Order #${msg.orderRef}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message here..."
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="absolute right-3 top-3 flex gap-2">
                    <button className="p-2 text-white/50 hover:text-white">
                      📎
                    </button>
                    <button className="p-2 text-white/50 hover:text-white">
                      📸
                    </button>
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-colors">
                  ⏰ Request More Time
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-colors">
                  📋 Send Status Update
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 text-sm transition-colors">
                  💰 Discuss Price
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-7xl mb-6 opacity-50">💬</div>
            <h3 className="text-2xl font-bold text-white mb-3">Select a Conversation</h3>
            <p className="text-white/70 text-center max-w-md">
              Choose a customer from the list to view messages, discuss orders, and provide updates about their laundry service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCommunication;