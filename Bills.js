import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import NewActivity from "./NewActivity";
import Participants from "./Participants";

function Bills(props) {
  const { activityList, activityTitle, date } = props;
  const [next, setNext] = React.useState(false);
  const [newActivity, setNewActivity] = React.useState(false);

  const handleNext = () => {
    setNext(true);
  };

  console.log(date);
  const handleNew = () => {
    setNewActivity(true);
  };

  return (
    <>
      {next ? (
        <Participants activityTitle={activityTitle} />
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
                    onPress={handleNext}
                    color="black"
                    style={styles.title}
                    title={trip}
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
