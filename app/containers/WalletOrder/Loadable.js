/**
 *
 * Asynchronously loads the component for WalletOrder
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
