import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'antd';
import styles from './index.less';
const uuid = require('uuid/v4');
class ToolTipText extends PureComponent {
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
        let newText = (text == '' || !text) && '暂无数据' || text;
        return (
            <div ref={id} className={`${isShow && styles.over || styles.over1}`} style={style}>
                {
                    isShow && <Tooltip arrowPointAtCenter title={(<div className={styles.break}>{newText}</div>)}><div className={styles.over}>{newText}</div></Tooltip> || <div>
                        {newText}
                    </div>
                }

            </div>
        );
    }
}

ToolTipText.propTypes = {
    text: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
ToolTipText.defaultProps = {
    text: '',
    width: '100%'
};
export default ToolTipText;