import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Card } from 'umgc_ui_library/lib/cards/card';
import OfficesPeople, {
  OfficePeopleCategory
} from '../../shared/models/OfficesPeople.model';
import { AppState } from '../../shared/types/genericTypes';
import {
  fetchOfficesPeople,
  filterOfficesPeople
} from '../../shared/actions/officesPeopleActions';
import Facet, { FacetProperty } from '../../shared/models/Facet.model';

type Props = {
  facets?: Facet;
  selectedFacet?: string;
  fetchOfficesPeople?: <T>() => T;
  officesPeopleList?: OfficesPeople[];
  setFilterFacet: (a: string) => void;
  officeCategories?: OfficePeopleCategory[];
  filterOfficesPeople?: <T>(value: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  officesPeopleList: state.officesPeopleReducers.officesPeopleFilteredList,
  officeCategories: state.officesPeopleReducers.officeCategories
});

const actionCreators = {
  fetchOfficesPeople,
  filterOfficesPeople
};

export const OfficesPeople: FC<Props> = props => {
  const {
    officesPeopleList,
    officeCategories,
    fetchOfficesPeople,
    filterOfficesPeople,
    selectedFacet
  } = props;

  useEffect(() => {
    fetchOfficesPeople && fetchOfficesPeople();
  }, []);

  const historyData = useHistory();

  const handleOfficeCardClick = (item: OfficesPeople): void => {
    return historyData.push(`/office/${item && item.drupal_id}`);
  };

  function handleDropDownChange (value: string): void {
    filterOfficesPeople && filterOfficesPeople(value);
  }

  return (
    <Container className="article-list mt-5">
      <Col className="mb-2 article-list-header">
        <Row>
          <p className="font-size-xl">
            <b>Offices</b>
          </p>
        </Row>
        <Row className="article-filter-section my-auto">
          <Col md={6} className="d-flex justify-content-start">
            <Row>
              <p className="font-size-md g600-text-clr text-left">
                <b>Select an office to view directory of people</b>
              </p>
            </Row>
          </Col>
          <Col md={6}>
            <Row className="d-flex justify-content-md-end">
              <Form className="d-flex">
                <Form.Label className="d-flex font-size-sm mr-3 mb-0 align-items-center">
                  Region:
                </Form.Label>
                <Form.Control
                  className="w-auto"
                  size="sm"
                  as="select"
                  id="filter"
                  name="filter"
                  onChange={(e: React.SyntheticEvent) =>
                    handleDropDownChange((e.target as HTMLInputElement).value)
                  }
                  value={selectedFacet}
                >
                  <option value={0}>All</option>
                  {officeCategories &&
                    officeCategories.map((category: FacetProperty) => (
                      <option
                        key={category.drupal_id}
                        value={category.drupal_id}
                      >
                        {category.title}
                      </option>
                    ))}
                </Form.Control>
              </Form>
            </Row>
          </Col>
        </Row>
      </Col>
      <Row>
        {officesPeopleList && (
          <div className="ml-2 p-2 w-100 mb-5 office-people-list">
            <Card
              title=""
              variant="light"
              type="officesListContainer"
              officeData={officesPeopleList}
              onCardClick={(item: OfficesPeople) => handleOfficeCardClick(item)}
            />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(OfficesPeople);
