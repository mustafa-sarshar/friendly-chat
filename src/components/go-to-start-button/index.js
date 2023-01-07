import React from "react";
import { View, Pressable, Text } from "react-native";

import styles from "./styles";

const GoToStartButton = (props) => {
  const { onGoToStart } = props;

  const handleUpdateChatStyles = () => {
    const { chatBgColor } = props;

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
    <View style={styles.btnContainer}>
      <Pressable
        accessible={true}
        accessibilityLabel="button"
        accessibilityHint="Press here to return to start page"
        style={styles.btn}
        onPress={onGoToStart}
      >
        <Text style={styles.lblBold}>GO BACK</Text>
      </Pressable>
    </View>
  );
};

export default GoToStartButton;
