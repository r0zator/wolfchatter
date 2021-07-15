/* eslint-disable*/
import lodash from 'lodash';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
global._ = lodash;
