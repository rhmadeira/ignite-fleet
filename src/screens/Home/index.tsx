import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Results } from 'realm';

import { Container, Content } from './styles';

import { CarStatus } from '@/components/CarStatus';
import HomeHeader from '@/components/HomeHeader';
import { useQuery } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/historic';

export default function Home() {
  const { navigate } = useNavigation();
  const [vehicleInUse, setVehicleInUse] = useState<Results<Historic> | []>([]);

  const historic = useQuery(Historic);

  function handleRegisterMoviment() {
    if (vehicleInUse[0]._id) navigate('arrival', { id: vehicleInUse[0]._id.toString() });
    else navigate('departure');
  }

  function fetchVehicle() {
    const vehicleInUse = historic.filtered('status = "departure"');
    setVehicleInUse(vehicleInUse);
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate={vehicleInUse[0]?.license_plate} onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
