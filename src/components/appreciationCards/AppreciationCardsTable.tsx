import React, { FC } from 'react';
import get from 'lodash.get';
import { DateRangeHeader } from 'umgc_ui_library/lib';
import { ArchiveAppreciation } from 'umgc_ui_library/lib/archiveAppreciation/archiveAppreciation';
import { AppreciationCardNotificationModel as AppreciationCard } from '../../shared/models//Notification.model';
import { formatUnixMilliseconds } from '../../shared/services/date';

type Props = {
  type?: string;
  pathName?: string;
  cardsList?: AppreciationCard[];
  loadMoreCards?: (cardType: string, offsetKey?: string) => void;
  getAppreciationCardsListGrouped?: () => void;
  viewAppreciationCard?: (displayCardView: boolean, cardToView: AppreciationCard) => void;
};

const AppreciationCardTable: FC<Props> = props => {
  const { type = '', pathName, cardsList = [], viewAppreciationCard, loadMoreCards } = props;

  const getCardLeftTitle = (card: AppreciationCard): string => {
    const leftTitle = type === 'sent'
      ? `${card.recipientFirstName} ${card.recipientLastName}`
      : `${card.senderFirstName} ${card.senderLastName}`;

    return leftTitle;
  };

  const getLastEvaluatedKey = (): string => {
    const lastCardIndex = cardsList.length - 1;
    const cardOffsetKey = get(cardsList, `[${lastCardIndex}].cardId`);
    return cardOffsetKey;
  };

  return (
    <>
      <div className="border p-3">
        <DateRangeHeader leftTitle="From" rightTitle="Date" />
        {cardsList &&
          cardsList.map((card: AppreciationCard) => {
            const leftTitle = getCardLeftTitle(card);
            return (
              <ArchiveAppreciation
                key={card.cardId}
                leftTitle={leftTitle}
                date={formatUnixMilliseconds(Number(card.dateSent))}
                wrapperClassName="mt-3"
                MainLink={props => (
                  <div className="btn" onClick={() => viewAppreciationCard!(true, card)}>
                    {props.children}
                  </div>
                )}
              />
            );
          })}
      </div>
      {/* Display: none while we discuss how to improve this in the DB */}
      <div className="mt-3 text-center" style={{ display: 'none' }}>
        <small className="btn" onClick={() => loadMoreCards!(type, getLastEvaluatedKey())}>
          <u className="font-weight-bold my-toolkit-spacing">
            {pathName === '/appreciation-cards' ? 'LOAD MORE' : 'VIEW ALL CARDS'}
          </u>
        </small>
      </div>
    </>
  );
};

export default AppreciationCardTable;
