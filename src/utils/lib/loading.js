import {Loading} from 'components';
import _ from 'lodash';

let needLoadingRequestCount = 0;
let loading;

function startLoading() {
    console.log('startLoading =============');
    loading = Loading.newInstance();
    return loading;
}

function endLoading() {
    console.log('endLoading==========');
    loading.destroy();
}

const tryCloseLoading = () => {
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
};

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) {
        return
        ;
    };
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        _.debounce(tryCloseLoading, 300)();
    }
}
