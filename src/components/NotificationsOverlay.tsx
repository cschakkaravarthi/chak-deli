import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../shared/types/genericTypes';
import { fetchNotifications } from '../shared/actions/notificationActions';
import NotificationsList from '../components/notifications/NotificationList';
import Notification from '../shared/models/Notification.model';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

type Props = {
  menuOpen: boolean;
  notifications?: Notification[];
  fetchNotifications?: <T>() => T;
  onSetMenuOpen: (b: boolean) => void;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  notifications: state.notificationReducers.notifications
});

const actionCreators = {
  fetchNotifications
};

export const NotificationsOverlay: React.FC<Props> = props => {
  const { menuOpen, onSetMenuOpen, notifications } = props;

  const onBackdropClick = (): void => onSetMenuOpen(!menuOpen);

  return (
    <Modal size='xl' show={props.menuOpen} onHide={() => onBackdropClick()}>
      <Modal.Header closeButton className='border-0'>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <NotificationsList notifications={notifications} />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default connect(
  mapState,
  actionCreators
)(NotificationsOverlay);
