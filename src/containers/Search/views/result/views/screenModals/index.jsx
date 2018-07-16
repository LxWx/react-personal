import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Form, Select, Row, Col, Input, Radio, Checkbox, Transfer, Button } from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const option1 = [{
    lable: 'GlassId', value: 'GlassId',
}, {
    lable: 'ProcessId', value: 'ProcessId',
}, {
    lable: 'EQPId', value: 'EQPId',
}, {
    lable: 'Image', value: 'Image',
}, {
    lable: 'X', value: 'X',
}, {
    lable: 'Y', value: 'Y',
}];
const option2 = [{
    lable: '无', value: '0',
}, {
    lable: '为空', value: '1',
}, {
    lable: '不为空', value: '2',
}, {
    lable: '等于', value: '3',
}, {
    lable: '不等于', value: '4',
}, {
    lable: '小于', value: '5',
}, {
    lable: '大于', value: '6',
}, {
    lable: '介于', value: '7',
}];
@Form.create()
class screenModals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { columValue, newScreenArr, transferShow, transfer, targetKeys, top, columShow } = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                width={this.props.width}
            >
                <Form className={styles.main}>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Button type="primary">
                                    增加条件
                                </Button>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Select defaultValue="" style={{ width: 120 }}>
                                        {
                                            option1.map(it => {
                                                return <Option value={it.value}>{it.lable}</Option>;
                                            })
                                        }
                                    </Select>

                                </Col>
                                <Col span={8}>
                                    <Select defaultValue="" style={{ width: 120 }}>
                                        {
                                            option2.map(it => {
                                                return <Option value={it.value}>{it.lable}</Option>;
                                            })
                                        }
                                    </Select>

                                </Col>
                                <Col span={8}>
                                    <Input placeholder="Basic usage" />


                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

screenModals.propTypes = {

};
screenModals.defaultProps = {
    visible: false,
    width: 800
};

export default screenModals;