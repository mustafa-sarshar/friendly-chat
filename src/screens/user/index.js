import React, { Component } from "react";
import { ImageBackground, View, Image, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

import UserImage from "../../components/user-image";
import UsernameInput from "../../components/username-input";
import GoToStartButton from "../../components/go-to-start-button";

import { colors } from "../../assets/css";
import styles from "./styles";
import avatars_default from "../../assets/data";

const screenBgImage = require("../../assets/img/background/background_user.png");

// The application’s Start screen that renders the username input box
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.route.params.username,
      chatBgColor: props.route.params.chatBgColor,
      userImage: props.route.params.userImage,
    };
    console.log("const");

    // Bind the methods to the class
    this.goToStartHandler = this.goToStartHandler.bind(this);
    this.pickImageHandler = this.pickImageHandler.bind(this);
    this.takePhotoHandler = this.takePhotoHandler.bind(this);
  }

  componentDidMount = () => {
    console.log("User componentDidMount");
  };

  goToStartHandler = () => {
    const { username } = this.state;
    const { navigation } = this.props;

    if (username.trim().length === 0) {
      Alert.alert("No username is given!!!");
    } else if (username.trim().length < 3) {
      Alert.alert("Username must be at least 3 characters long!!!");
    } else {
      navigation.navigate("Start");
    }
  };

  changeTextHandler = (textInput) => {
    const { onChangeUsername } = this.props.route.params;

    this.setState(
      {
        username: textInput,
      },
      () => {
        onChangeUsername(textInput);
      }
    );
  };

  pickImageHandler = async () => {
    const { onChangeUserImage } = this.props.route.params;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
          allowsEditing: true,
          quality: 1,
        }).catch((err) => console.error(err));

        if (!result.canceled) {
          this.setState({ userImage: result.assets[0].uri }, () => {
            onChangeUserImage(result.assets[0].uri);
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  takePhotoHandler = async () => {
    const { onChangeUserImage } = this.props.route.params;
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
        }).catch((err) => console.error(err));

        if (!result.canceled) {
          this.setState({ userImage: result.assets[0].uri }, () => {
            onChangeUserImage(result.assets[0].uri);
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  render = () => {
    const { username, userImage, chatBgColor } = this.state;
    const btnTitleColor =
      chatBgColor.name === "White" ? "#000000" : chatBgColor.code;
    const btnBgColor =
      chatBgColor.name === "White" ? "#FFFFFF" : chatBgColor.code;

    console.log("userImage", userImage);

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={screenBgImage}
          resizeMode="cover"
        >
          <View style={styles.subContainer}>
            <View style={styles.subContainer}>
              <UserImage
                btnTitleColor={btnTitleColor}
                userImage={userImage}
                onPressPickImage={this.pickImageHandler}
                onPressTakePhoto={this.takePhotoHandler}
              />
            </View>
            <View style={styles.actionsWrapper}>
              <UsernameInput
                username={username}
                onTextChange={this.changeTextHandler}
                colorSettings={{ btnBgColor, btnTitleColor }}
              />
              <GoToStartButton
                onGoToStart={this.goToStartHandler}
                chatBgColor={chatBgColor}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
}

export default User;
