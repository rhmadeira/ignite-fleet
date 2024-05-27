import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Results } from 'realm';

import { Container, Content } from './styles';

import { CarStatus } from '@/components/CarStatus';
import HomeHeader from '@/components/HomeHeader';
import { useQuery, useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/historic';

export default function Home() {
  const { navigate } = useNavigation();
  const [vehicleInUse, setVehicleInUse] = useState<Results<Historic> | []>([]);
  const realm = useRealm();
  const historic = useQuery(Historic);

  function handleRegisterMoviment() {
    if (vehicleInUse.length) navigate('arrival', { id: vehicleInUse[0]._id.toString() });
    else navigate('departure');
  }

  function fetchVehicleInUse() {
    const vehicleInUse = historic.filtered('status = "departure"');
    setVehicleInUse(vehicleInUse);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  //opção caso queira ouvir mudanças no banco de dados
  // useEffect(() => {
  //   realm.addListener('change', () => fetchVehicleInUse());
  //   return () => realm.removeListener('change', fetchVehicleInUse);
  // }, []);

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate={vehicleInUse[0]?.license_plate} onPress={handleRegisterMoviment} />
      </Content>
    </Container>
  );
}
