// @flow

import React, { type Node } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Text } from './styles';
import Colors from '~/styles/colors';

type Props = {
  children: Node,
  loading: boolean,
};

export default function Button({ children, loading = false, ...rest }: Props) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
