import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Card, UploadButton } from 'umgc_ui_library';
import { AppreciationCardNotificationModel as AlertModel } from '../../shared/models/Notification.model';
import isEmpty from 'lodash.isempty';

type Props = {
  viewCard: boolean;
  cardInfo: AlertModel;
  handleCardModalClose: () => void;
  preSendMode?: boolean;
  preSendModeAction?: () => void;
};

const ModalAppreciationCardPreview: FC<Props> = props => {
  const {
    cardInfo,
    viewCard,
    handleCardModalClose,
    preSendMode = false,
    preSendModeAction
  } = props;

  if (isEmpty(cardInfo)) return null;

  return (
    <Modal
      size="lg"
      centered={true}
      show={viewCard}
      onHide={handleCardModalClose}
      className="appreciation-card-modal"
    >
      <Card
        variant="default"
        type="appreciation"
        imgTopSrc={cardInfo.topImg}
        imgBottomSrc={cardInfo.bottomImg}
        appreciationText={cardInfo.cardMessage}
        title={`${cardInfo.recipientFirstName} ${cardInfo.recipientLastName}`}
        senderName={`${cardInfo.senderFirstName} ${cardInfo.senderLastName}`}
      />
      {preSendMode ? (
        <div className="d-flex justify-content-center card-preview-btn-container position-absolute w-100">
          <UploadButton
            title="Cancel"
            handleClick={handleCardModalClose}
            className="primary-button text-uppercase btn-sm mt-3 mr-2"
            uniqueIdentifier="preview-card-cancel"
          />
          <UploadButton
            title="Send"
            handleClick={preSendModeAction}
            className="primary-button text-uppercase btn-sm close-button mt-3"
            uniqueIdentifier="preview-card-send"
          />
        </div>
      ) : (
        <div className="close-button-appreciation d-flex justify-content-center">
          <UploadButton
            title="close"
            handleClick={handleCardModalClose}
            className="primary-button text-uppercase btn-sm close-button position-absolute mt-3"
          />
        </div>
      )}
    </Modal>
  );
};

export default ModalAppreciationCardPreview;
