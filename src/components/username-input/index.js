import React from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

const UsernameInput = (props) => {
  const { colorSettings, onTextChange, username } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View style={styles.subContainer}>
      <Text style={[styles.lblBold, { color: btnTitleColor }]}>Enter Username</Text>
      <View
        style={[styles.usernameWrapper, { borderColor: `${btnTitleColor}30` }]}
      >
        <View style={styles.icon}>
          <FontAwesome name="user" size={24} color={btnTitleColor} />
        </View>
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
