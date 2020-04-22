import React, { FC, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Department } from '../shared/models/Department.model';
import UserInfoModel from '../shared/models/UserInfo.model';
import { TemplateIdsModel } from '../shared/models/Template.model';
import { fetchUsersByEmail } from '../shared/actions/usersActions';
import { AppState } from '../shared/types/genericTypes';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';
import find from 'lodash.find';
import { Card, ContentWrapper } from 'umgc_ui_library/lib';
import LinksCards from '../components/links/LinksCards';

type Props = {
  content: Department;
  contentIds: TemplateIdsModel;
  departmentContacts?: UserInfoModel[];
  fetchUsersByEmail?: (email: string) => void;
};

const mapState: any = (state: AppState, props: Props): Props => {
  return {
    ...props,
    departmentContacts: state.usersReducers.users
  };
};

const actionCreators = { fetchUsersByEmail };

export const Template: FC<Props> = props => {
  const { content, departmentContacts, fetchUsersByEmail } = props;
  const flatContacts = content.contacts
    ? content.contacts.reduce((acc: string[], val) => acc.concat(val.contacts), [])
    : [];

  useEffect(() => {
    fetchUsersByEmail && fetchUsersByEmail(flatContacts.join(','));
  }, []);

  return (
    <>
      {props.content.body && (
        <Row className="px-3 pt-3">
          <ContentWrapper title='' topBorder="darkTurquoise">
            <div
              dangerouslySetInnerHTML={{
                __html: createDOMPurify.sanitize(props.content.body)
              }}
            />
          </ContentWrapper>
        </Row>
      )}

      {!!flatContacts.length && props.contentIds.contentBuckets[0] && (
        <Row>
          <Col md={6} className="py-md-5 py-2">
            <LinksCards category={props.contentIds.contentBuckets[0]} />
          </Col>
          <Col md={6} className="py-md-5 py-2">
            <Card
              title="Contacts"
              topBorder="green"
              variant="standard"
              type="cardsInContainer"
            >
              <Row>
                {
                  departmentContacts && departmentContacts.map(c => {
                    const officeNumber = find(c.phone, { type: 'desk' });
                    const mobileNumber = find(c.phone, { type: 'mobile' });
                    return (
                      <Col key={c.email} md={12} className="p-1">
                        <Card {...{
                          type: 'contactMe',
                          variant: 'profile',
                          title: get(c, 'fullName', ''),
                          office: get(officeNumber, 'number', ''),
                          mobile: get(mobileNumber, 'number', ''),
                          email: c.email,
                          contactPic: get(c, 'profilePicture.medium'),
                          isCurrentUser: false,
                          LinkToProfile: (p: React.PropsWithChildren<{}>) => (
                            <Link to={`/profile?upn=${c.email}`}>{p.children}</Link>
                          )
                        }} />
                      </Col>
                    );
                  })
                }
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default connect(mapState, actionCreators)(Template);
