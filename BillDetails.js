import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import BillList from "./BillList";

function BillDetails(props) {
  const { object } = props;
  const [back, setBack] = React.useState(false);
  const filteredParticipantList = object.participants.filter(
    (items) => items.name !== object.paidBy
  );

  const [participantList, setParticipantList] = React.useState(
    filteredParticipantList
  );

  const handleBack = () => {
    setBack(true);
  };

  const handleShowAlert = (index) => {
    const newList = participantList.filter((_, i) => i !== index);

    Alert.alert(
      `Did you paid back to ${object.paidBy} ?`,
      "Pick these 2 options?",
      [
        {
          text: "Yes. I already paid",
          onPress: () => {
            setParticipantList(newList);
          },
        },
        {
          text: "No, I did not",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {back ? (
        <BillList />
      ) : (
        <View style={styles.container}>
          <View style={styles.back}>
            <Button title="< Back" color="grey" onPress={handleBack}></Button>
          </View>
          <Text style={styles.title}>{object.title}</Text>
          <Text style={styles.subtite}> Paid by {object.paidBy}</Text>
          <View style={styles.rownoline}>
            <Text>Participants</Text>
            <Text>Money </Text>
          </View>
          {participantList.map((participant, index) => (
            <View key={index} style={styles.row}>
              <Button
                onPress={() => handleShowAlert(index)}
                title={participant.name}
              ></Button>
              <Text style={{ color: "green" }}>{participant.needToPay}</Text>
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
  rownoline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default BillDetails;
