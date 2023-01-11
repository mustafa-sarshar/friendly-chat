import React from "react";
import { View, Text, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "./styles";

const ChatroomCodeInput = (props) => {
  const { colorSettings, onChangeText, chatroomCode } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View style={styles.subContainer}>
      <Text style={[styles.lblBold, { color: btnTitleColor }]}>
        Chatroom Code
      </Text>
      <View
        style={[
          styles.chatroomCodeWrapper,
          { borderColor: `${btnTitleColor}30` },
        ]}
      >
        <View style={styles.icon}>
          <Entypo name="chat" size={24} color={btnTitleColor} />
        </View>
        <TextInput
          style={[styles.txtInput, { backgroundColor: `${btnBgColor}20` }]}
          value={chatroomCode}
          placeholder="enter the chatroom code please"
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default ChatroomCodeInput;
