import React, { Component } from "react";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { FIREBASE_CONFIGS } from "../../assets/data";
import { colors } from "../../assets/css";
import styles from "./styles";


class GiftedChatCustomActions extends Component {
  constructor(props) {
    super(props);

    this.actionHandler = this.actionHandler.bind(this);
    this.imagePickerHandler = this.imagePickerHandler.bind(this);
    this.takePhotoHandler = this.takePhotoHandler.bind(this);
    this.getLocationHandler = this.getLocationHandler.bind(this);
  }

  imagePickerHandler = async () => {
    const { onSend, onUploadImageToFirebase } = this.props;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        }).catch((err) => console.error(err));

        if (!result.canceled) {
          onUploadImageToFirebase(
            result.assets[0].uri,
            FIREBASE_CONFIGS.storageConfig.imagesDirectory,
            onSend
          );
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  takePhotoHandler = async () => {
    const { onSend, onUploadImageToFirebase } = this.props;
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((err) => console.error(err));

        if (!result.canceled) {
          onUploadImageToFirebase(
            result.assets[0].uri,
            FIREBASE_CONFIGS.storageConfig.imagesDirectory,
            onSend
          );
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  getLocationHandler = async () => {
    const { onSend } = this.props;
    const { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync({});

        if (result) {
          onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            },
          });
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  actionHandler = () => {
    const { showActionSheetWithOptions, iconTextStyle } = this.props;

    const universalProps = {
      options: [
        "Choose From Library",
        "Take Picture",
        "Send Location",
        "Cancel",
      ],
      cancelButtonIndex: 3,
      destructiveButtonIndex:
        iconTextStyle.color === colors.red ? [0, 1, 2] : 3,
      title: "",
      message: "",
      tintColor:
        iconTextStyle.color === colors.red
          ? "#000000"
          : `${iconTextStyle.color}`,
      disabledButtonIndices: [],
    };
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];

    showActionSheetWithOptions(universalProps, async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          return this.imagePickerHandler();
        case 1:
          return this.takePhotoHandler();
        case 2:
          return this.getLocationHandler();
        default:
          console.log("Canceled");
          break;
      }
    });
  };

  render = () => {
    const { wrapperStyle, iconTextStyle } = this.props;

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Let’s choose to send an image, take a photo or share your geolocation."
        style={[styles.container]}
        onPress={this.actionHandler}
      >
        <View style={[styles.wrapper, wrapperStyle]}>
          <Text style={[styles.iconText, iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

GiftedChatCustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

GiftedChatCustomActions = connectActionSheet(GiftedChatCustomActions);

export default GiftedChatCustomActions;
