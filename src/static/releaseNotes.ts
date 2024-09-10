import ReleaseNoteType from '../types/releaseNoteType';

const releaseNotes: ReleaseNoteType[] = [
  {
    versionNumber: '0.0.0',
    bugFixes: [],
    enhancements: ['Initial release.']
  },
  {
    versionNumber: '0.0.1',
    bugFixes: ['Fixed an issue where invalid recipes would crash the app.'],
    enhancements: [
      'Updated Union, Falcon, and Vending prices for 2024-25 school year.'
    ]
  }
];

export default releaseNotes;
