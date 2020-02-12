import styled from 'styled-components/native';

import Colors from '~/styles/colors';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: ${Colors.INPUT_BACKGROUND};

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: Colors.INPUT_PLACEHOLDER,
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: ${Colors.WHITE};
`;
