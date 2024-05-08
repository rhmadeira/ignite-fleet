import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';

import { Container, Content } from './styles';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import { LicensePlateInput } from '@/components/LicensePlateInput';
import { TextAreaInput } from '@/components/TextAreaInput';
import { useRealm } from '@/libs/realm';
import { Historic } from '@/libs/realm/schemas/historic';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { goBack } = useNavigation();

  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor, informa a placa correta.'
        );
      }
      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo'
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          })
        );
      });

      Alert.alert('Saída registada', 'Saída registada com sucesso!');
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro ao registar saída',
        'Ocorreu um erro ao registar a saída. Tente novamente mais tarde.'
      );
    } finally {
      setIsRegistering(false);
    }
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              label="Placa do veículo"
              ref={licensePlateRef}
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus();
              }}
              onChangeText={setLicensePlate}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalizade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              onChangeText={setDescription}
              returnKeyType="send"
              blurOnSubmit
            />

            <Button
              title="Registar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
