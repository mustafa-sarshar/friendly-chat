import React, { Component } from "react";
import { View, KeyboardAvoidingView, Platform, LogBox } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";

import { firebaseConfig, COLLECTION_NAME } from "../../config/firebase";

import styles from "./styles";
import Robot from "./robot";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

class ChatGadget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: 0,
      messages: [],
    };

    // Bind the methods to the class
    this.handleUpdateChatStyles = this.handleUpdateChatStyles.bind(this);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);

    // Init the firebase app
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firebaseColRef = undefined;
    // Get the database
    this.firebaseStore = getFirestore(this.firebaseApp);

    this.robot = Robot();
  }

  componentDidMount() {
    // Set a Collection Ref
    this.firebaseColRef = collection(this.firebaseStore, COLLECTION_NAME);
    // Get Authentication
    this.firebaseAuth = getAuth(this.firebaseApp);
    this.unsubscribeAuth = onAuthStateChanged(
      this.firebaseAuth,
      async (user) => {
        if (!user) {
          await signInAnonymously(this.firebaseAuth)
            .then((data) => {
              console.log("Signed in successfully!");
            })
            .catch((err) => {
              console.error(err.message);
            });
        } else {
          console.log("currentUser", user.uid);
          this.setState({
            uid: user.uid,
          });

          // Define a query
          this.firebaseQuery = query(
            this.firebaseColRef,
            where("uid", "==", user.uid),
            orderBy("serverReceivedAt", "desc")
          );
          // Subscribe a snapshot to the collection
          this.unsubscribeSnapshots = onSnapshot(
            this.firebaseQuery,
            this.onCollectionUpdate
          );
        }
      }
    );

    // Update chat background color
    this.handleUpdateChatStyles();
  }

  componentWillUnmount() {
    if (this.unsubscribeSnapshots) {
      this.unsubscribeSnapshots();
    }
  }

  componentDidUpdate() {
    this.handleUpdateChatStyles();
  }

  handleUpdateChatStyles() {
    const { params } = this.props;

    if (params?.chatBgColor) {
      // Update the styles based on the selected ChatBgColor
      styles.giftedChatContainer = {
        ...styles.giftedChatContainer,
        backgroundColor: `${params.chatBgColor.code}30`,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:
          params.chatBgColor.name === "White"
            ? "#00000050"
            : `${params.chatBgColor.code}50`,
      };
      styles.subContainer = {
        ...styles.subContainer,
        backgroundColor: `${params.chatBgColor.code}90`,
      };
    }
  }

  handleSignIn(user) {
    console.log("handleSignIn", user);

    if (!user) {
      signInAnonymously(this.firebaseAuth)
        .then((cred) => {
          console.log("signInAnonymously", cred);
          this.setState({
            uid: cred.data().uid,
            messages: [],
          });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }

  handleSendMessage(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onMessageSend(messages = []) {
    const { uid } = this.state;

    addDoc(this.firebaseColRef, {
      _id: messages[0]._id,
      user: messages[0].user,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      serverReceivedAt: serverTimestamp(),
      uid: uid,
    })
      .then(async () => {
        console.log("Message sent successfully");
        addDoc(this.firebaseColRef, {
          _id: Math.floor(Math.random() * 1000),
          user: {
            _id: 2,
            name: "Robot",
            avatar: "https://picsum.photos/id/30/140/140",
          },
          text: await this.robot(),
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
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  onCollectionUpdate = (snapshot) => {
    const messages = [];

    snapshot.docs.forEach((doc) => {
      const { uid } = this.state;
      const data = doc.data();

      messages.push({
        _id: data._id,
        user: data.user,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        serverReceivedAt: serverTimestamp(),
        uid: uid,
      });
    });

    this.setState({
      messages,
    });
  };

  // Add custom styles to messages via Bubble
  renderBubble(props) {
    const { params } = this.props;

    let customColorBG = "#000000";
    let customColorOuter = "#FFFFFF50";
    let customColorInner = "#FFFFFF";

    if (params?.chatBgColor) {
      if (params.chatBgColor.name === "White") {
        customColorBG = params.chatBgColor.code;
        customColorInner = "#000000";
        customColorOuter = "#00000050";
      }
    }
    const styleWrappers = {
      borderWidth: 1,
      borderColor: customColorOuter,
    };

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            ...styleWrappers,
            backgroundColor: `${customColorBG}25`,
          },
          right: {
            ...styleWrappers,
            backgroundColor: `${customColorBG}50`,
          },
        }}
        textProps={{
          style: {
            color: customColorInner,
            fontWeight: "bold",
          },
        }}
        timeTextStyle={{
          left: {
            color: customColorInner,
          },
          right: {
            color: customColorInner,
          },
        }}
      />
    );
  }

  handleReset() {
    const { uid } = this.state;
    const { currentUser } = this.firebaseAuth;

    if (currentUser) {
      this.unsubscribeAuth();
      signOut(this.firebaseAuth).then(() => {
        deleteUser(currentUser).then(() => {
          console.log(`The user: ${uid} signed out successfully`);
          this.setState({
            uid: 0,
            message: [],
          });
        });
      });
    }
  }

  render() {
    const { messages } = this.state;
    const { params } = this.props;

    return (
      <View style={styles.subContainer}>
        <View style={styles.giftedChatContainer}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={messages}
            // onSend={(messages) => this.handleSendMessage(messages)}
            onSend={(messages) => this.onMessageSend(messages)}
            user={{
              _id: 1,
              name: params.username && params.username,
              avatar: "https://picsum.photos/id/1/140/140",
            }}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    );
  }
}

export default ChatGadget;
