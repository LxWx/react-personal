import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';
import styles from './index.less';
const uuid = require('uuid/v4');
class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            id: 'text' + uuid()
        };
    }
    componentDidMount() {
        const {id} = this.state;
        const {text} = this.props;
        if (this.refs[id] && text != '' && text) {
            this.setState({
                isShow: this.refs[id].offsetWidth < this.refs[id].scrollWidth
            });
        }
    }
    componentWillReceiveProps = (nextProps) => {
        const {id} = this.state;
        if (nextProps.text != this.props.text) {
            if (nextProps.text != '' && nextProps.text) {
                this.setState({
                    isShow: this.refs[id].offsetWidth < this.refs[id].scrollWidth
                });
            }
        }
    }


    render() {
        const { isShow, id} = this.state;
        const {text, width} = this.props;
        let style = {
            width: width
        };
        return (
            <div ref={id} className={`${isShow && styles.over || ''}`} style={style}>
                {
                    isShow && <Tooltip arrowPointAtCenter title={(<div className={styles.break}>{text}</div>)}><div>{text}</div></Tooltip> || <div>
                        {text}
                    </div>
                }

            </div>
        );
    }
}

Tables.propTypes = {
    
};
Tables.defaultProps = {
    text: '1',
    width: '100%'
};
export default Tables;