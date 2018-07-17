import React from 'react';
import styles from './index.less';
import { PureComponent } from 'components';
import { Modal, Select, Row, Col, Input, Transfer, Button, message} from 'antd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
const uuid = require('uuid/v4');
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
    lable: '无', value: 0,
}, {
    lable: '为空', value: 1,
}, {
    lable: '不为空', value: 2,
}, {
    lable: '等于', value: 3,
}, {
    lable: '不等于', value: 4,
}, {
    lable: '小于', value: 5,
}, {
    lable: '大于', value: 6,
}, {
    lable: '介于', value: 7,
}];
const initChild = {
    type: '', value1: '', value2: '', text: '',option: false
};
const modals = 'modal' + uuid();
class screenModals extends PureComponent {
    constructor(props) {
        super(props);
        const obj = [{a: 5, b: 3}];
        this.state = {
            screenArr: [
            ],
            transferShow: false,
            top: 0,
            targetKeys: [],
            mockData: null,
            transfer: '',
            arrIndex: 0

        };
    }
    componentDidMount = () => {
        this.getMock();
    }
    oneChange = (v, key) => {
        const {screenArr} = this.state;
        const newScreenArr = screenArr.slice();
        let newArr = update(newScreenArr, {[v]: {$apply: function(x) {
            x.value1 = key;
            x.option = true;
            return x;
        }}});
        this.setState({
            screenArr: newArr
        });
    }
    twoChange = (v, key) => {
        const {screenArr} = this.state;
        const newScreenArr = screenArr.slice();
        let newArr = update(newScreenArr, {[v]: {$apply: function(x) {
            if (key > 1) {
                x.type = 'text';
            } else {
                x.type = '';
            }
            x.value2 = key;
            return x;
        }}});
        this.setState({
            screenArr: newArr
        });
    }
    pushChild = () => {
        const {screenArr} = this.state;
        let child = {...initChild};
        this.setState({
            screenArr: update(screenArr, {$push: [child]})
        });

    }
    inputFocus = (n, e) => {
        const { screenArr } = this.state;
        const newTop = e.target.getBoundingClientRect().top;
        this.setState({
            transferShow: true,
            transfer: screenArr[n].value1,
            targetKeys: screenArr[n].targetKeys || [],
            arrIndex: n
        }, (e) => {
            const top = document.querySelector('#' + modals).offsetHeight;
            if (top > 500) {
                this.setState({
                    top: 32* n
                });
            } else {
                this.setState({
                    top: 0
                });
            }
        });
    }
    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: i,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }
    transferChange = (targetKeys, direction, moveKeys) => {
        const { screenArr, arrIndex} = this.state;
        let newKey = moveKeys.slice();

        if (screenArr[arrIndex].value2 != 7) {
            newKey = [newKey[newKey.length - 1]];
        } else {
            if (newKey.length < 2) {
                message.error('至少选择2个选项');
                return;
            }
            newKey = [newKey[newKey.length - 1], newKey[newKey.length - 2]];
        }
        const newScreenArr = screenArr.slice();
        let keyText = newKey.slice().map(it => {
            return this.state.mockData[it].title;
        });
        if (keyText.length == 2) {
            const val1 = keyText[0];
            const val2 = keyText[1];
            if (val1 > val2) {
                keyText[0] = val2;
                keyText[1] = val1;
            }
        }
        let newArr = update(newScreenArr, {[arrIndex]: {$apply: function(x) {
            x.targetKeys = newKey;
            x.text = keyText.join(',');
            return x;
        }}});
        this.setState({ targetKeys: newKey, screenArr: newArr});
    }
    onCancel = () => {
        this.props.onCancel();
    }
    onOk = () => {
        this.props.onOk();
    }
    render() {
        const { visible } = this.props;
        const { screenArr, transferShow, transfer, top} = this.state;
        return (
            <Modal
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                width={this.props.width}
            >
                <div className={styles.main}>
                    <Row id={modals} gutter={10}>
                        <Col span={12}>
                            <Row>
                                <Button onClick={this.pushChild} type="primary">
                                    增加条件
                                </Button>
                            </Row>
                            {
                                screenArr.map((it, n) => {
                                    return <Row gutter={10} className={styles.colChild}>
                                        <Col span={8}>
                                            <Select onChange={this.oneChange.bind(this, n)} value={it.value1} style={{ width: '100%' }}>
                                                {
                                                    option1.map(it => {
                                                        return <Option value={it.value}>{it.lable}</Option>;
                                                    })
                                                }
                                            </Select>

                                        </Col>
                                        {
                                            it.option && <Col span={8}>
                                                <Select onChange={this.twoChange.bind(this,n)} value={it.value2} style={{ width: '100%' }}>
                                                    {
                                                        option2.map(it => {
                                                            return <Option value={it.value}>{it.lable}</Option>;
                                                        })
                                                    }
                                                </Select>

                                            </Col> || null
                                        }

                                        {
                                            it.type == 'text' && <Col span={8}>
                                                <Input id={'a' + n} onFocus={this.inputFocus.bind(this, n)} value={it.text} placeholder="Basic usage" />


                                            </Col> || null
                                        }
                                    </Row>;
                                })
                            }

                        </Col>
                        <Col span={12}>
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

                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}

screenModals.propTypes = {

};
screenModals.defaultProps = {
    visible: false,
    width: 1000
};

export default screenModals;