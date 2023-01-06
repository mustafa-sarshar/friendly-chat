import React, { Component } from "react";
import { ImageBackground, View, Text, Alert } from "react-native";

import { colors } from "../../assets/css";
import styles from "./styles";
import ColorPicker from "../../components/color-picker";
import UsernameInput from "../../components/username-input";
import GoToChatButton from "../../components/go-to-chat-button";
const image = require("../../assets/img/background_start.png");

// The application’s Start screen that renders the username input box
class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      chatBgColor: { name: "White", code: colors.white },
    };

    // Bind the methods to the class
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChatBgColorChange = this.handleChatBgColorChange.bind(this);
    this.handleGoToChat = this.handleGoToChat.bind(this);
  }

  handleTextChange = (username) => {
    this.setState({ username });
  };

  handleChatBgColorChange(color) {
    this.setState((prevState) => {
      return { ...prevState, chatBgColor: { ...color } };
    });
  }

  handleGoToChat = (evt) => {
    evt.preventDefault();

    const { username, chatBgColor } = this.state;
    const { navigation } = this.props;

    if (username.trim().length === 0) {
      Alert.alert("No username is given!!!");
    } else if (username.trim().length < 3) {
      Alert.alert("Username must be at least 3 characters long!!!");
    } else {
      navigation.navigate("Chat", { username, chatBgColor });
    }
  };

  render = () => {
    const { username, chatBgColor } = this.state;
    const btnTitleColor =
      chatBgColor.name === "White" ? "#000000" : chatBgColor.code;
    const btnBgColor =
      chatBgColor.name === "White" ? "#FFFFFF" : chatBgColor.code;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={image}
          resizeMode="cover"
        >
          <View style={styles.subContainer}>
            <Text style={styles.lblWelcome}>
              Welcome to Musto Friendly-Chat
            </Text>
            <UsernameInput
              username={username}
              onTextChange={this.handleTextChange}
              colorSettings={{ btnBgColor, btnTitleColor }}
            />
            <ColorPicker onChatBgColorChange={this.handleChatBgColorChange} />
            <GoToChatButton
              onGoToChat={this.handleGoToChat}
              colorSettings={{ btnBgColor, btnTitleColor }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };
}

export default Start;
