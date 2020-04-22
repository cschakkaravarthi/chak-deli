import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../shared/reducers';
import { RejectModal as Modal } from 'umgc_ui_library/lib/components/rejectModal';
import { TEXTAREA_MAX_LENGTH } from '../../constants/constants';
import {
  setNotificationsReject
} from '../../shared/actions/manualNotificationAction';
import {
  setReject, setTextarea
} from '../../shared/actions/commonActions';
import RejectModal from '../../shared/models/RejectModal';
import { history } from './../../App';

type Props = {
  setReject?: <T>(isShow: boolean, sysId: string) => T;
  setTextarea?: <T>(textarea: string) => T;
  setNotificationsReject?: <T>(sysId: string, message: string) => T;
  idAndIsShow: RejectModal;
  textarea: string;
  };

const mapState = (state: ApplicationState, props: Props): Props => ({
  ...props,
  idAndIsShow: state.commonReducers.idAndIsShow,
  textarea: state.commonReducers.textarea
});

const actionCreators = {
  setNotificationsReject,
  setReject,
  setTextarea
};

const NotificationRejectModal: FC<Props> = props => {
  const { idAndIsShow, textarea, setNotificationsReject, setReject, setTextarea } = props;

  const handleChangeReject = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextarea && setTextarea(e.target.value);
  };

  const handleReject = (): void => {
    if (setNotificationsReject && idAndIsShow && textarea && setReject) {
      setNotificationsReject(idAndIsShow.sysId, textarea);
      history.push('/notifications/new?alert_type=all');
      setReject(false, '0');
    }
  };

  const handleClose = (): void => {
    setReject && setReject(false, '0');
  };

  return (
    <Modal
      show={idAndIsShow.isShow}
      dialogMessage="Please provide a reason for rejection of this request."
      handleChange={handleChangeReject}
      handleReject={handleReject}
      handleClose={handleClose}
      textAreaMaxLength={TEXTAREA_MAX_LENGTH}
    />
  );
};

export default connect(
  mapState,
  actionCreators
)(NotificationRejectModal);
