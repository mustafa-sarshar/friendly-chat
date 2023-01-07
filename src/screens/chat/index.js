import React, { Component } from "react";
import { ImageBackground, View } from "react-native";

import styles from "./styles";
import ChatGadget from "../../components/chat-gadget";
import GoToStartButton from "../../components/go-to-start-button";
const screenBgImage = require("../../assets/img/background/background_chat.png");

// The application’s main Chat screen that renders the chat UI
class Chat extends Component {
  constructor(props) {
    super(props);

    // Bind the methods to the class
    this.updateUsernameHandler = this.updateUsernameHandler.bind(this);
    this.goToStartHandler = this.goToStartHandler.bind(this);
  }

  componentDidMount = () => {
    this.updateUsernameHandler();
  };

  componentDidUpdate = () => {
    this.updateUsernameHandler();
  };

  updateUsernameHandler = () => {
    const { route, navigation } = this.props;

    if (route.params?.username) {
      navigation.setOptions({
        title: "Hey, " + route.params.username,
      });
    } else {
      navigation.setOptions({ title: "Please login first" });
    }
  };

  goToStartHandler = () => {
    const { navigation } = this.props;
    navigation.navigate("Start");
  };

  render = () => {
    const { params } = this.props.route;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={screenBgImage}
          resizeMode="cover"
        >
          <ImageBackground style={styles.chatArea} resizeMode="cover">
            <ChatGadget params={params} />
            {params?.username && (
              <GoToStartButton
                onGoToStart={this.goToStartHandler}
                chatBgColor={params.chatBgColor}
              />
            )}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  };
}

export default Chat;
