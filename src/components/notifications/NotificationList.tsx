import Notification from '../../shared/models/Notification.model';
import React, { FC } from 'react';
import NotificationTeaser from './NotificationTeaser';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  notifications?: Notification[];
}

const NotificationList: FC<Props> = props => {
  if (!props.notifications) return null;

  return (
    <ListGroup variant='flush'>
      {props.notifications.map(n => (
        <ListGroup.Item key={n.id}>
          <NotificationTeaser notification={n} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NotificationList;
