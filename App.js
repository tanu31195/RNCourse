import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goalsList, setGoalsList] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setGoalsList((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setGoalsList((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandle() {
    setModalIsVisible(true);
  }

  function endAddGoalHandle() {
    setModalIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <Button
        title="Add new Goal"
        color="#a065ec"
        onPress={startAddGoalHandle}
      />
      {modalIsVisible && (
        <GoalInput
          onAddGoal={addGoalHandler}
          showModal={modalIsVisible}
          onCancel={endAddGoalHandle}
        />
      )}
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalsList}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        ></FlatList>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#5ff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 6,
  },
});
