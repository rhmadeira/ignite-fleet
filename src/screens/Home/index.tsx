import { useNavigation } from '@react-navigation/native';

import { Container, Content } from './styles';

import { CarStatus } from '@/components/CarStatus';
import HomeHeader from '@/components/HomeHeader';

export default function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMoviment() {
    navigate('departure');
  }
  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate="XXX-1234" onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
