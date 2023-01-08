import React from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

const UserProfileButton = (props) => {
  const {
    onPress,
    colorSettings,
    containerStyle,
    buttonStyle,
    titleStyle,
    titleText,
    buttonHint,
  } = props;
  const { chatBgColor, btnTitleColor } = colorSettings;

  const handleUpdateChatStyles = () => {
    if (chatBgColor) {
      // Update the styles based on the selected ChatBgColor
      styles.lblBold = {
        ...styles.lblBold,
        color: chatBgColor.name === "White" ? "#000000" : chatBgColor.code,
      };
      styles.btn = {
        ...styles.btn,
        borderColor:
          chatBgColor.name === "White" ? "#000000" : chatBgColor.code,
      };
      styles.btnContainer = {
        ...styles.btnContainer,
      };
      styles.btnWrapper = {
        ...styles.btnWrapper,
        borderColor: `${btnTitleColor}30`,
      };
    }
  };
  handleUpdateChatStyles();

  return (
    <View style={[styles.subContainer, containerStyle]}>
      <Pressable
        accessible={true}
        accessibilityLabel="button"
        accessibilityHint={buttonHint}
        style={[styles.btn, buttonStyle]}
        onPress={onPress}
      >
        <View style={styles.btnWrapper}>
          <View style={styles.icon}>
            <FontAwesome name="user" size={24} color={btnTitleColor} />
          </View>
          <Text style={[styles.lblBold, styles.btnTitle, titleStyle]}>
            {titleText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserProfileButton;
