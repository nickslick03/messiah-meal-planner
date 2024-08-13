import ModalContainer from '../containers/ModalContainer';

interface ResetModalProps {
  /**
   * Whether or not the modal is visible.
   */
  isVisible: boolean;

  /**
   * Event handler for when the cancel button is clicked.
   */
  onCancel: () => void;

  /**
   * Event handler for when the confirm button is clicked.
   */
  onConfirm: () => void;
}

/**
 * Component for displaying a reset modal.
 *
 * @param {ResetModalProps} props - The props for the component.
 * @returns {JSX.Element} The reset modal component.
 */
const ResetModal = ({ isVisible, onCancel, onConfirm }: ResetModalProps) => {
  return isVisible ? (
    <ModalContainer
      minimalSpace={true}
      confirmDisabled={false}
      title='Confirm Reset'
      confirmText='Reset'
      onConfirm={() => {
        onConfirm();
        localStorage.clear();
        location.reload();
      }}
      onCancel={onCancel}
    >
      <p className='my-4'>
        This clears the planning and deletes all the custom meals.
        <br />
        Are you sure you want to do this?
      </p>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default ResetModal;
