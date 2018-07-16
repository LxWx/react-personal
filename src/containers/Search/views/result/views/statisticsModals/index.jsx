import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Form, Select, Row, Col, Input, Radio, Checkbox, Transfer} from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: '统计数量', value: 'a' },
    { label: '求和：', value: 'b' },
    { label: '求平均：', value: 'c' },
    { label: '求中位数：', value: 'd' },
];
@Form.create()
class statisticsModals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newScreenArr: null,
            mockData: null,
            transferShow: false,
            transfer: '',
            targetKeys: [],
            columValue: '',
            columKeys: [],
            columShow: false
        };
    }
    setScreen = (arr) => {
        let obj = {};
        if (Array.isArray(arr)) {
            arr.forEach(it => {
                obj[it.value] = {
                    value: ''
                };
            });
        } else {
            return null;
        }
        return obj;
    }
    componentDidMount = () => {
        const newArr = this.setScreen(options);
        this.setState({
            newScreenArr: newArr
        });
        this.getMock();
    }
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }
    inputFocus = (n, e) => {
        const { newScreenArr } = this.state;
        this.setState({
            transfer: n,
            targetKeys: newScreenArr[n].targetKeys || [],
            columShow: false,
            transferShow: true
        });
    }
    transferChange = (targetKeys, direction, moveKeys) => {
        const { transfer, newScreenArr } = this.state;
        let newScreen = update({}, { $set: newScreenArr });
        if (transfer != '' && transfer) {
            let newArr = update([], { $set: targetKeys }).map(it => {
                return this.state.mockData[it].title;
            });
            newScreen = update(newScreen, { [transfer]: { $set: { targetKeys: targetKeys, value: newArr.join(',') } } });
            this.setState({
                newScreenArr: newScreen
            });
        }
        this.setState({ targetKeys });
    }
    columnFocus = (e) => {

        this.setState({
            columShow: true,
            transferShow: false,
        });
    }
    columChange = (targetKeys) => {
        let newArr = update([], { $set: targetKeys }).map(it => {
            return this.state.mockData[it].title;
        });
        this.setState({
            columValue: newArr.join(','),
            columKeys: targetKeys
        });
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
        const {newScreenArr, transferShow, transfer, columShow} = this.state;
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
                            <FormItem
                            >
                                <div className={styles.labels}>
                                分组栏位：
                                </div>
                                <div className={styles.value}>
                                    <Input onFocus={this.columnFocus} value={this.state.columValue} />
                                </div>
                            </FormItem>

                            <Row>
                                <Col span={8}>
                                    <FormItem
                                    >
                                        {getFieldDecorator('screen', {
                                            rules: [],
                                        })(
                                            <CheckboxGroup onChange={this.checkChange} className={styles.checkMain} options={options} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={16}>
                                    {
                                        newScreenArr && Object.keys(newScreenArr).map(it => {
                                            return <div className={styles.arrMain}>
                                                <Input onFocus={this.inputFocus.bind(this, it)} id={it} value={newScreenArr[it].value} />
                                            </div>;
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col className={styles.transfer} span={12}>
                            {
                                transferShow && <div>
                                    <div>
                                        选择{transfer}
                                    </div>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.transferChange}
                                        render={item => `${item.title}`}
                                    />
                                </div> || null
                            }
                            {
                                columShow && <div >
                                    <div>
                                    分组栏位
                                    </div>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.columKeys}
                                        onChange={this.columChange}
                                        render={item => `${item.title}`}
                                    />
                                </div> || null
                            }
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

statisticsModals.propTypes = {

};
statisticsModals.defaultProps = {
    visible: false,
    width: 1000
};

export default statisticsModals;