import React from 'react';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent} from 'components';

class Templates extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.main}>
            </div>
        );
    }
}

Templates.propTypes = {

};
Templates.defaultProps = {

};
export default Templates;