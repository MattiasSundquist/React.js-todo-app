import { Container, Typography } from '@material-ui/core';
import React from 'react';

export const Header = ({ headerText, textSize }) => {
  return (
    <Container style={{ marginTop: 30, marginBottom: 30 }}>
      <Typography variant={textSize} align='center'>
        {headerText}
      </Typography>
    </Container>
  );
};
