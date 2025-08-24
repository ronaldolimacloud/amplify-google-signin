import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import { autoSignIn } from "aws-amplify/auth";
import { Stack } from "expo-router";
import { useEffect } from "react";

import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      try {
        await autoSignIn();
      } catch (e) {
        // no-op: autoSignIn is best-effort and only applies when enabled during signUp
      }
    })();
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Stack />
      </Authenticator>
    </Authenticator.Provider>
  );
}
