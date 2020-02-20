// @flow
import React, { forwardRef } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon, {
  type MaterialIconsGlyphs,
} from 'react-native-vector-icons/MaterialIcons';

import Colors from '~/styles/colors';
import { Container, TInput } from './styles';

type Props = {
  style?: ViewStyleProp,
  icon?: MaterialIconsGlyphs,
};

function Input({ style, icon, ...rest }: Props, ref: ?TInput) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color={Colors.INPUT_ICON} />}
      <TInput ref={ref} {...rest} />
    </Container>
  );
}

Input.defaultProps = {
  style: {},
  icon: null,
};

export default forwardRef<any, Props>(Input);
