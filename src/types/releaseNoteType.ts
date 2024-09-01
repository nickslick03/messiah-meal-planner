interface ReleaseNoteType {
  /**
   * String representing the version number
   */
  versionNumber: string;

  /**
   * Array of strings representing bug fixes
   */
  bugFixes: string[];

  /**
   * Array of strings representing new features
   */
  enhancements: string[];
}

export default ReleaseNoteType;
