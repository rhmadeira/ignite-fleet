import { Container, Title, Slogan } from "./styles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../shared/components/Button";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();
export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const androidId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: androidId,
    iosClientId: "nada",
    scopes: ["profile", "email"],
  });

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const res = await googleSignIn();
      if (res.type !== "success") {
        setIsAuthenticating(false);
        return;
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
