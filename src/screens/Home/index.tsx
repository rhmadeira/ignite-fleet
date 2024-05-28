import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Results } from 'realm';

import { Container, Content, Label, Title } from './styles';

import { CarStatus } from '@/components/CarStatus';
import { HistoricCard, HistoricCardProps } from '@/components/HistoricCard';
import HomeHeader from '@/components/HomeHeader';
import { useQuery, useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/historic';

export default function Home() {
  const { navigate } = useNavigation();
  const [vehicleInUse, setVehicleInUse] = useState<Results<Historic> | []>([]);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);
  const realm = useRealm();
  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    if (vehicleInUse.length) navigate('arrival', { id: vehicleInUse[0]._id.toString() });
    else navigate('departure');
  }

  function fetchHistoric() {
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)");
      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
        };
      });
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.');
    }
  }

  function fetchVehicleInUse() {
    const vehicleInUse = historic.filtered('status = "departure"');
    setVehicleInUse(vehicleInUse);
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id });
  }

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, []);

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus licensePlate={vehicleInUse[0]?.license_plate} onPress={handleRegisterMovement} />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum registro de utilização.</Label>}
        />
      </Content>
    </Container>
  );
}
