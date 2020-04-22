import React, { FC, ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { NotificationCard } from 'umgc_ui_library/lib/cards/notificationCard';
import { NoNotification } from 'umgc_ui_library/lib/components/noNotification';
import {
  ManualNotificationListModel,
  Categories,
  ManualNotification
} from './../../shared/models/ManualNotification.model';
import { formatDateTime } from '../../shared/services/date';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import { filterQuery } from '../../utils/customHooks';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';

const MANUAL_NOTIFICATION_FACETS = 'alert_type';
const EMERGENCY_NOTIFICATION = 'Emergency';
interface Props {
  notificationList?: ManualNotificationListModel;
  backgroundImage?: string;
  setFilterFacet: (a: string) => void;
  categories?: Categories[];
  currentFacet?: string;
  onClickInboxAll?: () => void;
  onClickArchiveAll?: () => void;
  onArchive?: (drupal_id?: number) => void;
  onApprove?: (drupal_id?: number) => void;
  onReject?: (drupal_id?: number) => void;
  isNewOrArchived?: string;
}

const ManualNotificationList: FC<Props> = props => {
  const {
    notificationList,
    backgroundImage,
    setFilterFacet,
    categories,
    currentFacet,
    onClickInboxAll,
    onClickArchiveAll,
    onArchive,
    onApprove,
    onReject,
    isNewOrArchived
  } = props;

  const inbox = isNewOrArchived === 'new' ? 'inbox' : 'archive text-secondary';
  const archive = isNewOrArchived === 'new' ? 'archive text-secondary' : 'inbox';
  const isArchive = isNewOrArchived !== 'new';
  const titleNoNotification = isNewOrArchived === 'new' ? 'No new Notifications' : 'No Archived Notifications';
  const setFilterQuery = filterQuery();
  const noNotificationShow = isArchive
    ? notificationList && notificationList.alerts.total === 0
    : notificationList && notificationList.alerts.total === 0 && notificationList.approvals.total === 0;

  if (categories && categories.length > 0 && Object.prototype.hasOwnProperty.call(categories[0], 'drupal_id')) {
    if (!isArchive && categories[0].drupal_id !== -1) {
      categories.unshift({ drupal_id: -1, title: 'My Approvals' });
    } else {
      isArchive && categories[0].drupal_id === -1 && categories.shift();
    }
  }

  function handleDropDownChange (value: HTMLSelectElement): void {
    let alertTypeQuery = '';
    if (value.selectedOptions[0].text === EMERGENCY_NOTIFICATION) {
      alertTypeQuery = `type=${EMERGENCY_NOTIFICATION}&${MANUAL_NOTIFICATION_FACETS}`;
    } else {
      alertTypeQuery = MANUAL_NOTIFICATION_FACETS;
    }
    setFilterQuery.useFilterQuery(alertTypeQuery, value.selectedOptions[0].value, setFilterFacet);
  }

  const listedNotification = (notifications: ManualNotification[], isApprove: boolean): ReactElement => {
    return (
      <div>
        {notifications &&
          notifications.map((notification: ManualNotification) => (
            <Col md={12} className="mb-3 mb-md-4" key={notification.drupal_id + '_notificationsCol'}>
              <NotificationCard
                isNew={false}
                isArchive={isArchive}
                isApprove={isApprove}
                serviceNowLink={notification.serviceNowLink}
                categories={notification.owner}
                notificationType={notification.notificationType}
                dateTime={formatDateTime(notification.created)}
                title={notification.title}
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
                onArchive={(drupal_id?: number) => onArchive && onArchive(drupal_id)}
                onApprove={(drupal_id?: number) => onApprove && onApprove(drupal_id)}
                onReject={(drupal_id?: number) => onReject && onReject(drupal_id)}
              />
            </Col>
          ))}
      </div>
    );
  };

  const alertsOrApprovalTag = (title: string): ReactElement => (
    <Col md={12} className="mb-3">
      <h6 className="font-weight-bolder">{title}</h6>
    </Col>
  );

  const listedNotificationList = (notificationList: ManualNotificationListModel): ReactElement => {
    return (
      <div className="w-100">
        {!isArchive && notificationList.approvals.total !== 0 && alertsOrApprovalTag('My Approvals')}
        {!isArchive &&
          notificationList.approvals.total !== 0 &&
          listedNotification(notificationList.approvals.notifications, true)}
        {notificationList.alerts.total !== 0 && alertsOrApprovalTag('Alerts')}
        {notificationList.alerts.total !== 0 && listedNotification(notificationList.alerts.notifications, false)}
      </div>
    );
  };
  const isVisibleFilter = (): boolean => {
    let isVisible = true;
    if (!notificationList) {
      isVisible = false;
    }
    return isVisible;
  };

  return (
    <Container className="article-list mt-5">
      <Row>
        <Col xs="12" lg="4">
          <p className="font-size-xl">
            <b>Notifications</b>
          </p>
        </Col>
        <Col xs="6" lg="4">
          <div className="float-left mt-2">
            <span
              className={`pr-4 mt-1 font-weight-bolder font-size-sm  notification-${inbox} cursor-pointer`}
              onClick={onClickInboxAll}
            >
              INBOX
            </span>
            <span
              className={`mt-1 font-weight-bolder font-size-sm notification-${archive} cursor-pointer`}
              onClick={onClickArchiveAll}
            >
              ARCHIVE
            </span>
          </div>
        </Col>
        <Col xs="6" lg="4" className="pr-0">
          {isVisibleFilter() ? (
            <Col md={12} className="d-flex justify-content-end">
              <Form className="d-flex mt-2">
                <Form.Label className="font-size-sm mb-0 align-self-center mr-3 d-none d-md-block d-lg-block">
                  Filter by:
                </Form.Label>
                <div className="w-md-50 align-items-center">
                  <Form.Control
                    className="w-md-auto align-items-center"
                    size="sm"
                    as="select"
                    id="filter"
                    name="filter"
                    onChange={(e: React.SyntheticEvent) => handleDropDownChange(e.target as HTMLSelectElement)}
                    value={currentFacet}
                  >
                    <option value="all">All</option>
                    {categories instanceof Array &&
                      categories.map((category: Categories) => (
                        <option key={category.drupal_id} value={category.drupal_id}>
                          {category.title}
                        </option>
                      ))}
                  </Form.Control>
                </div>
              </Form>
            </Col>
          ) : null}
        </Col>
      </Row>
      {noNotificationShow ? (
        <NoNotification
          backgroundImage={backgroundImage}
          title={titleNoNotification}
          message={"We'll let you know when something pops up!"}
        />
      ) : (
        <ListGroup variant="flush" className="mt-4">
          <Row>{notificationList && listedNotificationList(notificationList)}</Row>
        </ListGroup>
      )}
    </Container>
  );
};

export default ManualNotificationList;
