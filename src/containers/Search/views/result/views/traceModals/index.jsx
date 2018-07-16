import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Form, Select, Row, Col, Input, Radio, Checkbox, Transfer} from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const dataType = [
    {
        name: '制程历史',
        value: 1
    },
    {
        name: '检测数据',
        value: 2
    },
    {
        name: '量测数据',
        value: 3
    },
    {
        name: '工程数据',
        value: 4
    }
];
const columnOptions = [
    { label: '同一站点过多次只显示最后一次', value: 'one' },
    { label: '只显示MainEQP的记录', value: 'two' },
    { label: '只显示MainUnit的记录', value: 'three' }
];
const options = [
    { label: 'EQPType', value: 'EQPType' },
];
@Form.create()
class traceModals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columValue: '',
            newScreenArr: null,
            screenArr: null,
            transferShow: false,
            transfer: '',
            targetKeys: [],
            top: 0,
            columKeys: [],
            columShow: false,
            mockData: null
        };
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
    columnFocus = (e) => {

        this.setState({
            columShow: true,
            transferShow: false,
            top: 180
        });
    }
    componentDidMount = () => {
        const newArr = this.setScreen(options);
        this.setState({
            screenArr: newArr,
            newScreenArr: newArr
        });
        this.getMock();
    }
    setScreen = (arr) => {
        let obj = {};
        if (Array.isArray(arr)) {
            arr.forEach(it => {
                obj[it.value] = {
                    value: '全部', type: 'text'
                };
            });
        } else {
            return null;
        }
        return obj;
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
    onCancel = () => {
        this.props.onCancel();
    }
    onOk = () => {
        this.props.onOk();
    }
    typeGroupChange = () => {

    }

    checkChange = (v) => {
        const { screenArr, newScreenArr } = this.state;
        let newScreen = update({}, { $set: screenArr });
        v.map(it => {
            newScreen = update(newScreen, { [it]: { $set: { targetKeys: newScreenArr[it].targetKeys || '', type: 'input', value: newScreenArr[it].value != '全部' ? newScreenArr[it].value : '' } } });
        });
        const merge = update(screenArr, { $merge: newScreen || {} });
        this.setState({
            newScreenArr: merge
        });
        if (v.length == 0) {
            this.setState({
                transferShow: false,

            });
            return;
        }
    }
    inputFocus = (n, e) => {
        const { newScreenArr } = this.state;
        this.setState({
            transferShow: true,
            transfer: n,
            targetKeys: newScreenArr[n].targetKeys || [],
            top: 125,
            columShow: false
        });
    }

    transferChange = (targetKeys, direction, moveKeys) => {
        const { transfer, newScreenArr } = this.state;
        let newScreen = update({}, { $set: newScreenArr });
        if (transfer != '' && transfer) {
            let newArr = update([], { $set: targetKeys }).map(it => {
                return this.state.mockData[it].title;
            });
            newScreen = update(newScreen, { [transfer]: { $set: { targetKeys: targetKeys, type: 'input', value: newArr.join(',') } } });
            this.setState({
                newScreenArr: newScreen
            });
        }
        this.setState({ targetKeys });
    }
    render() {
        const {visible} = this.props;
        const { getFieldDecorator } = this.props.form;
        const {columValue, newScreenArr, transferShow, transfer, targetKeys, top, columShow} = this.state;
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
                                    数据类型：
                                </div>
                                <div className={styles.value}>
                                    {getFieldDecorator('dataType', {
                                        rules: []
                                    })(
                                        <RadioGroup onChange={this.typeGroupChange}>
                                            {
                                                dataType.map(it => {
                                                    return <Radio value={it.value}>{it.name}</Radio>;
                                                })
                                            }
                                        </RadioGroup>
                                    )}
                                </div>
                            </FormItem>
                            <FormItem
                            >
                                <div className={styles.labels}>
                        ProcessId：
                                </div>
                                <div className={styles.value}>
                                    {getFieldDecorator('ProcessId', {
                                        rules: []
                                    })(
                                        <Select>

                                        </Select>
                                    )}
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
                                            if (newScreenArr[it].type == 'text') {
                                                return <div className={styles.arrMain}>
                                                    {
                                                        newScreenArr[it].value
                                                    }
                                                </div>;
                                            } else {
                                                return <div className={styles.arrMain}>
                                                    <Input onFocus={this.inputFocus.bind(this, it)} id={it} value={newScreenArr[it].value} />
                                                </div>;
                                            }
                                        })
                                    }
                                </Col>
                            </Row>

                            <FormItem
                            >
                                {getFieldDecorator('column', {
                                    rules: [],
                                })(
                                    <CheckboxGroup className={styles.columnMain} options={columnOptions} />
                                )}
                            </FormItem>

                            <FormItem
                                className={styles.columTitle}
                            >
                                <div className={styles.labels}>
                                    选择栏位
                                </div>
                                <div className={styles.value}>
                                    <Input onFocus={this.columnFocus} value={columValue} />
                                </div>
                            </FormItem>
                        </Col>
                        <Col className={styles.transfer} span={12}>
                            {
                                transferShow && <div style={{ position: 'relative', top: top, zIndex: 10 }}>
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
                                columShow && <div style={{ position: 'relative', top: top, zIndex: 10 }}>
                                    <div>
                                        选择栏位
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

traceModals.propTypes = {

};
traceModals.defaultProps = {
    visible: false,
    width: 1000
};

export default traceModals;