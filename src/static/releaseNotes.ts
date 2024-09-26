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
      'Updated Union, Falcon, and Vending prices for 2024-25 school year.',
      'Added logo.'
    ]
  },
  {
    versionNumber: '0.0.2',
    bugFixes: [
      'Fixed initial positioning of switches',
      'Fixed the price of Union Acai bowls',
      'Fixed an issue where all meals would trigger the error highlighting in the day editor.'
    ],
    enhancements: []
  }
];

export default releaseNotes;
