import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import '@/libs/dayjs';

import { REALM_APP_ID } from '@env';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useNetInfo } from '@react-native-community/netinfo';
import { AppProvider, UserProvider } from '@realm/react';
import { WifiSlash } from 'phosphor-react-native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OpenRealmBehaviorType } from 'realm';
import { ThemeProvider } from 'styled-components';

import Loading from '@/components/Loading';
import { TopMessage } from '@/components/TopMessage';
import { RealmProvider } from '@/libs/realm';
import { Routes } from '@/routes';
import SignIn from '@/screens/SignIn';
import theme from '@/shared/theme';

export default function App() {
  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const netInfo = useNetInfo();

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
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          {!netInfo.isConnected && <TopMessage title="Você está off-line" icon={WifiSlash} />}
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider
              fallback={Loading}
              sync={{
                flexible: true,
                newRealmFileBehavior: {
                  type: OpenRealmBehaviorType.OpenImmediately,
                },
                existingRealmFileBehavior: {
                  type: OpenRealmBehaviorType.OpenImmediately,
                },
              }}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
