import StoreRedux from './storeRedux/reducer';
import Login from './login/reducer';

// 公共reducer
let reducer = {
    commonStore: StoreRedux,
    login: Login
};
export default reducer;