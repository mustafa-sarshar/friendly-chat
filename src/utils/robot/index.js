// Simulate a Robot
const Robot = () => {
  const autoMessages = [
    "Hi, Ali, What's Up?",
    "I'm am very glad that you are here! Ali!",
    "I'm a real person, don't even doubt about it :)",
    "How can I help you?",
  ];
  let curIndex = -1;

  const sendMessage = () => {
    if (curIndex < autoMessages.length - 1) {
      curIndex++;
      return autoMessages[curIndex];
    } else {
      curIndex = -1;
      return "I'm tired, going to sleep, Bye Bye !!!";
    }
  };
  return sendMessage;
};

export default Robot;
