import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { signOut as amplifySignOut, signInWithRedirect } from 'aws-amplify/auth';
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { signOut, user } = useAuthenticator();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({
        provider: 'Google'
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await amplifySignOut({
        global: false,
        oauth: {
          redirectUrl: 'amplifygooglesignin://signout/'
        }
      });
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback to UI provider signOut if needed
      try { signOut(); } catch {}
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Amplify Auth!</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Signed in as:</Text>
          <Text style={styles.email}>{user.signInDetails?.loginId}</Text>
          <Text style={styles.userId}>User ID: {user.userId}</Text>
          {user.signInDetails?.authFlowType && (
            <Text style={styles.authFlow}>
              Auth Method: {user.signInDetails.authFlowType}
            </Text>
          )}
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        {!user && (
          <View style={styles.signInButtons}>
            <Button 
              title="Sign In with Google" 
              onPress={handleGoogleSignIn}
              color="#4285F4"
            />
          </View>
        )}
        {user && (
          <Button title="Sign Out" onPress={handleSignOut} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  userInfo: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  userText: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  userId: {
    fontSize: 12,
    color: "#666",
  },
  authFlow: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 200,
  },
  signInButtons: {
    gap: 10,
  },
});
