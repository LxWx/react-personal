import StoreRedux from './storeRedux/reducer';
import {loginState} from './login/reducer';
// 公共reducer
let reducer = {
    commonStore: StoreRedux,
    login: loginState
};
export default reducer;