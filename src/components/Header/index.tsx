import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Greeting, Message, Name, Picture } from './styles';

import theme from '@/shared/theme';

export default function HomeHeader() {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/rhmadeira.png' }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>

        <Name>Rafael</Name>
      </Greeting>
      <TouchableOpacity>
        <FontAwesome name="power-off" size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
