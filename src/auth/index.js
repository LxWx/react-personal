import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

// import Loading from './components/Loading';

/**
 * locationHelperBuilder: 用于处理location的辅助方法
 * connectedRouterRedirect: 权限控制的hoc组件
 * connectedRouterRedirect({
  redirectPath: string | (state: Object, ownProps: Object) => string,  重定向路由
  authenticatedSelector: (state: Object, ownProps: Object) => boolean, 是否重定向判断
  ?authenticatingSelector: (state: Object, ownProps: Object) => boolean, loading组件判断
  ?AuthenticatingComponent: ReactClass | ReactFunctionalComponent | string, loading组件
  ?wrapperDisplayName: string,  高阶组件包装名字
  ?allowRedirectBack: boolean | (nextState: Object, redirectPath: String) => boolean, 
  ?redirectQueryParamName: string   重定向查询参数名称
}): HigherOrderComponent   返回高阶组件


connectedAuthWrapper({
  authenticatedSelector: (state: Object, ownProps: Object) => boolean,
  ?authenticatingSelector: (state: Object, ownProps: Object) => boolean,
  ?AuthenticatingComponent: ReactClass | ReactFunctionalComponent | string,
  ?FailureComponent: ReactClass | ReactFunctionalComponent | string,
  ?wrapperDisplayName: string
}): HigherOrderComponent

 */
// const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.login.user !== null,
    // authenticatingSelector: state => state.user.isLoading,
    wrapperDisplayName: 'UserIsAuthenticated'
};

// export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    redirectPath: '/login',
    allowRedirectBack: true
});

// export const userIsAdminRedir = connectedRouterRedirect({
//     redirectPath: '/',
//     allowRedirectBack: false,
//     authenticatedSelector: state => state.user.data !== null && state.user.data.isAdmin,
//     predicate: user => user.isAdmin,
//     wrapperDisplayName: 'UserIsAdmin'
// });

// const userIsNotAuthenticatedDefaults = {
//     // Want to redirect the user when they are done loading and authenticated
//     authenticatedSelector: state => state.login.user !== null,
//     wrapperDisplayName: 'UserIsNotAuthenticated'
// };

// // export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

// export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
//     ...userIsNotAuthenticatedDefaults,
//     redirectPath: (state, ownProps) => {
//         return locationHelper.getRedirectQueryParam(ownProps) || '/dashBoard';
//     },
//     allowRedirectBack: true
// });
