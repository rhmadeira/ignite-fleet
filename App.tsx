import 'react-native-gesture-handler';

import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { SignIn } from '@/screens/Signin';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SignIn />
    </PaperProvider>
  );
}
