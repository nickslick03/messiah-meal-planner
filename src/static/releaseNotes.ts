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
    versionNumber: '1.0.0',
    bugFixes: [
      'Fixed initial positioning of switches',
      'Fixed the price of Union Acai bowls',
      'Fixed an issue where all meals would trigger the error highlighting in the day editor.',
      'Fixed issue where tutorial would cover up the notifications.',
      'Fixed meal table overflow.',
      'Fixed the price of Union Acai bowls.',
      'Fixed an issue where all meals would trigger the error highlighting in the day editor.'
    ],
    enhancements: [
      'We can now update the menu without needing to update the app. This should keep it more up-to-date.',
      'Added a dark mode.',
      'Ability to toggle the meal queue on and off.',
      'Default values in the meal plan info section make setup a breeze!'
    ]
  },
  {
    versionNumber: '1.0.1',
    bugFixes: ['Fixed tutorial help buttons when the meal queue is off.'],
    enhancements: []
  },
  {
    versionNumber: '1.1.0',
    bugFixes: [
      'Fixed an issue where deleting meals from days was impossible when the meal queue was off.'
    ],
    enhancements: ['Made the menu visible at all times.']
  }
];

export default releaseNotes;
