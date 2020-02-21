import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';
import Colors from './styles/colors';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />
      <Routes />
    </>
  );
}
