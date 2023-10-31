import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Messages() {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  const handleClick = async (message) => {
    console.log("message", message.id);
    try {
      const messagesCollection = collection(db, "chats");
      const q = query(
        messagesCollection,
        where("messages", "array-contains", { id: "message.id" })
      );
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot.docs);

      if (!querySnapshot.empty) {
        for (const docSnapshot of querySnapshot.docs) {
          const chatDocRef = doc(db, "chats", docSnapshot.id);
          const chatData = docSnapshot.data();
          chatData.messages = chatData.messages.filter(
            (msg) => msg.id !== message.id
          );
          await updateDoc(chatDocRef, { messages: chatData.messages });

          console.log("Message deleted successfully.");
        }
      } else {
        console.log("No documents found with the specified message.");
      }
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  return (
    <div className="messages">
      {messages?.map((m) => (
        <Message handleClick={handleClick} message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages;
