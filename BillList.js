import * as firebase from "firebase";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import BillDetails from "./BillDetails";
import NewExpense from "./NewExpense";
import Participants from "./Participants";

function BillList(props) {
  const { activity, participants, expense, dividedMoney, keyId } = props;
  const [next, setNext] = React.useState(false);
  const [back, setBack] = React.useState(false);
  const [detail, setDetail] = React.useState(false);
  const [id, setId] = React.useState("");
  const [activities, setActivities] = React.useState([]);
  const [currentExpense, setCurrentExpense] = React.useState({});

  React.useEffect(() => {
    firebase
      .database()
      .ref("activities/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const act = Object.values(data);
        setActivities(act);
        setCurrentExpense(activities[keyId]);
      });
  }, []);

  // fake data. This one just uses to display data in BillDetails
  //currentExpense is object from Firebase.For some reasons, I cannot access to currentExpense.
  const object = {
    title: "Trip to Helsinki",
    participants: ["Anna", "Ben", "Tim"],
    expense: [
      {
        title: "Restaurant",
        date: "12/20",
        paidBy: "Anna",
        total: 40,
        splitedBill: 20,
        participants: [
          { name: "Anna", paid: false, needToPay: 10 },
          { name: "Ben", paid: false, needToPay: 10 },
          { name: "Tim", paid: false, needToPay: 10 },
        ],
      },
      {
        title: "Hotel",
        date: "12/20",
        paidBy: "Ben",
        total: 200,

        participants: [
          { name: "Anna", paid: false, needToPay: 100 },
          { name: "Ben", paid: false, needToPay: 100 },
          { name: "Tim", paid: false, needToPay: 10 },
        ],
      },
    ],
  };

  const participantName = object.participants
    .map((participant) => participant)
    .join(", ");

  const handleGoDetail = (index) => {
    setDetail(true);
    setId(index);
  };

  const handleNext = () => {
    setNext(true);
  };

  const handleBack = () => {
    setBack(true);
  };

  return (
    <>
      {next ? (
        <NewExpense
          keyId={keyId}
          activity={activity}
          participants={participants}
        />
      ) : back ? (
        <Participants activity={object} />
      ) : detail ? (
        <BillDetails object={object.expense[id]} />
      ) : (
        <View style={styles.container}>
          <View style={styles.back}>
            <Button title="< Back" color="grey" onPress={handleBack}></Button>
          </View>
          <Text style={styles.title}>{object.title}</Text>
          <Text style={styles.text}>{participantName}</Text>

          <Button title="Add new expense" onPress={handleNext}></Button>
          {object.expense === undefined
            ? null
            : object.expense.map((i, index) => (
                <View key={index} style={styles.row}>
                  <Button
                    title={i.title}
                    onPress={() => handleGoDetail(index)}
                  ></Button>
                  <Text> {i.total}</Text>
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
  title: { textAlign: "center", marginTop: 20, fontSize: 20 },
  text: { textAlign: "center", marginTop: 10 },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    margin: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  back: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    textAlign: "left",
  },
});
export default BillList;
