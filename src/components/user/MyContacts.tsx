import React, { FC, useState } from 'react';
import { ContentWrapper, Card } from 'umgc_ui_library/lib';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { ContactList } from '../../shared/models/UserInfo.model';
import { getUserProfilePicture } from '../../utils/customHooks';

interface DeleteContactRequest {
  email: string;
  showModal: boolean;
}

type Props = {
  isFetching?: boolean;
  isCurrentUser?: boolean;
  userContactList: ContactList[];
  setdeleteContactRequest?: (object: DeleteContactRequest) => void;
};

export const MyContacts: FC<Props> = props => {
  const { setdeleteContactRequest, userContactList = [], isFetching = false } = props;

  const [displayContactsLimit, setDisplayContactsLimit] = useState(6);

  if (!isFetching && !userContactList.length) {
    return null;
  }

  return (
    <Row>
      <Col className="mb-5 h-100">
        <ContentWrapper
          title="My Contacts"
          wrapperClass="h-100"
          topBorder="darkTurquoise"
          isFetching={isFetching}
          titleClass="text-upper font-size-md mb-4"
        >
          <>
            <Row className="pr-2">
              {!isFetching && userContactList
                ? userContactList.slice(0, displayContactsLimit).map((myContacts: ContactList) => {
                  const contactPic = getUserProfilePicture(myContacts.contactPic);
                  return (
                    <Col lg="4" md="6" sm="12" className="pb-3 pr-1">
                      <Card
                        type="contactMe"
                        variant="profile"
                        title={myContacts.title}
                        office={myContacts.office}
                        mobile={myContacts.mobile}
                        email={myContacts.email}
                        handleClick={() =>
                          myContacts.email && setdeleteContactRequest!({ showModal: true, email: myContacts.email })
                        }
                        contactPic={contactPic}
                        isCurrentUser={false}
                        LinkToProfile={(p: React.PropsWithChildren<{}>) => (
                          <Link to={`/profile?upn=${myContacts.email}`}>{p.children}</Link>
                        )}
                      />
                    </Col>
                  );
                })
                : Array(3)
                  .fill('')
                  .map((x: '', i: number) => (
                    <Col lg="4" md="6" sm="12" className="pb-3 pr-1" key={`${i + x}`}>
                      <Card isFetching={true} type="contactMe" variant="profile" title="" isCurrentUser={false} />
                    </Col>
                  ))}
            </Row>
            {displayContactsLimit < userContactList.length && (
              <Row className="mx-auto my-4">
                <button
                  className="pl-2 text-upper g700-text-clr text-hover-underline font-size-sm w-100"
                  onClick={() => setDisplayContactsLimit(displayContactsLimit + 6)}
                >
                  Load More
                </button>
              </Row>
            )}
          </>
        </ContentWrapper>
      </Col>
    </Row>
  );
};
