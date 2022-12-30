import React from "react";
import { View, Text, Image, TextInput } from "react-native";

import styles from "./styles";

const UsernameInput = (props) => {
  const { colorSettings, onTextChange, username } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View style={styles.subContainer}>
      <Text style={styles.lblBold}>Username</Text>
      <View
        style={[styles.usernameWrapper, { borderColor: `${btnTitleColor}30` }]}
      >
        <Image
          style={styles.icon}
          source={require("../../assets/img/user_24px.png")}
        />
        <TextInput
          style={[styles.txtInput, { backgroundColor: `${btnBgColor}20` }]}
          value={username}
          placeholder="enter your username please"
          onChangeText={onTextChange}
        />
      </View>
    </View>
  );
};

export default UsernameInput;
