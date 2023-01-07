import React, { Component } from "react";
import { View, KeyboardAvoidingView, Platform, LogBox } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import MapView from "react-native-maps";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import GiftedChatCustomActions from "../gifted-chat-custom-actions";

import styles from "./styles";
import Robot from "../../utils/robot";

// Assign your own firebase configurations to firebaseConfigs
// Please create indexes afterwards.
const firebaseConfigs = require("../../../.firebaseConfig.json");

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  `Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead`,
]);

class ChatGadget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: 0,
      messages: [],
      isConnected: false,
    };

    // Bind the methods to the class
    this.runAppOffline = this.runAppOffline.bind(this);
    this.runAppOnline = this.runAppOnline.bind(this);
    this.updateChatStylesHandler = this.updateChatStylesHandler.bind(this);
    this.renderActionsHandler = this.renderActionsHandler.bind(this);
    this.renderBubbleHandler = this.renderBubbleHandler.bind(this);
    this.renderInputToolbarHandler = this.renderInputToolbarHandler.bind(this);
    this.checkNetConnection = this.checkNetConnection.bind(this);
    this.onCollectionUpdate = this.onCollectionUpdate.bind(this);
    this.getMessagesLocally = this.getMessagesLocally.bind(this);
    this.saveMessagesLocally = this.saveMessagesLocally.bind(this);
    this.deleteMessagesLocally = this.deleteMessagesLocally.bind(this);
    this.uploadImageToFirebaseHandler =
      this.uploadImageToFirebaseHandler.bind(this);

    // Init the firebase app
    this.firebaseApp = initializeApp(firebaseConfigs.appConfig);
    this.firebaseColRef = undefined;
    // Get the database
    this.firebaseStore = getFirestore(this.firebaseApp);

    this.robot = Robot();
  }

  componentDidMount = () => {
    // Check the internet connection
    this.checkNetConnection();
    // Update chat background color
    this.updateChatStylesHandler();
  };

  componentWillUnmount = () => {
    if (this.unsubscribeSnapshots) {
      this.unsubscribeSnapshots();
    }
    // Uncomment it, if you wish to unsubscribe the user each time the user returns to the start screen
    // if (this.unsubscribeAuth) {
    //   this.unsubscribeAuth();
    // }
  };

  //define title in navigation bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.userName}'s Chat`,
    };
  };

  runAppOffline = () => {
    this.getMessagesLocally();
  };

  runAppOnline = () => {
    // Set a Collection Ref
    this.firebaseColRef = collection(
      this.firebaseStore,
      firebaseConfigs.dbConfig.collectionName
    );
    // Get Authentication
    this.firebaseAuth = getAuth(this.firebaseApp);
    this.unsubscribeAuth = onAuthStateChanged(
      this.firebaseAuth,
      async (user) => {
        if (!user) {
          await signInAnonymously(this.firebaseAuth)
            .then((data) => {
              console.log("Signed in successfully!");
            })
            .catch((err) => {
              console.error(err.message);
            });
        } else {
          console.log("currentUser", user.uid);
          this.setState({
            uid: user.uid,
            messages: [],
          });

          // Define a query
          this.firebaseQuery = query(
            this.firebaseColRef,
            where("uid", "==", user.uid),
            orderBy("serverReceivedAt", "desc")
          );
          // // Subscribe a snapshot to the collection
          this.unsubscribeSnapshots = onSnapshot(
            this.firebaseQuery,
            this.onCollectionUpdate
          );
        }
      }
    );
  };

  checkNetConnection = () => {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState(
          {
            isConnected: true,
          },
          () => {
            console.log("The app runs in online mode");
            this.runAppOnline();
          }
        );
      } else {
        this.setState(
          {
            isConnected: false,
          },
          () => {
            console.log("The app runs in offline mode");
            this.runAppOffline();
          }
        );
      }
    });
  };

  updateChatStylesHandler = () => {
    const { params } = this.props;

    if (params?.chatBgColor) {
      // Update the styles based on the selected ChatBgColor
      styles.giftedChatContainer = {
        ...styles.giftedChatContainer,
        backgroundColor: `${params.chatBgColor.code}30`,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:
          params.chatBgColor.name === "White"
            ? "#00000050"
            : `${params.chatBgColor.code}50`,
      };
      styles.subContainer = {
        ...styles.subContainer,
        backgroundColor: `${params.chatBgColor.code}90`,
      };
    }
  };

  signInHandle = (user) => {
    if (!user) {
      signInAnonymously(this.firebaseAuth)
        .then((cred) => {
          this.setState({
            uid: cred.data().uid,
            messages: [],
          });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  sendMessageHandler = (messages = []) => {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessageToFirebase();
        // this.saveMessagesLocally();
      }
    );
  };

  addMessageToFirebase = () => {
    const { uid, messages } = this.state;

    addDoc(this.firebaseColRef, {
      _id: messages[0]._id,
      user: messages[0].user,
      text: messages[0].text || "",
      createdAt: messages[0].createdAt,
      serverReceivedAt: serverTimestamp(),
      image: messages[0].image || null,
      location: messages[0].location || null,
      uid: uid,
    })
      .then(async () => {
        console.log("Message sent successfully");

        // Just for Demo Purposes //////////////////////////////////////
        await addDoc(this.firebaseColRef, {
          _id: Math.floor(Math.random() * 1000),
          user: {
            _id: 2,
            name: "Robot",
            avatar: "https://picsum.photos/id/30/140/140",
          },
          text: await this.robot(),
          createdAt: new Date(),
          serverReceivedAt: serverTimestamp(),
          uid: uid,
        })
          .then(() => {
            console.log("Automatic reply sent successfully");
          })
          .catch((err) => {
            console.error(err.message);
          });
        ////////////////////////////////////////////////////////////////
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  onCollectionUpdate = (snapshot) => {
    const messages = [];

    snapshot.docs.forEach((doc) => {
      const { uid } = this.state;
      const data = doc.data();

      messages.push({
        _id: data._id,
        user: data.user,
        text: data.text || "",
        createdAt: data.createdAt.toDate(),
        serverReceivedAt: serverTimestamp(),
        image: data.image || null,
        location: data.location || null,
        uid: uid,
      });
    });

    this.setState(
      {
        messages,
      },
      () => {
        this.saveMessagesLocally();
      }
    );
  };

  getMessagesLocally = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  saveMessagesLocally = async () => {
    try {
      const { messages } = this.state;
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
      console.log(`Messages saved in AsyncStorage. length: ${messages.length}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  deleteMessagesLocally = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Upload images to Firebase
  uploadImageToFirebaseHandler = async (uri, sendHandler) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (err) => {
        console.error("XHR error:", err.message);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];
    const storageRef = ref(
      getStorage(this.firebaseApp, firebaseConfigs.storageConfig.bucketURL),
      `${firebaseConfigs.storageConfig.directoryName}/${imageName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (err) => {
        console.error("uploadTask error:", err.message);
        blob.close();
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            sendHandler([{ _id: 1, image: `${downloadURL}` }]);
          })
          .catch((err) => {
            console.error("getDownloadURL failed:", err.message);
          })
          .finally(() => {
            blob.close();
          });
      }
    );
  };

  //
  renderActionsHandler = (props) => {
    const { params } = this.props;
    let wrapperStyle;
    let iconTextStyle;

    if (params?.chatBgColor) {
      if (params.chatBgColor.name === "White") {
        wrapperStyle = {
          borderColor: "black",
        };
        iconTextStyle = { color: "black" };
      } else {
        wrapperStyle = {
          borderColor: params.chatBgColor.code,
        };
        iconTextStyle = { color: params.chatBgColor.code };
      }
    }

    return (
      <GiftedChatCustomActions
        {...props}
        wrapperStyle={wrapperStyle}
        iconTextStyle={iconTextStyle}
      />
    );
  };

  renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <MapView
          style={styles.mapView}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // Update the InputToolbar
  renderInputToolbarHandler = (props) => {
    const { isConnected } = this.state;

    if (isConnected === true) {
      return <InputToolbar {...props} />;
    }
  };

  // Add custom styles to messages via Bubble
  renderBubbleHandler = (props) => {
    const { params } = this.props;

    let customColorBG = "#000000";
    let customColorOuter = "#FFFFFF50";
    let customColorInner = "#FFFFFF";

    if (params?.chatBgColor) {
      if (params.chatBgColor.name === "White") {
        customColorBG = params.chatBgColor.code;
        customColorInner = "#000000";
        customColorOuter = "#00000050";
      }
    }
    const styleWrappers = {
      borderWidth: 1,
      borderColor: customColorOuter,
    };

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            ...styleWrappers,
            backgroundColor: `${customColorBG}25`,
          },
          right: {
            ...styleWrappers,
            backgroundColor: `${customColorBG}50`,
          },
        }}
        textProps={{
          style: {
            color: customColorInner,
            fontWeight: "bold",
          },
        }}
        timeTextStyle={{
          left: {
            color: customColorInner,
          },
          right: {
            color: customColorInner,
          },
        }}
      />
    );
  };

  handleReset = () => {
    const { uid } = this.state;
    const { currentUser } = this.firebaseAuth;

    if (currentUser) {
      this.unsubscribeAuth();
      signOut(this.firebaseAuth).then(() => {
        deleteUser(currentUser).then(() => {
          console.log(`The user: ${uid} signed out successfully`);
          this.setState({
            uid: 0,
            message: [],
          });
        });
      });
    }
  };

  render = () => {
    const { messages, uid } = this.state;
    const { params } = this.props;

    return (
      <View style={styles.subContainer}>
        <View style={styles.giftedChatContainer}>
          <GiftedChat
            messages={messages}
            renderInputToolbar={this.renderInputToolbarHandler}
            renderActions={this.renderActionsHandler}
            renderCustomView={this.renderCustomView}
            renderBubble={this.renderBubbleHandler}
            onSend={(messages) => this.sendMessageHandler(messages)}
            user={{
              _id: uid,
              name: params.username && params.username,
            }}
            onUploadImageToFirebase={this.uploadImageToFirebaseHandler}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    );
  };
}

export default ChatGadget;
