import Meal from '../../types/Meal';
import ModalContainer from '../containers/ModalContainer';
import { useState, useEffect } from 'react';

const InvalidModal = ({
  invalidMeals
}: {
  invalidMeals: { [key: string]: Meal[] };
}) => {
  const [visible, setVisible] = useState(true);

  const hide = () => {
    setVisible(false);
  };

  useEffect(() => console.log(invalidMeals), [invalidMeals]);

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
        calculations. The offending meals are listed below:
        <br />
        <br />
        <ul>
          {Object.keys(invalidMeals).map(
            (key) =>
              invalidMeals[key]?.length > 0 && (
                <li key={key}>
                  {key}: {invalidMeals[key].map((m) => m.name).join(', ')}
                </li>
              )
          )}
        </ul>
      </ModalContainer>
    )
  );
};

export default InvalidModal;
