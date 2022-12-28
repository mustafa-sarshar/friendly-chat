import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
  },

  giftedChatContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  chatArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
});

const image = require("../../assets/img/background_chat.png");

// The application’s main Chat screen that renders the chat UI
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    // Bind the methods to the class
    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleUpdateChatStyles = this.handleUpdateChatStyles.bind(this);
    this.handleGoToStart = this.handleGoToStart.bind(this);
  }

  componentDidMount() {
    // Add Message to the messages state
    this.setState((prevState) => {
      return {
        ...prevState,
        messages: [
          {
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
          {
            _id: 2,
            text: "This is a system message",
            createdAt: new Date(),
            system: true,
          },
        ],
      };
    });
    // Update the username and chat background color
    this.handleUpdateUsername();
    this.handleUpdateChatStyles();
  }

  componentDidUpdate() {
    // Update the username and chat background color
    this.handleUpdateUsername();
    this.handleUpdateChatStyles();
  }

  handleUpdateUsername() {
    const { route, navigation } = this.props;

    if (route.params?.username) {
      navigation.setOptions({
        title: "Hey, " + route.params.username,
      });
    } else {
      navigation.setOptions({ title: "Please login first" });
    }
  }

  handleUpdateChatStyles() {
    const { params } = this.props.route;

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

  handleGoToStart() {
    const { navigation } = this.props;
    navigation.navigate("Start");
  }

  handleSendMessage(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // Add custom styles to messages via Bubble
  renderBubble(props) {
    const { params } = this.props.route;

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
    const { params } = this.props.route;
    const { messages } = this.state;
    this.handleUpdateChatStyles();

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={image}
          resizeMode="cover"
        >
          <ImageBackground style={styles.chatArea} resizeMode="cover">
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
            {params?.username && (
              <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={this.handleGoToStart}>
                  <Text style={styles.lblBold}>GO BACK</Text>
                </Pressable>
              </View>
            )}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

export default Chat;
