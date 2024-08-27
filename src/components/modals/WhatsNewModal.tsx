import ModalContainer from '../containers/ModalContainer';
import usePersistentState from '../../hooks/usePersistentState';
import { useEffect, useState } from 'react';
import ReleaseNoteType from '../../types/releaseNoteType';
import releaseNotes from '../../static/releaseNotes';
import ReleaseNotes from '../other/ReleaseNotes';

const WhatsNewModal = () => {
  const [mostRecentVersion, setMostRecentVersion] = usePersistentState<string>(
    'mostRecentVersion',
    '0.0.0'
  );

  const [isNewUser] = usePersistentState('isNewUser', true);

  const [visible, setVisible] = useState(false);

  const [releaseNotesToDisplay, setReleaseNotesToDisplay] = useState<
    ReleaseNoteType[]
  >([]);

  const hide = () => {
    setMostRecentVersion(APP_VERSION);
    setVisible(false);
  };

  useEffect(() => {
    if (mostRecentVersion < APP_VERSION && !isNewUser) {
      setVisible(true);
      setReleaseNotesToDisplay(
        releaseNotes.filter(
          (note) =>
            note.versionNumber >= mostRecentVersion &&
            note.versionNumber <= APP_VERSION
        )
      );
    } else if (isNewUser) {
      setMostRecentVersion(APP_VERSION);
    }
  }, [mostRecentVersion, isNewUser, setMostRecentVersion]);

  return (
    visible && (
      <ModalContainer
        title="What's New?"
        cancelText='Got it!'
        onCancel={hide}
        onlyCancel={true}
        centered={false}
      >
        {releaseNotesToDisplay.map((note) => (
          <ReleaseNotes {...note} key={note.versionNumber} />
        ))}
      </ModalContainer>
    )
  );
};

export default WhatsNewModal;
