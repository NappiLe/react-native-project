import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import BillList from "./BillList";

function BillDetails(props) {
  const { expenseTitle, calculator, participants, paidBy } = props;
  const [back, setBack] = React.useState(false);
  const [style, setStyle] = React.useState({ color: "red" });
  const filteredParticipantList = participants.filter(
    (items) => items !== paidBy
  );

  const handleBack = () => {
    setBack(true);
  };

  const handleShowAlert = () => {
    Alert.alert(
      `Did you paid back to ${paidBy} ?`,
      "Pick these 2 options?",
      [
        {
          text: "Yes. I already paid",
          onPress: () => setStyle({ color: "green" }),
        },
        { text: "No, I did not", onPress: () => setStyle({ color: "red" }) },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {back ? (
        <BillList participants={participants} />
      ) : (
        <View style={styles.container}>
          <View style={styles.back}>
            <Button title="< Back" color="grey" onPress={handleBack}></Button>
          </View>
          <Text style={styles.title}>{expenseTitle}</Text>
          <Text style={styles.subtite}> Paid by {paidBy}</Text>
          {filteredParticipantList.map((participant, index) => (
            <View key={index} style={styles.row}>
              <Button onPress={handleShowAlert} title={participant}></Button>
              <Text style={style}>{calculator}</Text>
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
  title: { textAlign: "center", margin: 20, fontSize: 20 },
  subtite: { textAlign: "center", fontSize: 15, fontWeight: "700" },
  back: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    textAlign: "left",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    margin: 10,
  },
  amount: { color: "red" },
});
export default BillDetails;
