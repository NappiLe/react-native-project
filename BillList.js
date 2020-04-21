import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import BillDetails from "./BillDetails";
import NewExpense from "./NewExpense";
import Participants from "./Participants";

function BillList(props) {
  const {
    participants,
    activityTitle,
    amount,
    expenseTitle,
    calculator,
    paidBy,
    date,
  } = props;
  const [next, setNext] = React.useState(false);
  const [back, setBack] = React.useState(false);
  const [detail, setDetail] = React.useState(false);

  const handleGoDetail = () => {
    setDetail(true);
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
        <NewExpense participants={participants} />
      ) : back ? (
        <Participants />
      ) : detail ? (
        <BillDetails
          expenseTitle={expenseTitle}
          calculator={calculator}
          participants={participants}
          paidBy={paidBy}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.back}>
            <Button title="< Back" color="grey" onPress={handleBack}></Button>
          </View>
          <Text style={styles.title}>{activityTitle}</Text>
          <Text style={styles.text}>{participants.join(", ")}</Text>
          <Button title="Add new expense" onPress={handleNext}></Button>
          {expenseTitle == undefined ? null : (
            <View style={styles.row}>
              <Button title={expenseTitle} onPress={handleGoDetail}></Button>
              <Text> {amount}</Text>
            </View>
          )}
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
