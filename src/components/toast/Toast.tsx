import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const BSToast = forwardRef((props, ref: React.Ref<any>) => {
  const [showToast, setshowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<string>('');

  useImperativeHandle(ref, () => ({
    setToastState: (toasttype: string, message: string) => {
      setToastType(toasttype);
      setToastMessage(message);
      setshowToast(true);
    }
  }));

  return showToast
    ? (
      <Toast onClose={() => setshowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">{toastType !== '' ? toastType : ''}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage !== '' ? toastMessage : ''}{props.children}</Toast.Body>
      </Toast>
    ) : null;
});

export default BSToast;
