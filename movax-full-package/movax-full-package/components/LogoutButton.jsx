// components/LogoutButton.jsx
//
// Drop this into your Profile/Settings screen, e.g.:
//   import LogoutButton from "../../components/LogoutButton";
//   <LogoutButton />

import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            // Root layout's redirect effect sends the user to /auth/sign-in
          } catch (err) {
            Alert.alert("Error", "Could not log out. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fdecea",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  text: { color: "#d93025", fontSize: 15, fontWeight: "600" },
});
