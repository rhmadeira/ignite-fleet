import { FontAwesome } from '@expo/vector-icons';
import { useUser, useApp } from '@realm/react';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Greeting, Message, Name, Picture } from './styles';

import theme from '@/shared/theme';

export default function HomeHeader() {
  const user = useUser();
  const app = useApp();

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container>
      <Picture
        source={{ uri: user.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>

        <Name>{user.profile.name}</Name>
      </Greeting>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ padding: 8, borderRadius: 8 }}
        activeOpacity={0.8}>
        <FontAwesome name="power-off" size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
