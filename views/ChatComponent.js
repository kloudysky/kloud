import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Touchable } from "react-native";
import { Keyboard } from "react-native";
import * as firebase from "firebase";
import { db, auth } from "../firebase";

const ChatComponent = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route, messages]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.chatName}`,
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#D6850D" },
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{ paddingTop: 15 }}
              style={styles.svcontainer}
            >
              {messages.map(({ id, data }) =>
                data.uid === auth.currentUser.uid ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderName}>{data.displayName}</Text>
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                placeholder="Send Message To [Name]"
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#D6850D" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#35363A",
    flex: 1,
  },
  reciever: {
    padding: 15,
    alignSelf: "flex-end",
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    alignSelf: "flex-start",
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 16,
    color: "white",
  },
  recieverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    color: "white",
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    borderWidth: 1,
    backgroundColor: "#3A3935",
    borderRadius: 10,
    fontSize: 18,
  },
  svcontainer: {},
});
