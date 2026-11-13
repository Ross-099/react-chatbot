import { useState } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import ChatMessages from './components/ChatMessages.jsx'
import './App.css'

// function ChatMessages({ chatMessages, setChatMessages }) {
//   const chatMessagesRef = React.useRef(null);

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <div className="welcome-message">
          Welcome to Chat Bot!
          Type a message to start chatting. <br />

          Note: This Chat Bot can only provide today's date, roll a dice.
        </div>
      )}
      <ChatMessages
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
