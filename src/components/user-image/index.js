import React, { Component } from "react";
import { View, Button, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

class UserImage extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { userImage, btnTitleColor, onPressPickImage, onPressTakePhoto } =
      this.props;

    return (
      <View>
        <View style={[styles.imgContainer, { borderColor: btnTitleColor }]}>
          <View style={styles.img}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={styles.img} />
            ) : (
              <FontAwesome name="user" size={160} color={btnTitleColor} />
            )}
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <View>
            <Button title="Pick an Image" onPress={onPressPickImage} />
          </View>
          <View>
            <Button title="Take a Photo" onPress={onPressTakePhoto} />
          </View>
        </View>
      </View>
    );
  };
}

export default UserImage;
