import React, { FC } from 'react';
import { ContentWrapper } from 'umgc_ui_library/lib';
import { Link as Go } from 'react-router-dom';
import OnError from '../error/Error';
import { VariousContentModel } from '../../shared/types/contentTypes';

type Props = {
  facility?: VariousContentModel;
  facilitiesError?: boolean;
};

export const Facilities: FC<Props> = props => {
  const { facility, facilitiesError } = props;

  if (!facility) {
    return null;
  }

  if (facilitiesError) {
    // The error handling will improve
    // This is just demonstration
    return <OnError />;
  }

  const linkClass = 'text-uppercase font-weight-bold font-size-sm';

  const handleSummary = (facility: VariousContentModel): string | undefined => facility.summary;

  const handleClickAction = (facility: VariousContentModel): JSX.Element | null => {
    if (facility.type === 'link') {
      return (
        <a href={facility.url} target="_blank">
          <u className={linkClass}>more info</u>
        </a>
      );
    } else if (facility.type === 'page') {
      return (
        <Go to={`/pages/${facility.drupal_id}`}>
          <u className={linkClass}>more info</u>
        </Go>
      );
    }

    return null;
  };

  return (
    <ContentWrapper
      key={facility.drupal_id}
      wrapperClass="h-100"
      topBorder="darkTurquoise"
      title={facility.title}
      titleClass="font-size-base font-weight-bold"
    >
      {handleSummary(facility) ? <p>{handleSummary(facility)}</p> : null}
      <div>{handleClickAction(facility)}</div>
    </ContentWrapper>
  );
};

export default Facilities;
