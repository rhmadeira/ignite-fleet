import { createStackNavigator } from '@react-navigation/stack';

import Home from '@/screens/Home';

const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
