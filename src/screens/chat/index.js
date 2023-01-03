import React, { Component } from "react";
import { ImageBackground, View } from "react-native";

import styles from "./styles";
import ChatGadget from "../../components/chat-gadget";
import GoToStartButton from "../../components/go-to-start-button";
const image = require("../../assets/img/background_chat.png");

// The application’s main Chat screen that renders the chat UI
class Chat extends Component {
  constructor(props) {
    super(props);

    // Bind the methods to the class
    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleGoToStart = this.handleGoToStart.bind(this);
  }

  componentDidMount() {
    this.handleUpdateUsername();
  }

  componentDidUpdate() {
    this.handleUpdateUsername();
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

  handleGoToStart() {
    const { navigation } = this.props;
    navigation.navigate("Start");
  }

  render() {
    const { params } = this.props.route;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={image}
          resizeMode="cover"
        >
          <ImageBackground style={styles.chatArea} resizeMode="cover">
            <ChatGadget params={params} />
            {params?.username && (
              <GoToStartButton
                onGoToStart={this.handleGoToStart}
                chatBgColor={params.chatBgColor}
              />
            )}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

export default Chat;
