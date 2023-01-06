// Simulate a Robot
const Robot = () => {
  const autoMessages = [
    "Hi, Mike, I'm Jessica 👱, What's Up?",
    "Where are you now? Can you send me a location?",
    "Where is it?",
    "What??? 😮😮😮 Do you work in NBA???",
    "You mean you are Michael Jordan, the GOAT? 😮",
    "Come on 🤣, send me your photo, if you really are the MJ 😉",
    "Anybody can have this photo. Take a selfie and send it to me now!!!",
    "🤣🤣🤣 where are you then in this photo?",
    "OK, I do believe you are MJ 😂, by the way you are so funny!!!",
    "You too, bye 😘",
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
