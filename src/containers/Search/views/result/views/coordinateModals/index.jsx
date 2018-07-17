import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Form, Select, Row, Col, Input} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
@Form.create()
class CoordinateModals extends PureComponent {
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
                    <Row gutter={10}>
                        <Col span={12}>
                            <FormItem
                            >
                                <div className={styles.labelsTwo}>
                                    Glass的 X坐标栏位：
                                </div>
                                <div className={styles.valueTwo}>
                                    {getFieldDecorator('GlassX', {
                                        rules: [],
                                        // initialValue: dataTypeValue
                                    })(
                                        <Select defaultValue="1" >
                                            <Option value="1">3</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">1</Option>
                                        </Select>

                                    )}
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            >
                                <div className={styles.labels}>
                                Y坐标栏位：
                                </div>
                                <div className={styles.value}>
                                    {getFieldDecorator('GlassY', {
                                        rules: [],
                                        // initialValue: dataTypeValue
                                    })(
                                        <Select defaultValue="1">
                                            <Option value="1">3</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">1</Option>
                                        </Select>

                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                    >
                        <div className={styles.labelsFour}>
                        转换后PanelNo栏位名：
                        </div>
                        <div className={styles.valueFour}>
                            {getFieldDecorator('PanelNo', {
                                rules: [],
                                // initialValue: dataTypeValue
                            })(
                                <Input />

                            )}
                        </div>
                    </FormItem>
                    <Row gutter={10}>
                        <Col span={12}>
                            <FormItem
                            >
                                <div className={styles.labelsThree}>
                                Panel的 X坐标栏位名:
                                </div>
                                <div className={styles.valueThree}>
                                    {getFieldDecorator('PanelX', {
                                        rules: [],
                                        // initialValue: dataTypeValue
                                    })(
                                        <Input />

                                    )}
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            >
                                <div className={styles.labelsFive}>
                                Y坐标栏位名：
                                </div>
                                <div className={styles.valueFive}>
                                    {getFieldDecorator('PanelY', {
                                        rules: [],
                                        // initialValue: dataTypeValue
                                    })(
                                        <Input />

                                    )}
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

CoordinateModals.propTypes = {

};
CoordinateModals.defaultProps = {
    visible: false
};

export default CoordinateModals;