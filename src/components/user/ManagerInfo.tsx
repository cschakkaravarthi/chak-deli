import React, { FC } from 'react';

import get from 'lodash.get';

import { ReportsTo } from '../../shared/models/UserInfo.model';
import { RouteComponentProps } from 'react-router';
import images from '../../images/images';

type Props = {
  history?: any;
  reportsTo?: ReportsTo;
};

const ManagerInfo: FC<Props> = props => {
  const { history, reportsTo } = props;

  if (!reportsTo) return null;

  const handleManagerClick = (): RouteComponentProps => {
    const { push } = history;

    return push(`/user/${reportsTo && reportsTo.networkID}`);
  };

  return (
    <>
      <div className='manager-info__container'>
        <div className='manager__icon'>
          <img src={images.caretRight} width={20} height={20} />
        </div>
        <div className='manager__title'>
          <p>Manager:</p>
        </div>
        <div className='manager__info'>
          <div className='manager__name'>
            <button
              className='button--anchor'
              onClick={() => handleManagerClick()}
            >
              {get(reportsTo, 'lastName')}, {get(reportsTo, 'firstName')}
            </button>
          </div>
          <div className='manager__position'>
            <p>{get(reportsTo, 'jobTitle')}</p>
            <p>{get(reportsTo, 'department')}</p>
          </div>
        </div>
      </div>
      <div className='manager__line'>
        <span />
      </div>
    </>
  );
};

export default ManagerInfo;
