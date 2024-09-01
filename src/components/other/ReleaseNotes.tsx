import ReleaseNoteType from '../../types/releaseNoteType';

/**
 * Component for displaying release notes
 *
 * @param {ReleaseNotesProps} { versionNumber, bugFixes, enhancements } - Props for the component
 * @returns {JSX.Element} - The rendered component
 */
const ReleaseNotes = ({
  versionNumber,
  bugFixes,
  enhancements
}: ReleaseNoteType) => (
  <>
    <p>
      <h3 className='text-lg text-bold'>
        Version {versionNumber} Release Notes:
      </h3>
      <h4>Bug Fixes:</h4>
      <ul className='list-disc list-inside'>
        {bugFixes.map((bug, i) => (
          <li key={i}>{bug}</li>
        ))}
      </ul>
      <h4>New Features:</h4>
      <ul className='list-disc list-inside'>
        {enhancements.map((enhancement, i) => (
          <li key={i}>{enhancement}</li>
        ))}
      </ul>
    </p>
    <br />
  </>
);

export default ReleaseNotes;
