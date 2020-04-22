import React, { ReactElement, FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Loader: FC = (): ReactElement => {
  return (
    <Container className="article-list mt-5">
      <Row className="mb-2 article-list-header">
        <Col><strong>Loading ...</strong></Col>
      </Row>
    </Container>
  );
};

export default Loader;
