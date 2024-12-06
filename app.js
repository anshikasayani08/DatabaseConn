import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = ({ navigation }) => {
  const [paidAmount, setPaidAmount] = useState(0);
  const totalAmount = 1000;

  const handlePaid = () => {
    setPaidAmount(totalAmount); // Mark the amount as paid
    navigation.navigate('DuePage', { amount: totalAmount - paidAmount });
  };

  const handleDue = () => {
    navigation.navigate('DuePage', { amount: totalAmount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Status</Text>
      <Button title="Paid" onPress={handlePaid} />
      <Button title="Due" onPress={handleDue} />
      {paidAmount === totalAmount && (
        <Text style={styles.message}>The amount has been paid successfully!</Text>
      )}
    </View>
  );
};

const DuePage = ({ route }) => {
  const { amount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Due Amount</Text>
      <Text style={styles.amount}>Due Amount: {amount}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function MainApp() {
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
    color: 'green',
    fontSize: 18,
  },
  amount: {
    fontSize: 20,
    marginTop: 20,
  },
});