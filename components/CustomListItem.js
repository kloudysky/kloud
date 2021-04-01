import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  });
  return (
    <ListItem
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
      containerStyle={{ backgroundColor: "#2c2f33" }}
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-512.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600", color: "white" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{ color: "white" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
