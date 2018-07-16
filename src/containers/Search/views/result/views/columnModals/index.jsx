import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Form, Select, Row, Col, Input} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
@Form.create()
class columnModals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onCancel = () => {
        this.props.onCancel();
    }
    onOk = () => {
        this.props.onOk();
    }
    render() {
        const {visible} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
            >
                <Form className={styles.main}>
                    <FormItem
                    >
                        <div className={styles.labels}>
                                    类型：
                        </div>
                        <div className={styles.value}>
                            {getFieldDecorator('type', {
                                rules: [],
                                // initialValue: dataTypeValue
                            })(
                                <Select defaultValue="1" style={{ width: 120 }}>
                                    <Option value="1">3</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">1</Option>
                                </Select>

                            )}
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

columnModals.propTypes = {

};
columnModals.defaultProps = {
    visible: false
};

export default columnModals;