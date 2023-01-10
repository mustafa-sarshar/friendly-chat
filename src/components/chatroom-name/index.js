import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const ChatroomName = (props) => {
  const { chatroomName, chatBgColor } = props;
  let txtColor;
  if (chatBgColor.name === "White") {
    txtColor = "#000000";
  } else {
    txtColor = "#FFFFFF";
  }

  return (
    <View
      style={[
        styles.chatroomNameContainer,
        { backgroundColor: `${chatBgColor.code}30` },
      ]}
    >
      <Text style={[styles.chatroomNameText, { color: txtColor }]}>
        <Text style={styles.chatroomNameTextHighlight}>@ {chatroomName}</Text>
      </Text>
    </View>
  );
};

export default ChatroomName;
