import React, { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  DepartmentTemplate,
  ContactGroup
} from '../../shared/models/Department.model';
import { match } from 'react-router';
import { AppState } from '../../shared/types/genericTypes';
import { connect } from 'react-redux';
import { fetchDepartmentById } from '../../shared/actions/departmentActions';
import get from 'lodash.get';
import find from 'lodash.find';
import { Page as PageModel } from '../../shared/models/Page.model';
import { Card } from 'umgc_ui_library/lib';
import { Link } from 'react-router-dom';
import { contentToDepartment, VariousContentModel } from '../../shared/types/contentTypes';
import UserInfoModel from '../../shared/models/UserInfo.model';
import DepartmentTopBar from './DepartmentTopBar';
import { fetchUsersByEmail } from '../../shared/actions/usersActions';

type Props = {
  match?: match;
  departmentId?: number;
  department?: VariousContentModel;
  departmentContacts?: UserInfoModel[];
  fetchDepartmentById?: (departmentId: number) => Promise<void>;
  fetchUsersByEmail?: (email: string) => void;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const departmentId = parseInt(get(props, 'match.params.id'), 10);
  return {
    ...props,
    departmentId,
    departmentContacts: state.usersReducers.users,
    department: state.departmentReducers.departments.content.find(
      d => d.drupal_id === departmentId
    )
  };
};

const actionCreators = { fetchDepartmentById, fetchUsersByEmail };

const getPeoplePage = (): PageModel => {
  return {
    type: 'page',
    language: 'en',
    categories: [],
    category_ancestors: [],
    owner: [],
    drupal_id: 0,
    title: 'People'
  };
};

const getGroupContacts = (contactGroup: ContactGroup, allContacts: (UserInfoModel[])): UserInfoModel[] => {
  contactGroup.contacts = contactGroup.contacts.map(c => c.toLowerCase());
  return allContacts.filter(c => {
    if (c && c.email) {
      return contactGroup.contacts.includes(c.email.toLowerCase());
    }
    return false;
  });
};

export const DepartmentPeople: FC<Props> = props => {
  const {
    departmentId,
    department,
    fetchDepartmentById,
    fetchUsersByEmail,
    departmentContacts
  } = props;

  useEffect(() => {
    departmentId && fetchDepartmentById && fetchDepartmentById(departmentId);
  }, [departmentId, fetchDepartmentById]);

  let flatContacts: string[] = [];

  let typedDepartment = null;

  if (department) {
    typedDepartment = contentToDepartment(department);
    flatContacts = typedDepartment && typedDepartment.contacts
      ? typedDepartment.contacts.reduce((acc: string[], val) => acc.concat(val.contacts), [])
      : [];
  }

  useEffect(() => {
    if (flatContacts.length > 0) {
      fetchUsersByEmail && fetchUsersByEmail(flatContacts.join(','));
    }
  }, [department]);

  const getTemplateId = (): string => {
    const getTemplates = get(
      department,
      'template',
      [] as DepartmentTemplate[]
    );
    return getTemplates[0].drupal_id + '';
  };

  const templateId = department && getTemplateId();

  const page = getPeoplePage();

  return departmentId && department && typedDepartment && departmentContacts && templateId ? (
    <div className='departments pb-5'>
      <DepartmentTopBar
        departmentId={departmentId}
        active={-1}
        page={page}
      />
      <Container>
        {typedDepartment.contacts && typedDepartment.contacts.map(contactGroup => {
          const groupContacts = getGroupContacts(contactGroup, departmentContacts);
          return (
            <Row key={contactGroup.group_label}>
              <Col md={12} className='py-md-2 py-2'>
                <Card
                  title={contactGroup.group_label || 'Contacts'}
                  topBorder='green'
                  variant='standard'
                  type='cardsInContainer'>
                  <Row>
                    {groupContacts &&
                      groupContacts.map(c => {
                        const officeNumber = find(c.phone, { type: 'desk' });
                        const mobileNumber = find(c.phone, { type: 'mobile' });
                        return (
                          <Col key={c.email} md={6} className='py-1 px-3'>
                            <Card
                              {...{
                                type: 'contactMe',
                                variant: 'profile',
                                title: get(c, 'fullName', ''),
                                office: get(officeNumber, 'number', ''),
                                mobile: get(mobileNumber, 'number', ''),
                                email: c.email,
                                contactPic: get(c, 'profilePicture.medium'),
                                isCurrentUser: false,
                                LinkToProfile: (p: React.PropsWithChildren<{}>) => (
                                  <Link to={`/profile?upn=${c.email}`}>
                                    {p.children}
                                  </Link>
                                )
                              }}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  ) : null;
};

export default connect(mapState, actionCreators)(DepartmentPeople);
