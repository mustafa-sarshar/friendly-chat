import React from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

const UsernameInput = (props) => {
  const { colorSettings, onTextChange, username } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View style={[styles.subContainer, { backgroundColor: `${btnBgColor}10` }]}>
      <Text style={[styles.lblBold, styles.txtTitle, { color: btnTitleColor }]}>
        Enter Username
      </Text>
      <View
        style={[styles.usernameWrapper, { borderColor: `${btnTitleColor}30` }]}
      >
        <View style={styles.icon}>
          <FontAwesome name="user" size={24} color={btnTitleColor} />
        </View>
        <TextInput
          style={[styles.txtInput, { color: btnTitleColor }]}
          value={username}
          placeholder="enter your username please"
          onChangeText={onTextChange}
        />
      </View>
    </View>
  );
};

export default UsernameInput;
