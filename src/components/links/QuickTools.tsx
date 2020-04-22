import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BasicCard from 'react-bootstrap/Card';
import { AppState } from '../../shared/types/genericTypes';
import { BasicQuickToolsCard } from 'umgc_ui_library';
import { fetchQuickTools } from '../../shared/actions/linkActions';
import { VariousContentModel } from '../../shared/types/contentTypes';
import Skeleton from 'react-loading-skeleton';

type Props = {
  quickTools?: VariousContentModel[];
  fetchQuickTools?: <T>() => Promise<T>;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  quickTools: state.linkReducers.quickTools
});

const actionCreators = { fetchQuickTools };

export const QuickTools: FC<Props> = props => {
  const { quickTools = [], fetchQuickTools } = props;

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    fetchQuickTools && fetchQuickTools().then(() => setIsFetching(false));
  }, []);

  if (!isFetching && !quickTools.length) return null;

  return (
    <BasicCard className="px-4 pb-5 pt-3 mt-3 card-notification-standard border-0 rounded-0">
      <h4 className="font-weight-bold mb-3">{!isFetching ? 'Quick Tools' : <Skeleton width={100} />}</h4>
      <Row>
        {!isFetching && quickTools.length ? quickTools.map((quickTool: VariousContentModel) => (
          <Col lg="4" md="6" className="mb-3" key={quickTool.drupal_id + '_quickToolCol'}>
            <BasicQuickToolsCard
              title={quickTool.title}
              Links={[
                {
                  linkAction: (p: React.ElementType) => (
                    <a {...p} href={quickTool.url} target="_blank" />
                  ),
                  linkTitle: quickTool.summary
                }
              ]}
            />
          </Col>
        )) : (
          Array(3).fill('').map((x: string, i: number) => (
            <Col lg="4" md="6" className="mb-3" key={`${i + x}`}>
              <BasicQuickToolsCard
                title=""
                Links={[]}
                isFetching={true}
              />
            </Col>
          )))}
      </Row>
    </BasicCard>
  );
};

export default connect(mapState, actionCreators)(QuickTools);
