import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    marginBottom: 40,
    alignItems: "center",
    backgroundColor: "#ffffff80",
  },

  subContainerColors: {
    flexDirection: "row",
    marginBottom: 40,
    backgroundColor: "#ffffff70",
  },

  txtInput: {
    height: 40,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: 200,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  lblWelcome: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff50",
  },

  colorCircles: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    border: "10px solid black",
    margin: 5,
    elevation: 5,
  },
  colorRed: {
    backgroundColor: "red",
  },
  colorGreen: {
    backgroundColor: "green",
  },
  colorBlue: {
    backgroundColor: "blue",
  },
  colorGray: {
    backgroundColor: "gray",
  },
});

const image = require("../../assets/img/background_start.png");

// The application’s Start screen that renders the username input box
class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      chatBgColor: { code: "#ffffff", name: "White" },
    };

    // Bind the methods to the class
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChatBgColorChange = this.handleChatBgColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(username) {
    this.setState({ username });
  }

  handleChatBgColorChange(color) {
    this.setState((prevState) => {
      console.log("Prev", prevState);
      return { ...prevState, chatBgColor: { ...color } };
    });
    Alert.alert(`Chat screen background color set to: ${color.name}`);
    console.log("Post", this.state);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { username, chatBgColor } = this.state;
    const { navigation } = this.props;

    if (username.trim().length === 0) {
      Alert.alert("No username is given!!!");
    } else if (username.trim().length < 3) {
      Alert.alert("Username must be at least 3 characters long!!!");
    } else {
      Alert.alert(`Logged in via username:\n${username}`);
      navigation.navigate("Chat", { username, chatBgColor });
    }
  }

  render() {
    const { username } = this.state;

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
            <View style={styles.subContainer}>
              <Text style={styles.lblBold}>Username</Text>
              <TextInput
                style={styles.txtInput}
                value={username}
                placeholder="enter your username please"
                onChangeText={this.handleTextChange}
              />
            </View>
            <View style={styles.subContainer}>
              <Text>Select you favorite background color</Text>
              <View style={styles.subContainerColors}>
                <Pressable
                  key="colorRed"
                  style={[styles.colorCircles, styles.colorRed]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      code: "#FF0000",
                      name: "Red",
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorGreen"
                  style={[styles.colorCircles, styles.colorGreen]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      code: "#00FF00",
                      name: "Green",
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorBlue"
                  style={[styles.colorCircles, styles.colorBlue]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      code: "#0000FF",
                      name: "Blue",
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorGray"
                  style={[styles.colorCircles, styles.colorGray]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      code: "#808080",
                      name: "Gray",
                    })
                  }
                ></Pressable>
              </View>
            </View>
            <Pressable style={styles.btn} onPress={this.handleSubmit}>
              <Text style={styles.lblBold}>GO TO CHAT</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Start;
