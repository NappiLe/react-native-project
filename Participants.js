import * as firebase from "firebase";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import BillList from "./BillList";
import Bills from "./Bills";

function Participants(props) {
  const { activity } = props;
  const [next, setNext] = React.useState(false);
  const [back, setBack] = React.useState(false);
  const participants = activity.participants;

  const handleNext = () => {
    setNext(!next);
  };

  const handleBack = () => {
    setBack(true);
  };

  return (
    <>
      {next ? (
        <BillList activity={activity} participants={participants} />
      ) : back ? (
        <Bills />
      ) : (
        <View style={styles.container}>
          <Button title="< Back" color="grey" onPress={handleBack}></Button>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Who are you?</Text>
          </View>
          {participants.map((participant, index) => (
            <View key={index} style={styles.wrapper}>
              <Button
                onPress={handleNext}
                color="black"
                title={participant}
                style={styles.name}
              ></Button>
            </View>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 50,
  },
  wrapper: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 300,
    alignItems: "center",
  },
  name: {
    margin: 10,
  },
  title: { margin: 20, fontSize: 20 },
});

export default Participants;
