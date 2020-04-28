import * as firebase from "firebase";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import Bills from "./Bills";

const firebaseConfig = {
  apiKey: "AIzaSyC1fXxXtjSpCyivPoB0VIyNfXbWEHK_e-c",
  authDomain: "splitbill-3e5b0.firebaseapp.com",
  databaseURL: "https://splitbill-3e5b0.firebaseio.com",
  projectId: "splitbill-3e5b0",
  storageBucket: "splitbill-3e5b0.appspot.com",
  messagingSenderId: "617934844162",
  appId: "1:617934844162:web:5946cea43425e13ed2921b",
  measurementId: "G-K9C2YSMT47",
};

firebase.initializeApp(firebaseConfig);
firebase.database().ref("activities/");

function NewActivity() {
  const [activityTitle, setActivityTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [participantName, setParticipantName] = React.useState("");
  const [participants, setParticipants] = React.useState([]);
  const [next, setNext] = React.useState(false);
  const [activityList, setActivityList] = React.useState([]);

  const handleNewParticipants = () => {
    setParticipants([...participants, participantName]);
    setParticipantName("");
  };

  const handleBack = () => {
    setNext(true);
  };

  const handleSave = () => {
    setNext(!next);

    firebase.database().ref("activities/").push({
      title: activityTitle,
      description: description,
      participants: participants,
    });
  };

  React.useEffect(() => {
    firebase
      .database()
      .ref("activities/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const act = Object.values(data);
        setActivityList(act);
      });
  }, []);

  const handleDelete = (index) => {
    const newList = participants.filter((_, i) => i !== index);
    setParticipants(newList);
  };

  return (
    <>
      {next ? (
        <Bills activityList={activityList} activityTitle={activityTitle} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>NEW ACTIVITY</Text>
          <Text>Title</Text>
          <TextInput
            value={activityTitle}
            onChangeText={(activityTitle) => setActivityTitle(activityTitle)}
            style={styles.input}
            placeholder="Title"
          />
          <Text>Description</Text>
          <TextInput
            value={description}
            onChangeText={(description) => setDescription(description)}
            style={styles.input}
            placeholder="Description"
          />
          <Text>Participants</Text>
          <View style={styles.row}>
            <TextInput
              value={participantName}
              onChangeText={(participantName) =>
                setParticipantName(participantName)
              }
              style={styles.input}
              placeholder="Participant's Name"
            />
            <Button title="Add" onPress={(e) => handleNewParticipants(e)} />
          </View>
          {participants.map((participant, index) => (
            <View style={styles.row} key={index}>
              <Text>{participant}</Text>
              <Button
                color="red"
                title="Delete"
                onPress={() => handleDelete(index)}
              ></Button>
            </View>
          ))}
          <View style={styles.row}>
            <Button title="Cancel" color="red" onPress={handleBack}></Button>
            <Button onPress={handleSave} title="Save" />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    margin: 50,
  },
  title: { textAlign: "center", margin: 20, fontSize: 20 },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 20,
    textAlign: "left",
    borderBottomWidth: 1,
    margin: 15,
    borderBottomColor: "#DDE0E2",
    width: "80%",
  },
});

export default NewActivity;
