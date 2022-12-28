import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";

const colors = {
  white: "#FFFFFF",
  red: "#960905",
  green: "#275c33",
  blue: "#0245cc",
  gray: "#777a80",
};

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff80",
  },

  subContainerColors: {
    flexDirection: "row",
    backgroundColor: "#ffffff70",
    marginBottom: 30,
  },

  usernameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },

  txtInput: {
    height: 40,
    padding: 10,
    width: 200,
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#FFFFFF",
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
  colorWhite: {
    backgroundColor: colors.white,
  },
  colorRed: {
    backgroundColor: colors.red,
  },
  colorGreen: {
    backgroundColor: colors.green,
  },
  colorBlue: {
    backgroundColor: colors.blue,
  },
  colorGray: {
    backgroundColor: colors.gray,
  },
});

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(username) {
    this.setState({ username });
  }

  handleChatBgColorChange(color) {
    this.setState((prevState) => {
      return { ...prevState, chatBgColor: { ...color } };
    });
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
      navigation.navigate("Chat", { username, chatBgColor });
    }
  }

  render() {
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
            <View style={styles.subContainer}>
              <Text style={styles.lblBold}>Username</Text>
              <View
                style={[
                  styles.usernameWrapper,
                  { borderColor: `${btnTitleColor}30` },
                ]}
              >
                <Image
                  style={styles.icon}
                  source={require("../../assets/img/user_24px.png")}
                />
                <TextInput
                  style={[
                    styles.txtInput,
                    { backgroundColor: `${btnBgColor}20` },
                  ]}
                  value={username}
                  placeholder="enter your username please"
                  onChangeText={this.handleTextChange}
                />
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text>Select you favorite background color</Text>
              <Text>for chatting</Text>
              <View style={styles.subContainerColors}>
                <Pressable
                  key="colorRed"
                  style={[styles.colorCircles, styles.colorRed]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      name: "Red",
                      code: colors.red,
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorGreen"
                  style={[styles.colorCircles, styles.colorGreen]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      name: "Green",
                      code: colors.green,
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorWhite"
                  style={[styles.colorCircles, styles.colorWhite]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      name: "White",
                      code: colors.white,
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorBlue"
                  style={[styles.colorCircles, styles.colorBlue]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      name: "Blue",
                      code: colors.blue,
                    })
                  }
                ></Pressable>
                <Pressable
                  key="colorGray"
                  style={[styles.colorCircles, styles.colorGray]}
                  onPressOut={() =>
                    this.handleChatBgColorChange({
                      name: "Gray",
                      code: colors.gray,
                    })
                  }
                ></Pressable>
              </View>
            </View>
            <View
              style={[
                styles.btnContainer,
                { backgroundColor: `${btnBgColor}20` },
              ]}
            >
              <Pressable
                style={[styles.btn, { borderColor: btnTitleColor }]}
                onPress={this.handleSubmit}
              >
                <Text style={[styles.lblBold, { color: btnTitleColor }]}>
                  GO TO CHAT
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Start;
