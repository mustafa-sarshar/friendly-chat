import React, { Component } from "react";
import { View, KeyboardAvoidingView, Platform, LogBox } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { firebaseConfig } from "../../config/firebase";
const firebase = require("firebase");
require("firebase/firestore");

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

import styles from "./styles";

class ChatGadget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    // Bind the methods to the class
    this.handleUpdateChatStyles = this.handleUpdateChatStyles.bind(this);

    // Connect to the Database and the collection
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {
    // Add Message to the messages state
    this.referenceMessages = firebase.firestore().collection("messages");

    this.unsubscribe = this.referenceMessages.onSnapshot(
      this.onCollectionUpdate
    );

    // this.setState((prevState) => {
    //   return {
    //     ...prevState,
    //     messages: [
    //       {
    //         _id: 1,
    //         text: "Hello developer",
    //         createdAt: new Date(),
    //         user: {
    //           _id: 2,
    //           name: "React Native",
    //           avatar: "https://placeimg.com/140/140/any",
    //         },
    //       },
    //       {
    //         _id: 2,
    //         text: "This is a system message",
    //         createdAt: new Date(),
    //         system: true,
    //       },
    //     ],
    //   };
    // });

    // Update chat background color
    this.handleUpdateChatStyles();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate() {
    this.handleUpdateChatStyles();
  }

  handleUpdateChatStyles() {
    const { params } = this.props;

    if (params?.chatBgColor) {
      // Update the styles based on the selected ChatBgColor
      styles.chatArea = {
        ...styles.chatArea,
      };
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
      styles.lblBold = {
        ...styles.lblBold,
        color:
          params.chatBgColor.name === "White"
            ? "#000000"
            : params.chatBgColor.code,
      };
      styles.btn = {
        ...styles.btn,
        width: 90,
        borderColor:
          params.chatBgColor.name === "White"
            ? "#000000"
            : params.chatBgColor.code,
      };
      styles.btnContainer = {
        ...styles.btnContainer,
        backgroundColor: `${params.chatBgColor.code}30`,
      };
    }
  }

  handleSendMessage(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
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

    console.log(params);
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

  render() {
    const { messages } = this.state;

    return (
      <View style={styles.subContainer}>
        <View style={styles.giftedChatContainer}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={messages}
            onSend={(messages) => this.handleSendMessage(messages)}
            user={{
              _id: 1,
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
