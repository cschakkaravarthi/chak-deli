import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import EventModel from '../../shared/models/Event.model';

import { Card } from 'umgc_ui_library';

type Props = {
  isFetching?: boolean;
  events?: EventModel[];
  showHeaderLink?: boolean;
};

export const EventsContainer: React.FC<Props> = props => {
  const { events = [], children, showHeaderLink = true, isFetching } = props;

  if (events && !events.length && !isFetching) return null;

  return (
    <Card
      title="Events"
      topBorder="yellow"
      variant="standard"
      type="cardsInContainer"
      isFetching={isFetching}
      HeaderLink={(p: ReactNode | any) => (
        <Link to="/events">{p.children}</Link>
      )}
      headerLinkText={showHeaderLink ? 'All Events' : undefined}
    >
      {children}
    </Card>
  );
};

export default EventsContainer;
