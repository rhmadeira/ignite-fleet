import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { Alert } from 'react-native';

import { Container, Title, Slogan } from './styles';

import { Button } from '@/components/Button';
import backgroundImg from '@/shared/assets/background.png';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const { idToken } = await GoogleSignin.signIn();
      console.log('🚀 ~ handleGoogleSignIn ~ idToken:', idToken);

      if (idToken) {
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.');
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.');
      setIsAuthenticating(false);
    }
  }
  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button title="Entrar com Google" onPress={handleGoogleSignIn} />
    </Container>
  );
}
