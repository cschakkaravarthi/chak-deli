import React, { FC } from 'react'; //, useEffect, useState, createRef
import { connect } from 'react-redux';
import { ApplicationState } from '../../shared/reducers';
import { Toast } from 'umgc_ui_library/lib/components/toast';

type Props = {
  displayToast?: boolean;
  toastMessage?: string;
  toastError?: boolean;
};

const mapState = (state: ApplicationState, props: Props): Props => ({
  ...props,
  displayToast: state.commonReducers.displayToast,
  toastMessage: state.commonReducers.toastMessage,
  toastError: state.commonReducers.toastError
});

const GlobalToast: FC<Props> = props => {
  const { displayToast = false, toastMessage = '', toastError = false } = props;

  return (
    <Toast
      message={toastMessage} variant={toastError ? 'error' : 'success'}
      className={displayToast ? 'show' : 'hide'}
    />
  );
};
export default connect(mapState)(GlobalToast);
