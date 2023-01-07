import React, { Component } from "react";
import { ImageBackground, View, Text, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import ColorPicker from "../../components/color-picker";
import ChatroomCodeInput from "../../components/chatroom-code-input";
import GoToChatButton from "../../components/go-to-chat-button";
import GoToUserProfileButton from "../../components/go-to-user-profile-button";

import { colors } from "../../assets/css";
import styles from "./styles";
const screenBgImage = require("../../assets/img/background/background_start.png");
import avatars_default from "../../assets/data";

// The application’s Start screen that renders the username input box
class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      userImage: avatars_default.male,
      chatroomCode: "",
      chatBgColor: { name: "White", code: colors.white },
    };

    // Bind the methods to the class
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changeUserImageHandler = this.changeUserImageHandler.bind(this);
    this.changeChatBgColorHandler = this.changeChatBgColorHandler.bind(this);
    this.goToChatHandler = this.goToChatHandler.bind(this);
    this.checkNetConnection = this.checkNetConnection.bind(true);
  }

  componentDidMount = () => {
    this.checkNetConnection();
  };

  componentDidUpdate = () => {
    this.checkNetConnection();
  };

  changeUsernameHandler = (username) => {
    console.log("changeUsernameHandler", username);
    this.setState({ username });
  };

  changeUserImageHandler = (userImage) => {
    console.log("Image changed", userImage);
    this.setState({ userImage });
  };

  changeChatroomCodeHandler = (chatroomCode) => {
    this.setState({ chatroomCode });
  };

  changeChatBgColorHandler(color) {
    this.setState((prevState) => {
      return { ...prevState, chatBgColor: { ...color } };
    });
  }

  goToUserProfileHandler = (evt) => {
    evt.preventDefault();

    const { username, userImage, chatBgColor } = this.state;
    const { navigation } = this.props;

    navigation.navigate("User", {
      username,
      userImage,
      chatBgColor,
      onChangeUsername: this.changeUsernameHandler,
      onChangeUserImage: this.changeUserImageHandler,
    });
  };

  goToChatHandler = (evt) => {
    evt.preventDefault();

    const { username, userImage, chatBgColor, chatroomCode } = this.state;
    const { navigation } = this.props;

    if (username.trim().length === 0) {
      Alert.alert("No username is given!!!");
    } else if (username.trim().length < 3) {
      Alert.alert("Username must be at least 3 characters long!!!");
    } else {
      navigation.navigate("Chat", {
        username,
        userImage,
        chatBgColor,
        chatroomCode,
      });
    }
  };

  checkNetConnection = () => {
    const { navigation } = this.props;

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        navigation.setOptions({
          title: "",
        });
      } else {
        navigation.setOptions({
          title: "(offline mode)",
        });
      }
    });
  };

  render = () => {
    const { username, userImage, chatBgColor, chatroomCode } = this.state;
    const btnTitleColor =
      chatBgColor.name === "White" ? "#000000" : chatBgColor.code;
    const btnBgColor =
      chatBgColor.name === "White" ? "#FFFFFF" : chatBgColor.code;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={screenBgImage}
          resizeMode="cover"
        >
          <View style={styles.subContainer}>
            <Text style={[styles.lblWelcome, { color: btnTitleColor }]}>
              Welcome to Musto Friendly-Chat
            </Text>
            <GoToUserProfileButton
              username={username}
              userImage={userImage}
              colorSettings={{ chatBgColor, btnTitleColor }}
              onGoToUserProfile={this.goToUserProfileHandler}
            />
            <ChatroomCodeInput
              chatroomCode={chatroomCode}
              onChangeText={this.changeChatroomCodeHandler}
              colorSettings={{ btnBgColor, btnTitleColor }}
            />
            <ColorPicker
              textColor={btnTitleColor}
              onChatBgColorChange={this.changeChatBgColorHandler}
            />
            <GoToChatButton
              onGoToChat={this.goToChatHandler}
              colorSettings={{ btnBgColor, btnTitleColor }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  };
}

export default Start;
