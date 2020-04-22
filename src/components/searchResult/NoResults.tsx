import React, { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'umgc_ui_library';
import { Link as Go } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export const NoResultCard = (): ReactElement => {
  return (
    <Container className="article-list mt-5">
      <Row className="mb-2 article-list-header">
        <Col sm={12} md={12}>
          <h3 className="text-center">Sorry, no results found.</h3>
          <p className="text-center">
            Try another search or browse these areas:
          </p>
        </Col>
      </Row>
      <>
        <Row>
          <Col sm={12} md={4} className="mb-3 mb-md-5">
            <Card
              title="News"
              type="search"
              variant="noResult"
              description="Browse the latest news regarding artists, UMG events, and UMG news."
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Go to="/news-articles">{p.children}</Go>
              )}
            />
          </Col>
          <Col sm={12} md={4} className="mb-3 mb-md-5">
            <Card
              title="Offices & People"
              type="search"
              variant="noResult"
              description="Browse all UMG office locations and people."
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Go to="/offices">{p.children}</Go>
              )}
            />
          </Col>
          <Col sm={12} md={4} className="mb-3 mb-md-5">
            <Card
              title="Departments"
              type="search"
              variant="noResult"
              description="Browse all Departments."
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Go to="/departments">{p.children}</Go>
              )}
            />
          </Col>
          <Col sm={12} md={4} className="mb-3 mb-md-5">
            <Card
              title="Systems & Applications"
              type="search"
              variant="noResult"
              description="Browse all systems & applications."
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Go to="/systems-applications">{p.children}</Go>
              )}
            />
          </Col>
          <Col sm={12} md={4} className="mb-3 mb-md-5">
            <Card
              title="Brands & Labels"
              type="search"
              variant="noResult"
              description="Browse all brands & labels within UMG by location."
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Go to="/brands-labels">{p.children}</Go>
              )}
            />
          </Col>
        </Row>
      </>
    </Container>
  );
};
