import React, { FC } from 'react';
import { Card, LogoBanner } from 'umgc_ui_library';
import EventsContainer from '../events/Events';
import EventTeaser from '../events/EventTeaser';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export const HomeGenericSkeleton: FC = () => {
  const featuredArticleProps = {
    title: '',
    type: 'article',
    isFetching: true,
    variant: 'featured'
  };

  return (
    <div className="mb-5">
      <LogoBanner logoSrc="" bannerSrc="" isFetching={true} />
      <Container>
        <Row>
          <Col xl="12" className="my-3 d-none d-xl-block">
            <Card {...featuredArticleProps} pictureSkeletonHeight={300} />
          </Col>
        </Row>
        <Row>
          <Col xl="6" className="my-3">
            <Row className="h-100">
              <Col md="4" xl="12" className="d-xl-none">
                <Card {...featuredArticleProps} />
              </Col>
              {Array(2)
                .fill(null)
                .map((x: '', i: number) => (
                  <Col md="4" xl="6" key={`${i + x}`}>
                    <Card title="" type="article" isFetching={true} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xl="6" className="my-3">
            <EventsContainer events={[]} isFetching={true}>
              <EventTeaser events={[]} isFetching={true} />
            </EventsContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeGenericSkeleton;
