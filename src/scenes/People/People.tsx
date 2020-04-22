import React, { FC, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Card } from 'umgc_ui_library/lib';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import find from 'lodash.find';

// Components
import TemplatesTopBar from '../../components/templatesTopBar/templatesTopBar';

// Types
import { AppState } from '../../shared/types/genericTypes';
import { contentToDepartment, contentToLabel, VariousContentModel } from '../../shared/types/contentTypes';
import { DepartmentTemplate, ContactGroup } from '../../shared/models/Department.model';
import { LabelTemplate } from '../../shared/models/Label.model';
import { Page as PageModel } from '../../shared/models/Page.model';
import UserInfoModel from '../../shared/models/UserInfo.model';

// Actions
import { fetchUsersByEmail } from '../../shared/actions/usersActions';
import { fetchDepartmentById } from '../../shared/actions/departmentActions';
import { fetchLabelById } from '../../shared/actions/labelActions';

type Props = {
  match?: match;
  givenId?: number;
  type: string;
  content?: VariousContentModel;
  contacts?: UserInfoModel[];
  fetchLabelById?: (labelId: number) => Promise<void>;
  fetchDepartmentById?: (departmentId: number) => Promise<void>;
  fetchUsersByEmail?: (email: string) => void;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const givenId = parseInt(get(props, 'match.params.id'), 10);
  const givenContent = props.type === 'department'
    ? state.departmentReducers.departments.content
    : state.labelReducers.labels;

  return {
    ...props,
    givenId,
    contacts: state.usersReducers.users,
    content: find(givenContent, c => c.drupal_id === givenId)
  };
};

const actionCreators = { fetchLabelById, fetchDepartmentById, fetchUsersByEmail };

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

export const People: FC<Props> = props => {
  const {
    givenId,
    content,
    contacts,
    fetchLabelById,
    fetchDepartmentById,
    fetchUsersByEmail
  } = props;

  useEffect(() => {
    if (givenId && fetchDepartmentById && props.type === 'department') {
      fetchDepartmentById(givenId);
    } else if (givenId && fetchLabelById && props.type === 'label') {
      fetchLabelById(givenId);
    }
  }, [givenId, fetchDepartmentById, fetchLabelById]);

  let flatContacts: string[] = [];
  let typedContent = null;

  if (content) {
    typedContent = props.type === 'department'
      ? contentToDepartment(content)
      : contentToLabel(content);

    flatContacts = typedContent && typedContent.contacts
      ? typedContent.contacts.reduce((acc: string[], val) => acc.concat(val.contacts), [])
      : [];
  }

  useEffect(() => {
    if (flatContacts.length) {
      fetchUsersByEmail && fetchUsersByEmail(flatContacts.join(','));
    }
  }, [content]);

  const getTemplateId = (): string => {
    const getTemplates = props.type === 'department'
      ? get(content, 'template', [] as DepartmentTemplate[])
      : get(content, 'template', [] as LabelTemplate[]);
    return getTemplates[0].drupal_id.toString();
  };

  const templateId = content && getTemplateId();
  const page = getPeoplePage();

  return givenId && content && typedContent && contacts && templateId ? (
    <div className='people pb-5'>
      <TemplatesTopBar
        givenId={givenId}
        active={-1}
        page={page}
        type={props.type}
      />
      <Container>
        {typedContent.contacts && typedContent.contacts.map(contactGroup => {
          const groupContacts = getGroupContacts(contactGroup, contacts);
          return (
            <Row key={contactGroup.group_label || 'Contacts'}>
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

export default connect(mapState, actionCreators)(People);
