/**
 *
 * Asynchronously loads the component for QrScanner
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
