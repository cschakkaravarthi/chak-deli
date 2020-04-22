import React, { FC } from 'react';
import get from 'lodash.get';
import UserInfoModel, { Phone } from '../../shared/models/UserInfo.model';

type Props = {
  usersInfo?: UserInfoModel;
};

const UserInfo: FC<Props> = props => {
  const { usersInfo } = props;

  if (!usersInfo || !usersInfo.networkID) return null;

  return (
    <>
      <div className='user__info'>
        <div className='user__name'>
          <a href='#'>
            {usersInfo.lastName}, {usersInfo.firstName}
          </a>
        </div>
        <div className='user__title'>
          <p>{usersInfo.jobTitle}</p>
          <p>{usersInfo.department}</p>
        </div>
        <div className='user__email'>
          <a type='email' href={`mailto:${usersInfo.email}`}>
            {usersInfo.email}
          </a>
        </div>
        {get(usersInfo, 'location.office') && (
          <div className='user__office'>
            <p>Office: {get(usersInfo, 'location.office', '')}</p>
          </div>
        )}
        <div className='user__address'>
          <p>
            {get(usersInfo, 'location.room', '')} <br />
            {get(usersInfo, 'location.address', '')} <br />
            {`${get(usersInfo, 'location.city', '')}, ${get(usersInfo, 'location.state', '')} `}
            {get(usersInfo, 'location.postalCode', '')}
          </p>
        </div>
        <div className='user__phone'>
          {get(usersInfo, 'phone', [] as Phone[]).map((item: Phone, index: number) => (
            <p key={index}>
              {item.type === 'Desk' && <span>Phone: {item.num}</span>}
              {item.type === 'Mobile' && <span>Mobile: {item.num}</span>}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserInfo;
