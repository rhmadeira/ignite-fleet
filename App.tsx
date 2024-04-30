import 'react-native-gesture-handler';

import { REALM_APP_ID } from '@env';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { AppProvider, UserProvider } from '@realm/react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import Loading from '@/components/Loading';
import Home from '@/screens/Home';
import SignIn from '@/screens/SignIn';
import theme from '@/shared/theme';

export default function App() {
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!loaded) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Loading />
      </>
    );
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      </ThemeProvider>
    </AppProvider>
  );
}
