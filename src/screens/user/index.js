import React, { Component } from "react";
import { ImageBackground, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import UserAvatar from "../../components/user-image";
import UsernameInput from "../../components/username-input";
import CustomButton from "../../components/custom-button";

import styles from "./styles";

const screenBgImage = require("../../assets/img/background/background_user.png");

// The application’s Start screen that renders the username input box
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.route.params.username,
      chatBgColor: props.route.params.chatBgColor,
      userAvatar: props.route.params.userAvatar,
    };

    // Bind the methods to the class
    this.goToStartHandler = this.goToStartHandler.bind(this);
    this.pickImageHandler = this.pickImageHandler.bind(this);
    this.takePhotoHandler = this.takePhotoHandler.bind(this);
    this.pickAvatarHandler = this.pickAvatarHandler.bind(this);
  }

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
    const { onChangeUserAvatar } = this.props.route.params;
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
          this.setState({ userAvatar: result.assets[0].uri }, () => {
            onChangeUserAvatar(result.assets[0].uri);
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  takePhotoHandler = async () => {
    const { onChangeUserAvatar } = this.props.route.params;
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
        }).catch((err) => console.error(err));

        if (!result.canceled) {
          this.setState({ userAvatar: result.assets[0].uri }, () => {
            onChangeUserAvatar(result.assets[0].uri);
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  pickAvatarHandler = async (avatarUri) => {
    const { onChangeUserAvatar } = this.props.route.params;

    this.setState({ userAvatar: avatarUri }, () => {
      onChangeUserAvatar(avatarUri);
    });
  };

  render = () => {
    const { username, userAvatar, chatBgColor } = this.state;
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
            <View style={styles.imageContainer}>
              <UserAvatar
                colorSettings={{ btnBgColor, btnTitleColor }}
                userAvatar={userAvatar}
                onPressPickImage={this.pickImageHandler}
                onPressTakePhoto={this.takePhotoHandler}
                onPressPickAvatar={this.pickAvatarHandler}
              />
            </View>
            <View style={styles.actionsWrapper}>
              <UsernameInput
                username={username}
                onTextChange={this.changeTextHandler}
                colorSettings={{ btnBgColor, btnTitleColor }}
              />
              <CustomButton
                onPress={this.goToStartHandler}
                colorSettings={{ btnBgColor, btnTitleColor }}
                titleText="SET CHANGES"
                buttonHint="Press the button set changes and go to the start page"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
}

export default User;
