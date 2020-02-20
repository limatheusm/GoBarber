// @flow

import React from 'react';
import { Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigationState } from '@react-navigation/native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

type Props = {
  navigation: StackNavigationProp<StackNavigationState>,
};

export default function SignIn({ navigation }: Props) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
          />
          <FormInput icon="lock-outline" secureTextEntry placeholder="Senha" />

          <SubmitButton onPress={() => {}}>Entrar</SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
