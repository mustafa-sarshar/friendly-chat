import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    marginBottom: 40,
    width: "100%",
    padding: 20,
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

    // Bind the methods to the class
    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
    this.handleUpdateChatBgColor = this.handleUpdateChatBgColor.bind(this);
    this.handleGoToStart = this.handleGoToStart.bind(this);
  }

  componentDidMount() {
    // Update the username and chat background color
    this.handleUpdateUsername();
    this.handleUpdateChatBgColor();
  }

  componentDidUpdate() {
    // Update the username and chat background color
    this.handleUpdateUsername();
    this.handleUpdateChatBgColor();
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

  handleUpdateChatBgColor() {
    const { route } = this.props;

    if (route.params?.chatBgColor) {
      styles.chatArea = {
        ...styles.chatArea,
        backgroundColor: `${route.params.chatBgColor.code}25`,
      };
      styles.subContainer = {
        ...styles.subContainer,
        backgroundColor: `${route.params.chatBgColor.code}70`,
      };
    }
  }

  handleGoToStart() {
    const { navigation } = this.props;
    navigation.navigate("Start");
  }

  render() {
    const { route } = this.props;
    this.handleUpdateChatBgColor();

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={image}
          resizeMode="cover"
        >
          <ImageBackground style={styles.chatArea} resizeMode="cover">
            <View style={styles.subContainer}>
              {route.params?.username && (
                <Pressable style={styles.btn} onPress={this.handleGoToStart}>
                  <Text style={styles.lblBold}>GO BACK</Text>
                </Pressable>
              )}
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

export default Chat;
