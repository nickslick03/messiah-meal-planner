import { CiWarning } from 'react-icons/ci';

/**
 * Component for displaying a beta notice and a link to the bug and suggestion form
 * @returns {JSX.Element} The beta notice
 */
const BetaNotice = () => {
  return (
    <div className='w-full p-2'>
      <div className='w-full flex justify-center bg-red-200 rounded-lg flex-col box-border p-2'>
        <h2 className='text-messiah-red font-bold text-lg'>
          <CiWarning className='inline' /> NOTICE
        </h2>
        <hr className='border-messiah-red w-full' />
        <p className='text-messiah-red'>
          This software is in BETA. While we have tested it as thoroughly as we
          can, we cannot guarantee the complete absence of bugs. By using this
          app, you agree not to hold the creators responsible for any damages
          caused by the software, including but not limited to spending too many
          dining dollars. That being said, if you do find a bug or have a
          feature you'd like to see included, we'd love to hear from you so we
          can fix it! Please fill out our{' '}
          <a href='https://forms.gle/cMMqxgHpJBH2gSAp9' target='_blank' className='underline'>
            bug and suggestion form
          </a>{' '}
          to let us know.
        </p>
      </div>
    </div>
  );
};

export default BetaNotice;
