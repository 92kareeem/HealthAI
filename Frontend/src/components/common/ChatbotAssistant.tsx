import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, MinusIcon, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello, I'm HealthAI Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with patient diagnosis and treatment recommendations.",
        "You can use our AI disease prediction tools to analyze patient symptoms.",
        "Would you like me to help schedule a follow-up appointment for your patient?",
        "I can provide information about recent medical research and publications.",
        "Let me check the patient's medical history for any relevant information.",
        "I can analyze lab results and suggest potential interpretations.",
        "Would you like me to summarize the patient's treatment history?",
        "I can provide information about medication interactions and side effects.",
      ];

      const botMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-accent-500 text-white shadow-lg hover:bg-accent-600 transition-all duration-300 z-40 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 1, height: '60px', width: '300px' }
              : { opacity: 1, y: 0, scale: 1, height: 'auto', width: '350px' }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-20 right-6 bg-white dark:bg-neutral-900 rounded-lg shadow-xl overflow-hidden z-40 border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-800 bg-accent-500 text-white">
              <div className="flex items-center">
                <div className="bg-white/20 p-1.5 rounded-full mr-2">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <h3 className="font-medium">HealthAI Assistant</h3>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <MinusIcon className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-80 overflow-y-auto p-4 bg-neutral-50 dark:bg-neutral-950">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.isUser
                              ? 'bg-accent-500 text-white'
                              : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 text-neutral-900 dark:text-neutral-100 shadow-sm">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="h-2 w-2 rounded-full bg-accent-400"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                              className="h-2 w-2 rounded-full bg-accent-400"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                              className="h-2 w-2 rounded-full bg-accent-400"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    onSubmit={handleSendMessage}
                    className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
                  >
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border-none rounded-l-lg focus:ring-1 focus:ring-accent-500"
                      />
                      <button
                        type="submit"
                        disabled={!message.trim()}
                        className={`${
                          message.trim()
                            ? 'bg-accent-500 hover:bg-accent-600'
                            : 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
                        } rounded-r-lg px-4 py-2 text-white`}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAssistant;