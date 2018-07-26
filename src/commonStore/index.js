import {storeRedux} from './storeRedux/reducer';
import {loginState} from './login/reducer';
// 公共reducer
let reducer = {
    commonStore: storeRedux,
    login: loginState
};
export default reducer;