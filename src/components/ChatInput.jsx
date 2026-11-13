import { useState } from 'react'
import LoadingSpinnerImage from '../assets/loading-spinner.gif'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    // console.log(event.target.value);
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setInputText('');


    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be remove later, when we add the response.
      {
        message: <img src={LoadingSpinnerImage} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  return (
    <div className="chat-input-conatiner">
      <input
        className="chat-input"
        placeholder="Send a message to Chat Bot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setInputText('');
          } else if (e.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}