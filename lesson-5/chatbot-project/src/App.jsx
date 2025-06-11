import { useState } from 'react';
import './App.css'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

function App() {
  const [chatMessages, setChatMessages] = useState([{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  }, {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2'
  }, {
    message: 'can you get me todays date?',
    sender: 'user',
    id: 'id3'
  }, {
    message: 'Today is September 27',
    sender: 'robot',
    id: 'id4'
  }]);

  return (
    <div className="chat-app-wrapper">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
