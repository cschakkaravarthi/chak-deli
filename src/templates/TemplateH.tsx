import React, { FC, useEffect } from 'react';
import get from 'lodash.get';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AppState } from '../shared/types/genericTypes';
import { Card } from 'umgc_ui_library';
import { connect } from 'react-redux';
import BasicCard from 'react-bootstrap/Card';
import { fetchNotifications } from '../shared/actions/notificationActions';
import { history } from '../App';
import QuickTools from '../components/links/QuickTools';
import { AppreciationCardNotificationModel as AlertModel } from '../shared/models/Notification.model';
import { NotificationCard } from 'umgc_ui_library/lib/cards/notificationCard';
import { ManualNotification, ManualNotifications } from './../shared/models/ManualNotification.model';
import {
  setNotificationsApprove,
  fetchNotificationsCount,
  fetchManualNotifications
} from './../shared/actions/manualNotificationAction';
import { formatDateTime } from './../shared/services/date';
import createDOMPurify from 'dompurify';
import NotificationRejectModal from '../components/Modal/NotificationRejectModal';
import { setReject } from '../shared/actions/commonActions';
import LandingArticlesAndEvents from '../components/articles/LandingArticlesAndEvents';
import { REQUEST_LIMIT_5 } from '../constants/constants';
import AppreciationCardsCommon from '../components/appreciationCards/AppreciationCardsCommon';

type Props = {
  fetchNotifications?: <T>() => T;
  appreciationAlertsLoading?: boolean;
  fetchNotificationsCount?: <T>() => T;
  appreciationCardAlert?: AlertModel[];
  notificationList?: ManualNotifications;
  appreciationManagerCardAlert?: AlertModel[];
  setNotificationsApprove?: <T>(sysId: string) => T;
  setReject?: <T>(isShow: boolean, sysId: string) => T;
  setNotificationsReject?: <T>(sysId: string, message: string) => T;
  fetchManualNotifications?: <T>(newOrArchive: string, id?: string, type?: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  notificationList: state.manualNotificationReducers.manualNotificationsListState.approvals
});

const actionCreators = {
  setReject,
  fetchNotifications,
  setNotificationsApprove,
  fetchNotificationsCount,
  fetchManualNotifications
};

export const TemplateH: FC<Props> = props => {
  let limitedNotification: ManualNotification[] = [];

  const {
    setReject,
    notificationList,
    fetchNotifications,
    fetchNotificationsCount,
    setNotificationsApprove,
    fetchManualNotifications
  } = props;

  useEffect(() => {
    fetchNotifications && fetchNotifications();
    fetchNotificationsCount && fetchNotificationsCount();
    fetchManualNotifications && fetchManualNotifications('new');
  }, []);

  if (notificationList) {
    limitedNotification = notificationList.notifications.slice(0, Number(REQUEST_LIMIT_5));
  }

  const onApprove = (sys_id?: number): void => {
    if (setNotificationsApprove && sys_id) {
      setNotificationsApprove(sys_id.toString());
    }
  };

  const onReject = (sysId?: number): void => {
    if (sysId && setReject) {
      setReject(true, sysId.toString());
    }
  };

  return (
    <>
      <NotificationRejectModal idAndIsShow={{ isShow: false, sysId: '0' }} textarea="" />
      <AppreciationCardsCommon />
      <LandingArticlesAndEvents />
      {false && ( // this depends on a ticket where Jorge is currently working on
        <Row>
          <Col className="my-3">
            <Card
              variant="create"
              type="appreciation"
              title="CREATE CARD"
              onClick={() => history.push('/appreciation-cards/create')}
            />
          </Col>
        </Row>
      )}
      {limitedNotification && !!Object.entries(limitedNotification).length && (
        <BasicCard className="px-4 pb-5 pt-3 mt-3 card-notification-standard border-0 rounded-0">
          <h4 className="font-weight-bold mb-3">My Approvals</h4>
          <Row>
            {limitedNotification.map((notification: ManualNotification) => (
              <Col md={12} className="mb-1" key={notification.drupal_id + '_notificationsCol'}>
                <NotificationCard
                  isNew={false}
                  isApprove={true}
                  isArchive={false}
                  serviceNowLink={notification.serviceNowLink}
                  notificationType="home"
                  title={notification.title}
                  categories={notification.owner}
                  dateTime={formatDateTime(notification.created)}
                  body_full={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: createDOMPurify.sanitize(get(notification, 'body_full', ''))
                      }}
                    />
                  }
                  body_summary={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: createDOMPurify.sanitize(get(notification, 'summary', ''))
                      }}
                    />
                  }
                  drupal_id={notification.drupal_id}
                  onApprove={(drupal_id?: number) => onApprove && onApprove(drupal_id)}
                  onReject={(drupal_id?: number) => onReject && onReject(drupal_id)}
                />
              </Col>
            ))}
          </Row>
        </BasicCard>
      )}
      <QuickTools />
    </>
  );
};

export default connect(mapState, actionCreators)(TemplateH);
