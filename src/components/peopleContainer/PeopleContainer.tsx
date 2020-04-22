import React, { FC, useEffect, useState } from 'react';
import { Office as OfficeModel } from '../../shared/models/Office.model';
import { AlphabeticalLine } from 'umgc_ui_library/lib';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PeopleModel from '../../shared/models/People.model';
import People from '../user/People';
import { handleScrollToBottom } from '../../utils/scroller';
import { PEOPLE_LIMIT, alphabet } from '../../constants/constants';
import Form from 'react-bootstrap/Form';
import images from '../../images/images';
import { OnError as IsEmpty } from '../error/Error';

type Props = {
  isActive?: string;
  isLastPage: boolean;
  office?: OfficeModel;
  people?: PeopleModel[];
  clearFilter?: () => void;
  handleActiveItem?: (letter: string) => void;
  triggerFetchPeople: <T>() => Promise<T> | undefined;
};

export const PeopleContainer: FC<Props> = props => {
  const {
    people,
    isActive,
    isLastPage,
    clearFilter,
    handleActiveItem,
    triggerFetchPeople
  } = props;

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchMorePeople = async (): Promise<any> => {
    await triggerFetchPeople();

    return setIsFetching(false);
  };

  useEffect(() => {
    if (isFetching) {
      return;
    }

    window.addEventListener('scroll', () =>
      isFetching || handleScrollToBottom(() => setIsFetching(true))
    );

    return () => {
      window.removeEventListener('scroll', () =>
        isFetching || handleScrollToBottom(() => setIsFetching(true))
      );
    };
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }

    if (people && people.length < PEOPLE_LIMIT) {
      setIsFetching(false);
      return;
    }

    if (!isLastPage) {
      fetchMorePeople();
    } else {
      setIsFetching(false);
    }
  }, [isFetching]);

  return (
    <>
      <p className="font-size-xl mb-3 mt-5">
        <b>People</b>
      </p>
      <Row>
        <Col>
          <Form className="d-flex d-md-none justify-content-start justify-content-md-end py-3">
            <Form.Label className="d-flex justify-content-start justify-content-md-end mr-3 mb-0 align-items-center">
              By letter:
            </Form.Label>
            <Form.Control
              size="sm"
              as="select"
              value={isActive}
              id="filter-alphabet"
              name="filter-alphabet"
              className="w-auto rounded-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleActiveItem && handleActiveItem(e.target.value)
              }
            >
              <option value={0}>Choose a letter</option>
              {alphabet.map((item: string) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </Form.Control>
          </Form>
          <div className="py-3 alphabetical-line d-none d-md-flex flex-wrap justify-content-md-between">
            {alphabet.map((item: string) => (
              <AlphabeticalLine
                className="pr-3 p-md-0"
                key={item.toUpperCase()}
                letter={item.toUpperCase()}
                isActive={item === isActive}
                onClick={() => handleActiveItem && handleActiveItem(item)}
              />
            ))}
          </div>
        </Col>
      </Row>
      {isActive && people ? (
        <Row>
          <Col className="d-flex just-content-start align-items-baseline">
            <p className="font-size-sm">Filtered by:</p>
            <button onClick={clearFilter} className="ml-2 mr-1">
              <img src={images.remove} alt="clean filter" width="12" height="12" />
            </button>
            <p className="font-size-sm">Letter: <strong> {isActive.toUpperCase()}</strong></p>
          </Col>
        </Row>
      ) : null}
      <Row className="row-cols-lg-5">
        {people &&
          people.map((person: PeopleModel) => (
            <People people={person} key={person.loginId} />
          ))}
      </Row>
      <Row>
        <Col>
          {!!isLastPage && people && !people.length && <IsEmpty />}
          {!!isFetching && !isLastPage && !!people && !!people.length && (
            <Col className="p-5 d-flex justify-content-center text-secondary">
              <strong>Fetching people ...</strong>
            </Col>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PeopleContainer;
