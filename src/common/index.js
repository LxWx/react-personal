import { call } from 'redux-saga/effects';
const cloneDeep = require('lodash/cloneDeep')

// saga请求封装
export function* callFetch(fetch, params) {
    return yield call(fetch, params);
}
// clone
export function CloneDeep(obj) {
    return cloneDeep(obj)
}


// export function createTimer(callback, time, type = true) {
//     window.requestAnimationFrame =
//         window.requestAnimationFrame ||
//         window.webkitrequestAnimationFrame ||
//         window.mozrequestAnimationFrame ||
//         window.msrequestAnimationFrame ||
//         window.orequestAnimationFrame;
//     window.cancelAnimationFrame =
//         window.cancelAnimationFrame ||
//         window.webkitCancelAnimationFrame ||
//         window.mozCancelAnimationFrame ||
//         window.msCancelAnimationFrame ||
//         window.oCancelAnimationFrame;
//     let stime = null;
//     let etime = null;
//     if (typeof callback !== 'function' || typeof time !== "number") {
//         return
//     }
//     let _id  =  window.requestAnimationFrame(loop);
//     console.log(_id)
//     function loop(timestamp) {       
//         if (stime == null) {
//             stime = timestamp;
//         }
//         etime = timestamp;
//         window.requestAnimationFrame(loop);
        
//         if (etime - stime >= time) {
//             stime = null;
//             etime = null;
//             callback && callback();

//             if (!type) {

//             }
//         }
//     }
//     return _id;
// }

// export function clearTimer(id) {
//     window.cancelAnimationFrame =
//         window.cancelAnimationFrame ||
//         window.webkitCancelAnimationFrame ||
//         window.mozCancelAnimationFrame ||
//         window.msCancelAnimationFrame ||
//         window.oCancelAnimationFrame;
//         window.cancelAnimationFrame(id);

// }



