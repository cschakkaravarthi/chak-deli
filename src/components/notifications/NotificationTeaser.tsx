import Notification from '../../shared/models/Notification.model';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

interface Props {
  notification?: Notification;
  approveHandler?: any;
  rejectHandler?: any;
}

const NotificationTeaser: React.FC<Props> = props => {
  if (!props.notification) return null;

  return (
    <div>
      <div>
        <span>!</span> {props.notification.description}
      </div>
      <div>
        <span>{props.notification.application}</span>
        <div>
          {props.notification.detailsLink ? <a href={props.notification.detailsLink}>Details</a> : null}
          <br />
          <ButtonToolbar>
            {props.notification.reject ? (
              <Button
                className='mx-1'
                variant='outline-danger'
                size='sm'
                onClick={() => props.rejectHandler(props.notification)}>
                Reject
              </Button>
            ) : null}
            {props.notification.approve ? (
              <Button
                className='mx-1'
                variant='outline-primary'
                size='sm'
                onClick={() => props.approveHandler(props.notification)}>
                Approve
              </Button>
            ) : null}
          </ButtonToolbar>
        </div>
      </div>
    </div>
  );
};

export default NotificationTeaser;
