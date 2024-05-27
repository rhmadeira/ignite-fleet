import { createStackNavigator } from '@react-navigation/stack';

import { Arrival } from '@/screens/Arrival';
import { Departure } from '@/screens/Departure';
import Home from '@/screens/Home';

const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="departure" component={Departure} />
      <Screen name="arrival" component={Arrival} />
    </Navigator>
  );
}
