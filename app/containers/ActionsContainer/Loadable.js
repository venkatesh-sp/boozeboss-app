/**
 *
 * Asynchronously loads the component for ActionsContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
