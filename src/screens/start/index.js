import React, { Component } from "react";
import { ImageBackground, View, Text, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ColorPicker from "../../components/color-picker";
import ChatroomCodeInput from "../../components/chatroom-code-input";
import CustomButton from "../../components/custom-button";
import UserProfileButton from "../../components/user-profile-button";

import { colors } from "../../assets/css";
import styles from "./styles";
const screenBgImage = require("../../assets/img/background/background_start.png");
import avatars_default from "../../assets/data";

// The application’s Start screen that renders the username input box
class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserProfileValid: false,
      username: "",
      userAvatar: avatars_default.default,
      chatroomCode: "",
      chatBgColor: { name: "White", code: colors.white },
    };

    // Bind the methods to the class
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changeUserAvatarHandler = this.changeUserAvatarHandler.bind(this);
    this.changeChatBgColorHandler = this.changeChatBgColorHandler.bind(this);
    this.startChatHandler = this.startChatHandler.bind(this);
    this.checkNetConnection = this.checkNetConnection.bind(this);
    this.setUserProfileHandler = this.setUserProfileHandler.bind(this);
    this.resetUserProfileHandler = this.resetUserProfileHandler.bind(this);
    this.deleteMessagesLocally = this.deleteMessagesLocally.bind(this);
  }

  componentDidMount = () => {
    this.checkNetConnection();
  };

  componentDidUpdate = () => {
    this.checkNetConnection();
  };

  changeUsernameHandler = (username) => {
    this.setState({ username });
  };

  changeUserAvatarHandler = (userAvatar) => {
    console.log("Image changed", userAvatar);
    this.setState({ userAvatar });
  };

  changeChatroomCodeHandler = (chatroomCode) => {
    this.setState({ chatroomCode });
  };

  changeChatBgColorHandler = (color) => {
    this.setState((prevState) => {
      return { ...prevState, chatBgColor: { ...color } };
    });
  };

  updateUserProfileValidationHandler = () => {
    this.setState({
      isUserProfileValid: true,
    });
  };

  setUserProfileHandler = () => {
    const { username, userAvatar, chatBgColor } = this.state;
    const { navigation } = this.props;

    navigation.navigate("User", {
      username,
      userAvatar,
      chatBgColor,
      onChangeUsername: this.changeUsernameHandler,
      onChangeUserAvatar: this.changeUserAvatarHandler,
    });
  };

  startChatHandler = () => {
    const { username, userAvatar, chatBgColor, chatroomCode } = this.state;
    const { navigation } = this.props;

    if (username.trim().length === 0) {
      Alert.alert("No username is given!!!");
    } else if (username.trim().length < 3) {
      Alert.alert("Username must be at least 3 characters long!!!");
    } else {
      this.setState(
        {
          isUserProfileValid: true,
        },
        () => {
          navigation.navigate("Chat", {
            username,
            userAvatar,
            chatBgColor,
            chatroomCode,
          });
        }
      );
    }
  };

  resetUserProfileHandler = () => {
    Alert.alert(
      "Reset Profile",
      "Be careful!!! If you click OK, all your profile data, and all locally saved messages will be deleted and reset.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            this.setState(
              {
                isUserProfileValid: false,
                username: "",
                userAvatar: avatars_default.default,
                chatroomCode: "",
                chatBgColor: { name: "White", code: colors.white },
              },
              async () => {
                await this.deleteMessagesLocally();
              }
            ),
        },
      ]
    );
  };

  deleteMessagesLocally = async () => {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (err) {
      console.error(err.message);
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
    const {
      isUserProfileValid,
      username,
      userAvatar,
      chatBgColor,
      chatroomCode,
    } = this.state;
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

            {!isUserProfileValid ? (
              //  Show the Set User Profile button, only if the user profile is not set yet
              <UserProfileButton
                colorSettings={{ chatBgColor, btnTitleColor }}
                onPress={this.setUserProfileHandler}
                titleStyle={{ color: btnTitleColor }}
                titleText="Set user profile"
                buttonHint="Press the button to got to the user profile"
              />
            ) : (
              // Show the Reset Profile button, only if the user profile is already set successfully
              <UserProfileButton
                colorSettings={{ chatBgColor, btnTitleColor }}
                onPress={this.resetUserProfileHandler}
                titleStyle={{ color: btnTitleColor }}
                titleText="Reset user profile"
                buttonHint="Press the button to reset the user profile"
              />
            )}
            <ChatroomCodeInput
              chatroomCode={chatroomCode}
              onChangeText={this.changeChatroomCodeHandler}
              colorSettings={{ btnBgColor, btnTitleColor }}
            />
            <ColorPicker
              textColor={btnTitleColor}
              onChatBgColorChange={this.changeChatBgColorHandler}
            />
            <CustomButton
              onPress={this.startChatHandler}
              colorSettings={{ btnBgColor, btnTitleColor }}
              titleText="START CHAT"
              buttonHint="Press the button to go to the chat room"
            />
          </View>
        </ImageBackground>
      </View>
    );
  };
}

export default Start;
