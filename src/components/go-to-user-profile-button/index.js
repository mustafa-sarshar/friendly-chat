import React from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

const GoToUserProfileButton = (props) => {
  const { colorSettings, onGoToUserProfile } = props;
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
        width: 90,
        borderColor:
          chatBgColor.name === "White" ? "#000000" : chatBgColor.code,
      };
      styles.btnContainer = {
        ...styles.btnContainer,
        backgroundColor: `${chatBgColor.code}30`,
      };
    }
  };
  handleUpdateChatStyles();

  return (
    <View style={styles.subContainer}>
      <View style={[styles.btnWrapper, { borderColor: `${btnTitleColor}30` }]}>
        <View style={styles.icon}>
          <FontAwesome name="user" size={24} color={btnTitleColor} />
        </View>
        <Pressable
          accessible={true}
          accessibilityLabel="button"
          accessibilityHint="Press here to go to user profile page"
          style={[styles.btn, { flex: 1 }]}
          onPress={onGoToUserProfile}
        >
          <Text style={styles.lblBold}>Set User Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GoToUserProfileButton;
