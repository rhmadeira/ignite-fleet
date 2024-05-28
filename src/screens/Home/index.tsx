import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';
import dayjs from 'dayjs';
import { CloudArrowUp } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import { ProgressDirection, ProgressMode, Results } from 'realm';

import { Container, Content, Label, Title } from './styles';

import { CarStatus } from '@/components/CarStatus';
import { HistoricCard, HistoricCardProps } from '@/components/HistoricCard';
import HomeHeader from '@/components/HomeHeader';
import { TopMessage } from '@/components/TopMessage';
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '@/libs/asyncStorage';
import { useQuery, useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/historic';

interface IProgressNotification {
  transfered: number;
  transferable: number;
  progress: number;
}

export default function Home() {
  const { navigate } = useNavigation();
  const [vehicleInUse, setVehicleInUse] = useState<Results<Historic> | []>([]);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);
  const [percetageToSync, setPercentageToSync] = useState<string | null>(null);
  const realm = useRealm();
  const user = useUser();
  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    if (vehicleInUse.length) navigate('arrival', { id: vehicleInUse[0]._id.toString() });
    else navigate('departure');
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id });
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)");
      const lastSync = await getLastAsyncTimestamp();
      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
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

  async function progressNotification(transferred: number, transferable: number) {
    const percentage = (transferred / transferable) * 100;
    if (percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: 'info',
        text1: 'Sincronização concluída!',
      });
    }
    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`);
    }
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    fetchHistoric();
  }, [historic]);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse);
      }
    };
  }, []);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects<Historic>('Historic')
        .filtered(`user_id = '${user.id}'`);
      mutableSubs.add(historicByUserQuery, { name: 'historicByUser' });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;
    if (!syncSession) return;

    syncSession.addProgressNotification(
      ProgressDirection.Upload,
      ProgressMode.ReportIndefinitely,
      progressNotification
    );

    return () => syncSession.removeProgressNotification(progressNotification);
  }, [realm]);

  return (
    <Container>
      {percetageToSync && <TopMessage title={percetageToSync} icon={CloudArrowUp} />}
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
