import React, { FC } from 'react';
import PeopleModel from '../../shared/models/People.model';
import Col from 'react-bootstrap/Col';
import { IndividualPersonCard } from 'umgc_ui_library/lib/cards/individualPersonCard';
import get from 'lodash.get';
import { Link as Go } from 'react-router-dom';
import { getUserProfilePicture } from '../../utils/customHooks';

type Props = {
  people: PeopleModel;
};

const People: FC<Props> = props => {
  const { people } = props;

  const imageUrl = getUserProfilePicture(props.people.avatar, true);

  return (
    <Col xs="6" md="4" className="mb-4 office-people">
      <IndividualPersonCard
        imageUrl={imageUrl}
        fullName={people.fullName}
        title={get(people, 'title', '')}
        MainLink={(p: React.PropsWithChildren<{}>) => (
          <Go
            to={{
              pathname: '/user',
              search: `?upn=${people.email}`
            }}
          >
            {p.children}
          </Go>
        )}
      />
    </Col>
  );
};

export default People;
