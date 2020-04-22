import React, { FC, useEffect, useState } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';

import { history } from '../../App';
import { AppState } from '../../shared/types/genericTypes';
import { AppreciationCardNotificationModel as AlertModel } from '../../shared/models/Notification.model';
import ModalAppreciationCardPreview from '../../components/appreciationCards/ModalAppreciationCardPreview';
import {
  BTN_SINGLE_CARD_TXT,
  ALERT_TYPE_RECEIVED,
  ALERT_TYPE_SUPERVISOR,
  BTN_MULTIPLE_CARDS_TXT,
  SINGLE_APPRECIATION_CARD_MSG,
  MULTIPLE_APPRECIATION_CARD_MSG,
  MULTIPLE_APPRECIATION_CARD_MSG_MANAGER
} from '../../constants/constants';

// Actions
import { fetchAppreciationCardData, archiveAlertAction } from '../../shared/actions/appreciationActions';

// Components
import AppreciationCardNotification from '../../components/notifications/AppreciationCardNotification';

type Props = {
  appreciationCardAlert?: AlertModel[];
  appreciationManagerCardAlert?: AlertModel[];
  archiveAlertAction?: <T>(cardId: string | number) => Promise<T>;
  fetchAppreciationCardData?: <T>(alertType?: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  appreciationCardAlert: state.appreciationReducers.appreciationCardAlert,
  appreciationManagerCardAlert: state.appreciationReducers.appreciationManagerCardAlert
});

const actionCreators = {
  archiveAlertAction,
  fetchAppreciationCardData
};

const AppreciationCardsCommon: FC<Props> = props => {
  const [viewCard, setViewCard] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState<AlertModel>({} as AlertModel);

  let cardTitle = '';
  let managerCardTitle = '';

  const {
    archiveAlertAction,
    appreciationCardAlert = [],
    fetchAppreciationCardData,
    appreciationManagerCardAlert = []
  } = props;

  const apiCallForAlerts = (): void => {
    fetchAppreciationCardData!(ALERT_TYPE_RECEIVED);
    fetchAppreciationCardData!(ALERT_TYPE_SUPERVISOR);
  };

  useEffect(() => {
    apiCallForAlerts();
  }, []);

  const handleCardsTitle = (): {
    cardTitle: string;
    managerCardTitle: string;
  } => {
    if (appreciationCardAlert.length) {
      if (appreciationCardAlert.length > 1) {
        cardTitle = MULTIPLE_APPRECIATION_CARD_MSG;
      } else {
        cardTitle = SINGLE_APPRECIATION_CARD_MSG;
      }
    }

    if (appreciationManagerCardAlert.length) {
      if (appreciationManagerCardAlert.length > 1) {
        managerCardTitle = MULTIPLE_APPRECIATION_CARD_MSG_MANAGER;
      } else {
        managerCardTitle = `${appreciationManagerCardAlert[0].recipientFirstName} ${appreciationManagerCardAlert[0].recipientLastName} received an Appreciation Card!`;
      }
    }

    return { cardTitle, managerCardTitle };
  };

  const handleBtnTxtAndClick = (alertType: AlertModel[]): string => {
    if (alertType.length > 1) {
      return BTN_MULTIPLE_CARDS_TXT;
    }

    return BTN_SINGLE_CARD_TXT;
  };

  const handleRouteAndClick = (alertType: AlertModel[]): void => {
    if (alertType) {
      if (alertType.length > 1) {
        for (let i = 0; i < alertType.length; i++) {
          archiveAlertAction!(alertType[i].cardId || '');
        }

        apiCallForAlerts();

        return history.push('/appreciation-cards');
      }

      setCardInfo(alertType[0]);

      archiveAlertAction!(get(alertType, '[0].cardId', '')).then(() => apiCallForAlerts());

      return setViewCard(true);
    }
  };

  return (
    <>
      <ModalAppreciationCardPreview
        viewCard={viewCard}
        cardInfo={cardInfo}
        handleCardModalClose={() => setViewCard(false)}
      />
      <AppreciationCardNotification
        {...{
          alertType: appreciationCardAlert,
          cardTitle: handleCardsTitle().cardTitle,
          buttonTitle: handleBtnTxtAndClick(appreciationCardAlert),
          handleClick: () => handleRouteAndClick(appreciationCardAlert)
        }}
      />
      <AppreciationCardNotification
        {...{
          alertType: appreciationManagerCardAlert,
          cardTitle: handleCardsTitle().managerCardTitle,
          buttonTitle: handleBtnTxtAndClick(appreciationManagerCardAlert),
          handleClick: () => handleRouteAndClick(appreciationManagerCardAlert)
        }}
      />
    </>
  );
};

export default connect(mapState, actionCreators)(AppreciationCardsCommon);
