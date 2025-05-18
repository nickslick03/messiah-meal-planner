/**
 * Detector for whether or not the user is on a mobile device
 * @returns {boolean} Whether the current device is a mobile device
 */
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);
export default isMobileDevice;
