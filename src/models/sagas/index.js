import {models} from '../../config/config';

const mergeSagas = (configs = []) => {
    return configs.reduce((previousValue, currentValue) => {
        let {sagas} = currentValue;
        previousValue.push(sagas);
        return previousValue;
    }, []);
};
let sagas = mergeSagas(models);
export default function* rootSaga() {
    yield (sagas || []).map((fn) => {
        return fn && typeof fn == 'function' && fn();
    });
}