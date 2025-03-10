import ModalContainer from '../containers/ModalContainer';
import { useState } from 'react';

const InvalidModal = () => {
  const [visible, setVisible] = useState(true);

  const hide = () => {
    setVisible(false);
  };

  return (
    visible && (
      <ModalContainer
        title='Invalid Meals'
        cancelText='Got it!'
        onCancel={hide}
        onlyCancel={true}
        centered={false}
      >
        Your meal plan contains meals that no longer exist. Please update your
        plan to remove those meals in order to continue receiving accurate
        calculations.
      </ModalContainer>
    )
  );
};

export default InvalidModal;
