import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import BillList from "./BillList";
import Participants from "./Participants";

function BillDetails(props) {
  const { expense, participants, activity, dividedMoney } = props;
  const [back, setBack] = React.useState(false);
  const [style, setStyle] = React.useState({ color: "red" });
  const [choosenParticipant, setChoosenParticipant] = React.useState({});
  const filteredParticipantList = participants.filter(
    (items) => items !== expense.paidBy
  );

  const partcipantDetail = participants.map((participant) => ({
    name: participant,
    paid: false,
  }));

  const handleBack = () => {
    setBack(true);
  };

  const handleShowAlert = (index) => {
    const currentParticipant = partcipantDetail[index];
    setChoosenParticipant(currentParticipant);

    Alert.alert(
      `Did you paid back to ${expense.paidBy} ?`,
      "Pick these 2 options?",
      [
        {
          text: "Yes. I already paid",
          onPress: () =>
            setChoosenParticipant({ ...choosenParticipant, paid: true }),
        },
        {
          text: "No, I did not",
          //, onPress: () => setStyle({ color: "red" })
        },
      ],
      { cancelable: true }
    );
  };

  // if (choosenParticipant.paid === true) {
  //   setStyle({ ...style, color: "blue" });
  // } else {
  //   setStyle({ ...style, color: "red" });
  // }

  return (
    <>
      {back ? (
        <BillList participants={participants} activity={activity} />
      ) : (
        <View style={styles.container}>
          <View style={styles.back}>
            <Button title="< Back" color="grey" onPress={handleBack}></Button>
          </View>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.subtite}> Paid by {expense.paidBy}</Text>
          <View style={styles.rownoline}>
            <Text>Participants</Text>
            <Text>Money </Text>
          </View>
          {filteredParticipantList.map((participant, index) => (
            <View key={index} style={styles.row}>
              <Button
                onPress={() => handleShowAlert(index)}
                title={participant}
              ></Button>
              <Text style={style}>{dividedMoney}</Text>
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
