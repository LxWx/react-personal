import React, {Component} from 'react';
import {Layout, Menu, Icon, Button} from 'antd';
import styles from './Main.less';
import {config} from '../../config/config';
import {webHistory} from '../../utils';
import {CloneDeep} from 'common';
import {PureComponent} from 'components';
const {Header, Content, Footer, Sider} = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            urlKeys: [], // 用来匹配openkey和selectKey
            openKeys: [],
            selectedKeys: [],
            collapsed: false,
        };
    }
    onCollapse = (collapsed) => {
        this.setState(
            {
                collapsed: collapsed,
                openKeys: []
            }
        );
    }
    render() {
        let {openKeys, selectedKeys, collapsed} = this.state;
        // const {loading} = this.props.newData;
        return <Layout style={{minHeight: '100%', overflowY: 'auto', height: '100%'}}>
            <Sider onCollapse={this.onCollapse} collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                <div className='logo' style={{height: 32, background: 'rgba(255,255,255,.2)', margin: 16}}

                >
                logo
                </div>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    // style={{width: 200}}
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
                                return <SubMenu key={subItem.key} title={<span><Icon type={subItem.iconFont} /><span>{subItem.name}</span></span>}>
                                    {
                                        subItem.children.map((item) => {
                                            if (item.children && item.children.length) {
                                                return item.isMenu && <SubMenu key={item.key} title={<span><Icon type={item.iconFont} /><span>{item.name}</span></span>}>
                                                    {
                                                        item.children.map((minItem) => {
                                                            return (
                                                                minItem.isMenu && <MenuItem key={minItem.key}><Icon type={minItem.iconFont} />{minItem.name}</MenuItem>
                                                            );
                                                        })
                                                    }
                                                </SubMenu>;
                                            } else {
                                                return item.isMenu && <MenuItem key={item.key}><Icon type={item.iconFont} />{item.name}</MenuItem>;
                                            }
                                        })
                                    }
                                </SubMenu>;
                            }
                            return subItem.isMenu && <MenuItem key={subItem.key}>
                                <span><Icon type={subItem.iconFont} /><span>{subItem.name}</span></span>
                            </MenuItem>;


                        })
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0, textAlign: 'right', paddingRight: 20}}>
                    <Button className={styles.btn} size="small" type="primary">
                        帮助
                    </Button>
                    <Button className={styles.btn} size="small" type="primary">
                        提交工单
                    </Button>
                    <div className={styles.user}>
                        {this.props.user.user || ''}
                    </div>

                </Header>
                <Content id="main" className={styles.content} style={{overflow: 'initial'}}>
                    <div>
                        {this.props.children}
                    </div>
                </Content>
                {/* <Footer style={{textAlign: 'center'}}>
                    scy-webpack-react-redux-saga-antd-json_server-axios-icon by scy in 201801
                </Footer> */}
            </Layout>
        </Layout>;
    }

    componentWillMount() {
        const {user} = this.props;
        if (!user.user) {
            return;
        }
        this.setState({
            urlKeys: this.createUrlKey(config.menuList)
        }, () => {
            this.setSelectAndOpenKeys(webHistory.location);
        });

    }

    componentDidMount() {
        const {user} = this.props;
        if (!user.user) {
            return;
        }
        webHistory.listen((location, action) => {
            this.setSelectAndOpenKeys(location);
        });
    }

    createUrlKey = (menuList) => {
        let urlObj = {};
        let createUrlEachChild = (item, key, parentsKey) => {
            if (item.children && item.children.length) {
                let subItem = item.children;
                for (let i = 0; i < subItem.length; i++) {
                    let newParentsKey = CloneDeep(parentsKey);
                    newParentsKey.push(key);
                    createUrlEachChild(subItem[i], subItem[i].key, newParentsKey);
                }

            } else {
                urlObj[key] = {
                    selectKey: [item.pid || key],
                    parentsKey: parentsKey
                };
            }
        };
        for (let i = 0; i < menuList.length; i++) {
            createUrlEachChild(menuList[i], menuList[i].key, []);
        }
        return urlObj;
    };

    setSelectAndOpenKeys = (location) => {
        const {user} = this.props;
        if (!user.user) {
            return;
        }
        let {urlKeys} = this.state;
        let keyObj = urlKeys[location.pathname == '/' ? '/dashBoard' : location.pathname] || null;
        this.setState({
            selectedKeys: keyObj && keyObj.selectKey,
            openKeys: keyObj && keyObj.parentsKey
        });
    };

    //点击导航栏
    handleClick = (e) => {
        this.setState({
            selectedKeys: [e.key]
        });
        webHistory.push(e.key);
    };

    // 导航栏展开/关闭
    onOpenChange = (key) => {
        // console.log(key)
        this.setState({
            openKeys: key
        });
    };

}
export default Main;
