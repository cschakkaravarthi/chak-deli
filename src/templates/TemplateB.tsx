import React, { FC, useEffect } from 'react';
import LinksCards from '../components/links/LinksCards';
import ArticlesMinimalList from '../components/articles/ArticlesMinimalList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'umgc_ui_library/lib';
import { Department } from '../shared/models/Department.model';
import { fetchUsersByEmail } from '../shared/actions/usersActions';
import { AppState } from '../shared/types/genericTypes';
import get from 'lodash.get';
import find from 'lodash.find';
import { TemplateIdsModel } from '../shared/models/Template.model';
import UserInfoModel from '../shared/models/UserInfo.model';

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
      {props.contentIds.contentBuckets[0] &&
        <LinksCards category={props.contentIds.contentBuckets[0]} mdCols="col-md-3"/>
      }
      {props.contentIds.ownerId && flatContacts.length && (
        <Row>
          <Col md={6} className="py-md-5 py-2">
            <ArticlesMinimalList owner={props.contentIds.ownerId}/>
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
      {props.contentIds.contentBuckets[1] &&
        <LinksCards category={props.contentIds.contentBuckets[1]} showImages={false} mdCols="col-md-3" />
      }
    </>
  );
};

export default connect(mapState, actionCreators)(Template);
