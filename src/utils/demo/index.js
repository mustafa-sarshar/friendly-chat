import { addDoc, serverTimestamp } from "firebase/firestore";

const RobotDemo = async (firebaseColRef, robot, uid) => {
  // Just for Demo Purposes //////////////////////////////////////
  await addDoc(firebaseColRef, {
    _id: Math.floor(Math.random() * 1000),
    user: {
      _id: 2,
      name: "Robot",
      avatar: "https://picsum.photos/id/30/140/140",
    },
    text: await robot(),
    createdAt: new Date(),
    serverReceivedAt: serverTimestamp(),
    uid: uid,
  })
    .then(() => {
      console.log("Automatic reply sent successfully");
    })
    .catch((err) => {
      console.error(err.message);
    });
  ////////////////////////////////////////////////////////////////
};

export default RobotDemo;
