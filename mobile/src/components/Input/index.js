import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '~/styles/colors';
import { Container, TInput } from './styles';

function Input({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color={Colors.INPUT_ICON} />}
      <TInput ref={ref} {...rest} />
    </Container>
  );
}

Input.propTypes = {
  style: ViewPropTypes.style.isRequired,
  icon: PropTypes.string.isRequired,
};

export default forwardRef(Input);
