import React, {PureComponent} from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
const RadioGroup = Radio.Group;
export default class Component extends PureComponent {
    constructor (props) {
        super (props);
    }

    render() {
        const {list, value} = this.props;
        return (
            <RadioGroup value={value}>
                {
                    list.map(it => {
                        return <Radio value={it.value}>{it.name}</Radio>;
                    })
                }
            </RadioGroup>
        );

    }
}


Component.propTypes = {
    list: PropTypes.array
};
Component.defaultProps = {
    list: [],
    value: ''
};