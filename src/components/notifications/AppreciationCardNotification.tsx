import React, { FC } from 'react';
import { Card } from 'umgc_ui_library/lib';
import { AppreciationCardNotificationModel as AlertModel } from '../../shared/models/Notification.model';

interface Props {
  cardTitle: string;
  buttonTitle?: string;
  alertType?: AlertModel[];
  handleClick?: () => void;
}

const AppreciationCardNotification: FC<Props> = props => {
  const { cardTitle, buttonTitle, handleClick, alertType } = props;

  if (alertType && !alertType.length) {
    return null;
  }

  return (
    <div className="mb-3 mt-4">
      <Card
        title={cardTitle}
        type="appreciation"
        onClick={handleClick}
        variant="notification"
        buttonTitle={buttonTitle}
      />
    </div>
  );
};

export default AppreciationCardNotification;
