import React from "react";
import { View, Pressable, Text } from "react-native";

import styles from "./styles";

const GoToChatButton = (props) => {
  const { onGoToChat, colorSettings } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View style={[styles.btnContainer, { backgroundColor: `${btnBgColor}20` }]}>
      <Pressable
        accessible={true}
        accessibilityLabel="button"
        accessibilityHint="Press here to go to the chat room"
        style={[styles.btn, { borderColor: btnTitleColor }]}
        onPress={onGoToChat}
      >
        <Text style={[styles.lblBold, { color: btnTitleColor }]}>
          GO TO CHAT
        </Text>
      </Pressable>
    </View>
  );
};

export default GoToChatButton;
