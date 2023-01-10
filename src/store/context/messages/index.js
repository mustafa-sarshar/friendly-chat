import { createContext, useState } from "react";

export const MessagesContext = createContext({
  messages: [],
  getMessages: () => {},
  addMessage: (message) => {},
  deleteMessage: (message) => {},
});

function MessagesContextProvider({ children }) {
  const [messages, setMessages] = useState([]);

  function getMessages(message) {
    return messages;
  }

  function addMessage(message) {
    setMessages((curMessages) => [...curMessages, message]);
  }

  function deleteMessage(message) {
    setMessages((curMessages) =>
      curMessages.filter((curMessage) => curMessage !== message)
    );
  }

  const value = {
    messages,
    getMessages,
    addMessage,
    deleteMessage,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesContextProvider;
