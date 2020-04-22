import React, { FC, ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'umgc_ui_library';
import Skeleton from 'react-loading-skeleton';

interface Props {
  data: object[];
  heading: string;
  dataLength: number;
  isFetching: boolean;
  typeInQuery?: string;
  cardInSkeleton: string;
  skeletonCount?: number;
  skeletonColSize?: number;
  elementsToFillArray?: number;
  filterByTypeChange: string;
  handleFilterByTypeChange: (value: string) => void;
}

export const ComponentToShow: FC<Props> = (props): ReactElement | null => {
  const {
    data,
    heading,
    children,
    dataLength,
    isFetching,
    typeInQuery,
    cardInSkeleton,
    skeletonCount = 4,
    filterByTypeChange,
    skeletonColSize = 12,
    handleFilterByTypeChange
  } = props;

  if (!data.length && !isFetching) {
    return null;
  }

  const cardSkeleton = (type: string): ReactElement[] => {
    return Array(skeletonCount)
      .fill('')
      .map((x: string, i: number) => (
        <Col md={skeletonColSize} className="mb-3 mb-md-4" key={`${x + i}`}>
          <Card title="" type={type} variant="search" isFetching={true} />
        </Col>
      ));
  };

  return (
    <>
      <Row>
        <Col md="12" className="mt-5">
          <p className="font-size-title">
            <b>{!isFetching ? heading : <Skeleton width={100} />}</b>
          </p>
        </Col>
      </Row>
      <Row>{!isFetching ? children : cardSkeleton(cardInSkeleton)}</Row>
      {typeInQuery === 'all' && (
        <Row className="see-all-section text-condensed g700-text-clr">
          <Col md="12">
            <u
              onClick={() => handleFilterByTypeChange(filterByTypeChange)}
            >{`See all ${dataLength} results in ${heading}`}</u>
          </Col>
        </Row>
      )}
    </>
  );
};
