import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';

type Props = {
  errorMessage?: string;
};

export const OnError: FC<Props> = props => {
  const { errorMessage = 'Sorry, no results found' } = props;

  return (
    <Container>
      <p className="font-size-base font-weight-bold text-center p-5">{errorMessage}</p>
    </Container>
  );
};

export default OnError;
