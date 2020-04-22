import React, { useState, useEffect, FC, ReactElement } from 'react';
import { AppState } from '../shared/types/genericTypes';
import { connect } from 'react-redux';
import { NotificationCard } from 'umgc_ui_library/lib/cards/notificationCard';
import {
  fetchManualNotifications,
  fetchManualNotificationsFilter,
  setFilterFacet,
  fetchNotificationsCount,
  setNotificationsArchive,
  setIsNewOrArchived,
  setNotificationsApprove,
  setNotificationsReject
} from '../shared/actions/manualNotificationAction';
import { ManualNotificationListModel, Categories } from './../shared/models/ManualNotification.model';
import ManualNotificationList from '../components/notifications/ManualNotificationList';
import NotificationRejectModal from '../components/Modal/NotificationRejectModal';
import images from './../images/images';
import { useQuery } from './../utils/customHooks';
import { history } from './../App';
import { setReject } from '../shared/actions/commonActions';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Skeleton from 'react-loading-skeleton';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

const MANUAL_NOTIFICATION_FACETS = 'alert_type';
const MANUAL_NOTIFICATION_EMERGENCY = 'type';

type Props = {
  notifications?: ManualNotificationListModel;
  categories?: Categories[];
  isNewOrArchived?: string;
  setFilterFacet: (a: string) => void;
  setIsNewOrArchived?: (a: string) => void;
  fetchManualNotifications?: <T>(newOrArchive: string, id?: string, type?: string) => Promise<T>;
  fetchManualNotificationsFilter?: <T>() => Promise<T>;
  fetchNotificationsCount?: <T>() => T;
  setNotificationsArchive?: <T>(a: number | undefined) => T;
  setNotificationsApprove?: <T>(sysId: string) => T;
  setNotificationsReject?: <T>(sysId: string, message: string) => T;
  setReject?: <T>(isShow: boolean, sysId: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  notifications: state.manualNotificationReducers.manualNotificationsListState,
  categories: state.manualNotificationReducers.categories,
  isNewOrArchived: state.manualNotificationReducers.isNewOrArchived
});

const actionCreators = {
  fetchManualNotifications,
  fetchManualNotificationsFilter,
  setFilterFacet,
  fetchNotificationsCount,
  setIsNewOrArchived,
  setNotificationsArchive,
  setNotificationsApprove,
  setNotificationsReject,
  setReject
};

export const Notifications: FC<Props> = props => {
  const {
    notifications,
    categories,
    fetchManualNotifications,
    fetchManualNotificationsFilter,
    setFilterFacet,
    fetchNotificationsCount,
    setIsNewOrArchived,
    isNewOrArchived,
    setNotificationsArchive,
    setNotificationsApprove,
    setReject
  } = props;

  const query = useQuery();
  const facetInQuery = query.get(MANUAL_NOTIFICATION_FACETS) ? query.get(MANUAL_NOTIFICATION_FACETS) : '';
  const facetQueryType = query.get(MANUAL_NOTIFICATION_EMERGENCY) ? query.get(MANUAL_NOTIFICATION_EMERGENCY) : '';
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    fetchManualNotificationsFilter!()
      .then(() => setIsFetching(false))
      .catch(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    setFilterFacet && setFilterFacet(facetInQuery);
    fetchNotificationsCount && fetchNotificationsCount();
    if (facetInQuery === 'all') {
      fetchManualNotifications && isNewOrArchived && fetchManualNotifications(isNewOrArchived);
      return;
    }
    fetchManualNotifications &&
      isNewOrArchived &&
      fetchManualNotifications(isNewOrArchived, facetInQuery, facetQueryType);
  }, [facetInQuery, isNewOrArchived]);

  const onClickInboxAll = (): void => {
    setIsNewOrArchived && setIsNewOrArchived('new');
    history.push('/notifications/new?alert_type=all');
    fetchNotificationsCount && fetchNotificationsCount();
  };

  const onClickArchiveAll = (): void => {
    setIsNewOrArchived && setIsNewOrArchived('archived');
    history.push('/notifications/archived?alert_type=all');
    fetchNotificationsCount && fetchNotificationsCount();
  };

  const onArchive = (drupal_id?: number): void => {
    setNotificationsArchive && setNotificationsArchive(drupal_id);
    history.push('/notifications/new?alert_type=all');
  };

  const onApprove = (sys_id?: number): void => {
    if (setNotificationsApprove && sys_id) {
      setNotificationsApprove(sys_id.toString());
      history.push('/notifications/new?alert_type=all');
    }
  };

  const onReject = (sysId?: number): void => {
    if (sysId && setReject) {
      setReject(true, sysId.toString());
    }
  };

  const notificationsHeaderSkeleton = (): ReactElement => (
    <div className="d-flex justify-content-between mb-5">
      <Skeleton width={170} height={30} />
      <Skeleton width={150} height={30} />
    </div>
  );

  const notificationsSkeleton = (): ReactElement[] => {
    return Array(4)
      .fill('item')
      .map((x: string, i: number) => (
        <Col md={12} className="" key={`${x + i}`}>
          <NotificationCard isFetching={true} title="" />
        </Col>
      ));
  };

  return (
    <>
      <div className="notifications">
        {!isFetching && notifications && Object.entries(notifications).length !== 0 ? (
          <ManualNotificationList
            currentFacet={facetInQuery}
            categories={categories}
            notificationList={notifications}
            backgroundImage={images.noNotification}
            setFilterFacet={setFilterFacet}
            onClickInboxAll={onClickInboxAll}
            onClickArchiveAll={onClickArchiveAll}
            onArchive={onArchive}
            onApprove={onApprove}
            onReject={onReject}
            isNewOrArchived={isNewOrArchived}
          />
        ) : (
          <Container className="article-list mt-5">
            {notificationsHeaderSkeleton()}
            <Skeleton width={75} />
            <div className="w-100">
              <ListGroup variant="flush">
                <Row>{notificationsSkeleton()}</Row>
              </ListGroup>
            </div>
          </Container>
        )}
        <NotificationRejectModal idAndIsShow={{ isShow: false, sysId: '0' }} textarea="" />
      </div>
    </>
  );
};

export default connect(mapState, actionCreators)(Notifications);
