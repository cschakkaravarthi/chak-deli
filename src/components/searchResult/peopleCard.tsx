import React, { FC, ReactElement } from 'react';
import People from '../../shared/models/People.model';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import images from '../../images/images';
import { getUserProfilePicture } from '../../utils/customHooks';
import { getUserInfo } from '../../reactAuthProvider';
import get from 'lodash.get';

interface PeopleCardProps {
  people: People;
  isFetching?: boolean;
  addtocontact?: (email?: string) => void;
  searchKeyword?: string;
}

export const PeopleCard: FC<PeopleCardProps> = peopleCardProps => {
  const { people, isFetching, addtocontact } = peopleCardProps;

  const getMainLink = (p: React.PropsWithChildren<{}>): ReactElement => {
    let userProfileUrl = '/profile?upn=';

    if (people && people.email) {
      userProfileUrl += people.email;
      return <Link to={userProfileUrl}>{p.children}</Link>;
    } else {
      return <span>{p.children}</span>;
    }
  };

  const handleAddToContacts = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (people && people.email) {
      const email = people.email;
      addtocontact && addtocontact(email);
    }
  };

  const user = getUserInfo();
  const workLocation = people && people.location && people.country ? `${people.location}, ${people.country}` : people.country || people.location;

  return (
    <Card
      isFetching={isFetching}
      title={get(peopleCardProps, 'people.fullName', '')}
      type="people"
      variant="search"
      imageUrl={getUserProfilePicture(people.avatar) || ''}
      designation={people.title ? `${people.title}, ${people.department}` : ''}
      companyName={people.company || ''}
      workLocation={workLocation || ''}
      mail={people.email || ''}
      phoneNumber={people.phoneNumber || ''}
      isCurrentUser={user.userName === people.email}
      addToContactIcon={images.add}
      handleAddToContacts={handleAddToContacts}
      MailLink={(p: React.PropsWithChildren<{}>) => (
        <a href={`mailto:${people.email}`}>{p.children}</a>
      )}
      PhoneLink={(p: React.PropsWithChildren<{}>) => (
        <a href={`tel:${people.phoneNumber}`}>{p.children}</a>
      )}
      ZoomLink={(p: React.PropsWithChildren<{}>) => (
        <Link to="#">{p.children}</Link>
      )}
      MainLink={(p: React.PropsWithChildren<{}>) => getMainLink(p)}
      searchKeyword={peopleCardProps.searchKeyword}
    />
  );
};
