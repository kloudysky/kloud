import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatComponent = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Send a new message",
      headerBackTitle: "Chats",
    });
  }, []);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="white" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChatComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2f33",
    padding: 30,
    height: "100%",
  },
});
