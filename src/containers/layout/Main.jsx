import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import styles from './Main.less';
import {config} from '../../config/config';
import {History} from '../../utils';
import {cloneDeep} from 'lodash';

const {Header, Content, Footer, Sider} = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlKeys: [],  // 用来匹配openkey和selectKey
            openKeys: [],
            selectedKeys: []
        };
    }

    render() {
        let {openKeys, selectedKeys} = this.state;
        return (<Layout style={{minHeight: '100%'}}>
            <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                <div className='logo' style={{height: 32, background: 'rgba(255,255,255,.2)', margin: 16}}>logo</div>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    style={{width: 200}}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.onOpenChange.bind(this)}
                    mode='inline'
                    theme='dark'
                >
                    {
                        /*最多支持三级目录*/
                        config.menuList.map((subItem) => {
                            if (subItem.children && subItem.children.length) {
                                return (<SubMenu key={subItem.key} title={subItem.name}>
                                    {
                                        subItem.children.map((item) => {
                                            if (item.children && item.children.length) {
                                                return (<SubMenu key={item.key} title={item.name}>
                                                    {
                                                        item.children.map((minItem) => {
                                                            return (
                                                                <MenuItem key={minItem.key}>{minItem.name}</MenuItem>
                                                            );
                                                        })
                                                    }
                                                </SubMenu>);
                                            } else {
                                                return <MenuItem key={item.key}>{item.name}</MenuItem>
                                            }
                                        })
                                    }
                                </SubMenu>);
                            } else {
                                return <MenuItem key={subItem.key}>{subItem.name}</MenuItem>
                            }

                        })
                    }
                </Menu>
            </Sider>
            <Layout style={{marginLeft: 200, minHeight: '100%'}}>
                <Header style={{background: '#fff', padding: 0}}>头部</Header>
                <Content className={styles.content} style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    {/*Ant Design ©2016 Created by Ant UED*/}
                    scy-webpack-react-redux-saga-antd-json_server-axios-icon by scy in 201801
                </Footer>
            </Layout>
        </Layout>)
    }

    componentWillMount() {
        this.setState({
            urlKeys: this.createUrlKey(config.menuList)
        }, () => {
            this.setSelectAndOpenKeys(History.location);
        });

    }

    componentDidMount() {
        History.listen((location, action) => {
            this.setSelectAndOpenKeys(location);
        });
    }

    createUrlKey = (menuList) => {
        let urlObj = {};
        let createUrlEachChild = (item, key, parentsKey) => {
            if (item.children && item.children.length) {
                let subItem = item.children;
                for (let i = 0; i < subItem.length; i++) {
                    let newParentsKey = cloneDeep(parentsKey)
                    newParentsKey.push(key);
                    createUrlEachChild(subItem[i], subItem[i].key, newParentsKey);
                }

            } else {
                urlObj[key] = {
                    selectKey: [key],
                    parentsKey: parentsKey
                }
            }
        };   
        for (let i = 0; i < menuList.length; i++) {
            createUrlEachChild(menuList[i], menuList[i].key, []);
        }
        return urlObj;
    };

    setSelectAndOpenKeys = (location) => {
        let {urlKeys} = this.state;
        let keyObj = urlKeys[location.pathname];
        console.log(keyObj);
        this.setState({
            selectedKeys: keyObj.selectKey,
            openKeys: keyObj.parentsKey
        });
    };

    //点击导航栏
    handleClick = (e) => {
        this.setState({
            selectedKeys: [e.key]
        });
        History.push(e.key)
    };

    // 导航栏展开/关闭
    onOpenChange = (key) => {
        this.setState({
            openKeys: key
        })
    };

}

export default Main;
