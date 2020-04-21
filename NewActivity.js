import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import Bills from "./Bills";

function NewActivity() {
  const [activityTitle, setActivityTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [myName, setMyName] = React.useState("");
  const [participants, setParticipants] = React.useState([]);
  const [next, setNext] = React.useState(false);
  const [activityList, setActivityList] = React.useState([]);

  const handleNewParticipants = () => {
    setParticipants([...participants, ""]);
  };

  const handleChange = (e, index) => {
    participants[index] = e.target.value;
    setParticipants(participants);
  };

  const handleBack = () => {
    setNext(true);
  };

  const handleSave = () => {
    setNext(!next);
    setActivityList([...activityList, activityTitle]);
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
              value={myName}
              onChangeText={(myName) => setMyName(myName)}
              style={styles.input}
              placeholder="My name"
            />
            <Button title="Add" onPress={(e) => handleNewParticipants(e)} />
          </View>
          {participants.map((participant, index) => (
            <View key={index}>
              <TextInput
                value={participant}
                onChangeText={(e) => handleChange(e, index)}
                style={styles.input}
                placeholder="Others"
              />
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
