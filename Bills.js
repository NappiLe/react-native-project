import * as firebase from "firebase";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import NewActivity from "./NewActivity";
import Participants from "./Participants";

function Bills(props) {
  const [next, setNext] = React.useState(false);
  const [newActivity, setNewActivity] = React.useState(false);
  const [activityList, setActivityList] = React.useState([]);
  const [id, setId] = React.useState("");

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

  const handleNext = (index) => {
    setNext(true);
    setId(index);
  };

  const handleNew = () => {
    setNewActivity(true);
  };

  return (
    <>
      {next ? (
        <Participants keyId={id} activity={activityList[id]} />
      ) : newActivity ? (
        <NewActivity />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>ACTIVITIES</Text>
          <Button title="Add new activity" onPress={handleNew}></Button>
          {activityList === undefined
            ? null
            : activityList.map((trip, index) => (
                <View key={index} style={styles.wrapper}>
                  <Button
                    onPress={() => handleNext(index)}
                    style={styles.title}
                    title={trip.title}
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
    backgroundColor: "#fff",
    margin: 50,
    flex: 1,
  },
  title: { textAlign: "left", margin: 20, fontSize: 20 },
  wrapper: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 300,
  },
  title: { textAlign: "center", margin: 20, fontSize: 20 },
});

export default Bills;
