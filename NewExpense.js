import * as firebase from "firebase";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import BillList from "./BillList";
import Participants from "./Participants";

function NewExpense(props) {
  const { participants, activity, keyId } = props;
  const [expenseTitle, setExpenseTitle] = useState("");
  const [total, setTotal] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [date, setDate] = useState("");
  const [back, setBack] = React.useState(false);
  const [paidBy, setPaidBy] = React.useState("");
  const [randomKey, setRandomKey] = React.useState([]);

  const uid = randomKey[keyId];

  const participantDropdown = participants.map((participant) => ({
    value: participant,
  }));

  const dividedMoney = (total / participants.length).toFixed(2);

  const participantsDetail = participants.map((participant) => ({
    name: participant,
    paid: false,
    needToPay: dividedMoney,
  }));

  React.useEffect(() => {
    firebase
      .database()
      .ref("activities/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        setRandomKey(keys);
      });
  }, []);

  const handleBack = () => {
    setBack(true);
  };

  const handleSave = () => {
    setBack(true);

    firebase
      .database()
      .ref(`activities/` + `${uid}` + `/ ` + `expense`)
      .set({
        title: expenseTitle,
        totalAmount: total,
        date: date,
        paidBy: paidBy,
        participants: participantsDetail,
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(JSON.stringify(date));
    setHideButton(true);
  };

  return (
    <>
      {back ? (
        <BillList
          participants={participants}
          activity={activity}
          dividedMoney={dividedMoney}
          keyId={keyId}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>NEW EXPENSE</Text>
          <Text>Title</Text>
          <TextInput
            value={expenseTitle}
            onChangeText={(expenseTitle) => setExpenseTitle(expenseTitle)}
            style={styles.input}
            placeholder="Title"
          />
          <Text>Total amount of money </Text>
          <TextInput
            keyboardType="numeric"
            value={total}
            placeholder="Total amount of money"
            onChangeText={(total) => setTotal(total)}
            style={styles.input}
          />
          <Text>Date</Text>
          {hideButton ? (
            <Text>{date.slice(1, 11)}</Text>
          ) : (
            <Button title="Show Date Picker" onPress={showDatePicker} />
          )}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text>Paid by </Text>
          <Dropdown
            label="Pick a person"
            data={participantDropdown}
            onChangeText={(value) => setPaidBy(value)}
          />
          <Text>Participants</Text>
          {participants.map((participant, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.list}>{participant}</Text>
              <Text>{dividedMoney}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Button title="Cancel" color="red" onPress={handleBack}></Button>
            <Button title="Save" onPress={handleSave}></Button>
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
  list: {
    fontSize: 15,
    margin: 10,
  },
});

export default NewExpense;
