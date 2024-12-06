import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import AntDesign from "react-native-vector-icons/AntDesign";
import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// Enable Promise support for SQLite
enablePromise(true);

// Connect to the database and create a table
const connectToDatabase = async () => {
  try {
    const db = await openDatabase({ name: "theCanteen.db", location: "default" });

    // Create the users table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL
        );`,
        [],
        () => console.log("Users table created successfully."),
        (tx, error) => {
          console.error("Error creating users table:", error);
        }
      );
    });

    return db;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Insert user data into the database
const insertUser = async (db, name, email, password) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
        [name, email, password],
        () => console.log("User inserted successfully."),
        (tx, error) => {
          console.error("Error inserting user:", error);
        }
      );
    });
  } catch (error) {
    console.error("Error in insertUser function:", error);
  }
};

const MainPage1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  // Handle the login button press
  const handleLogin = async () => {
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    try {
      const db = await connectToDatabase();
      await insertUser(db, name, email, password);
      Alert.alert("Success", "User data inserted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to insert user data.");
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {/* Logo */}
          <Image
            source={{
              uri: "https://tasteofnovascotia.com/wp-content/uploads/2015/02/The-Canteen-logo.png",
            }}
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              marginTop: 60,
              backgroundColor: "white",
            }}
          />

          {/* Username Input */}
          <Text style={{ color: "#5E5E5E", fontSize: 20, paddingStart: 25 }}>UserName</Text>
          <TextInput
            placeholder="Enter UserName"
            style={{
              color: "black",
              fontSize: 20,
              padding: 5,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: "black",
              paddingStart: 20,
              borderRadius: 5,
            }}
            placeholderTextColor={"#00000033"}
            onChangeText={setName}
            value={name}
          />

          {/* Email Input */}
          <Text style={{ color: "#5E5E5E", fontSize: 20, paddingStart: 25, marginTop: 20 }}>Email</Text>
          <TextInput
            placeholder="Enter Email"
            style={{
              color: "black",
              fontSize: 20,
              padding: 5,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: "black",
              paddingStart: 20,
              borderRadius: 5,
            }}
            placeholderTextColor={"#00000033"}
            onChangeText={setEmail}
            value={email}
          />

          {/* Password Input */}
          <Text style={{ color: "#5E5E5E", fontSize: 20, paddingStart: 25, marginTop: 20 }}>Password</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Enter Password"
              style={{
                color: "black",
                fontSize: 20,
                padding: 5,
                marginHorizontal: 20,
                borderColor: "black",
                borderWidth: 1,
                paddingStart: 20,
                borderRadius: 5,
                flex: 1,
              }}
              placeholderTextColor={"#00000033"}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          {/* Remember Me */}
          <View style={{ flex: 1, marginHorizontal: 16, marginVertical: 32 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setChecked(!isChecked)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
              <Text style={[{ fontSize: 20 }]}>Remember me</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "black",
                width: 300,
                height: 40,
                alignSelf: "center",
                marginVertical: 50,
                padding: 10,
                borderRadius: 50,
              }}
              onPress={handleLogin}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MainPage1;