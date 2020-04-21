import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
    console.warn(date);
  };
  const startDate = selectedDate ? selectedDate.toString() : "";
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("./assets/logo.png")}
          style={{ width: "100%", height: "80%" }}
        />
        <Text style={{ color: "#050F26" }}>you eat - you split - you pay</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.text}>OWN YOU</Text>
          <Text style={styles.money}>50€</Text>
        </View>
        <View style={styles.redCircle}>
          <Text style={styles.text}>YOU OWN</Text>
          <Text style={styles.money}>20€</Text>
        </View>
      </View>
      <View style={styles.calendar}>
        <CalendarPicker onDateChange={onDateChange} />
        <Text>City trip {startDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    margin: 50,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  circleContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 60,
    backgroundColor: "green",
    marginRight: 30,
  },
  redCircle: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 60,
    backgroundColor: "red",
  },
  text: {
    textAlign: "center",
    color: "white",
    marginTop: 20,
  },
  money: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
  },
  calendar: {
    flex: 2,
  },
});

export default Home;
