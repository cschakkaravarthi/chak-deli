import React, { FC } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { DirectReports } from '../../shared/models/UserInfo.model';
import images from '../../images/images';

interface Props {
  history?: any;
  directReports?: DirectReports[];
}

const DirectReportInfo: FC<Props> = props => {
  const { history, directReports } = props;

  if (!directReports || !directReports.length) return null;

  const handleDirectReportClick = (index: number): RouteComponentProps => {
    const { push } = history;

    return push(`/user/${directReports && directReports[index].networkID}`);
  };

  return (
    <div className='direct-report-info__container'>
      <div className='direct-report__icon'>
        <img src={images.caretLeft} width={20} height={20} />
      </div>
      <div className='direct-report__title'>
        <p>Direct Reports:</p>
      </div>
      <div className='direct-report__info'>
        <div className='direct-report__name'>
          {directReports &&
            directReports.map((item, index) => (
              <button
                className='button--anchor'
                key={`${item.networkID}${index}`}
                onClick={() => handleDirectReportClick(index)}
              >
                {item.firstName}, {item.lastName}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DirectReportInfo;
