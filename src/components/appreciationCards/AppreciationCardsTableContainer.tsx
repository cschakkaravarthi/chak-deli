import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { AppreciationCardsListGrouped } from '../../shared/models/AppreciationCards.model';
import AppreciationCardTable from './AppreciationCardsTable';
import { AppState } from '../../shared/types/genericTypes';
import { getAppreciationCardsListGrouped, viewAppreciationCard, getAppreciationCardsByType } from '../../shared/actions/appreciationActions';
import { capitalizeFirstLetter } from '../../utils/utilities';
import { AppreciationCardNotificationModel as AppreciationCard } from '../../shared/models//Notification.model';
import { UserProfileModel } from '../../shared/models/UserInfo.model';
import { history } from '../../App';

// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContentWrapper, UploadButton } from 'umgc_ui_library/lib';
import ModalAppreciationCardPreview from '../../components/appreciationCards/ModalAppreciationCardPreview';

type Props = {
  appreciationCardsListGrouped?: AppreciationCardsListGrouped;
  getAppreciationCardsListGrouped?: () => void;
  viewAppreciationCard?: (displayCardView: boolean, cardToView: AppreciationCard) => void;
  cardToView?: AppreciationCard;
  displayCardView?: boolean;
  userProfileDetails?: UserProfileModel;
  pathName?: string;
  getAppreciationCardsByType?: (cardType: string, offsetKey?: string) => void;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  cardToView: state.appreciationReducers.cardToView,
  displayCardView: state.appreciationReducers.displayCardView,
  userProfileDetails: state.userProfileReducers.userProfileDetails,
  appreciationCardsListGrouped: state.appreciationReducers.appreciationCardsListGrouped
});

const actionCreators = {
  getAppreciationCardsListGrouped,
  viewAppreciationCard,
  getAppreciationCardsByType
};

const AppreciationCardTableContainer: FC<Props> = props => {
  const {
    pathName,
    cardToView,
    userProfileDetails,
    viewAppreciationCard,
    displayCardView = false,
    appreciationCardsListGrouped,
    getAppreciationCardsListGrouped,
    getAppreciationCardsByType
  } = props;

  useEffect(() => {
    getAppreciationCardsListGrouped!();
  }, [userProfileDetails]);

  return (
    <Row className="mb-5">
      {cardToView && (
        <ModalAppreciationCardPreview
          viewCard={displayCardView}
          cardInfo={cardToView}
          handleCardModalClose={() => viewAppreciationCard && viewAppreciationCard(false, cardToView)}
        />
      )}
      <Col>
        <ContentWrapper title="" topBorder="darkTurquoise">
          <h6 className="font-weight-bold pb-3 my-toolkit-spacing d-inline-block">APPRECIATION CARDS</h6>
          <UploadButton
            title="Send New Card"
            handleClick={() => history.push('/appreciation-cards/create')}
            className="primary-button text-uppercase btn-sm close-button mt-1 float-right"
            uniqueIdentifier="preview-card-send"
          />
          {
            ['received', 'sent', 'team'].map((cardsGroup) => get(appreciationCardsListGrouped, `[${cardsGroup}].length`, 0) > 0 ? (
              <div key={cardsGroup} className="mb-5">
                <h6 className="font-weight-bold">
                  {capitalizeFirstLetter(cardsGroup)}
                </h6>
                <AppreciationCardTable
                  cardsList={get(appreciationCardsListGrouped, `[${cardsGroup}]`)}
                  type={cardsGroup}
                  viewAppreciationCard={viewAppreciationCard}
                  pathName={pathName}
                  loadMoreCards={(type, offsetKey) => getAppreciationCardsByType && getAppreciationCardsByType(type, offsetKey)}
                />
              </div>
            ) : null)
          }
        </ContentWrapper>
      </Col>
    </Row>
  );
};

export default connect(mapState, actionCreators)(AppreciationCardTableContainer);
