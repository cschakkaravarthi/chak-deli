import React, { FC } from 'react';
import { ContentWrapper } from 'umgc_ui_library/lib';
import Error500 from './Error500';

type Props = {
  title: string;
  topBorder?: string;
  className?: string;
};

const Error500CardWithTitle: FC<Props> = (props) => {
  const {
    title,
    topBorder,
    className
  } = props;
  return (
    <ContentWrapper
      title={title}
      titleClass={`text-upper font-size-md mb-4 ${className}`}
      topBorder={topBorder || 'darkTurquoise'}
      wrapperClass="h-100"
    >
      <Error500/>
    </ContentWrapper>
  );
};

export default Error500CardWithTitle;
